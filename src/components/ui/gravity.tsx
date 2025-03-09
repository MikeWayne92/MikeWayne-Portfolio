import {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { debounce } from "lodash"
import Matter, {
  Bodies,
  Common,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Query,
  Render,
  Runner,
  World,
} from "matter-js"
// Import poly-decomp for complex shapes
import decomp from 'poly-decomp';

import { cn } from "@/lib/utils"

// Function to calculate position values for elements
function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
) {
  if (typeof value === "string" && value.endsWith("%")) {
    const percentage = parseFloat(value) / 100;
    return containerSize * percentage;
  }
  return typeof value === "number"
    ? value
    : (containerSize / 2);
}

type GravityProps = {
  children: ReactNode
  debug?: boolean
  gravity?: { x: number; y: number }
  resetOnResize?: boolean
  grabCursor?: boolean
  addTopWall?: boolean
  autoStart?: boolean
  className?: string
}

type PhysicsBody = {
  element: HTMLElement
  body: Matter.Body
  props: MatterBodyProps
}

type MatterBodyProps = {
  children: ReactNode
  matterBodyOptions?: Matter.IBodyDefinition
  isDraggable?: boolean
  bodyType?: "rectangle" | "circle"
  x?: number | string
  y?: number | string
  angle?: number
  className?: string
}

export type GravityRef = {
  start: () => void
  stop: () => void
  reset: () => void
  toggle: () => void
}

const GravityContext = createContext<{
  registerElement: (
    id: string,
    element: HTMLElement,
    props: MatterBodyProps
  ) => void
  unregisterElement: (id: string) => void
} | null>(null)

export const MatterBody = ({
  children,
  className,
  matterBodyOptions = {
    friction: 0.1,
    restitution: 0.6,
    density: 0.001,
    isStatic: false,
  },
  bodyType = "rectangle",
  isDraggable = true,
  x = 0,
  y = 0,
  angle = 0,
  ...props
}: MatterBodyProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(GravityContext)

  useEffect(() => {
    if (!elementRef.current || !context) return
    
    // Small delay to ensure proper rendering
    const timer = setTimeout(() => {
      context.registerElement(idRef.current, elementRef.current, {
        children,
        matterBodyOptions,
        bodyType,
        isDraggable,
        x,
        y,
        angle,
        ...props,
      });
    }, 10);

    return () => {
      clearTimeout(timer);
      context.unregisterElement(idRef.current);
    }
  }, [props, children, matterBodyOptions, isDraggable, context])

  return (
    <div
      ref={elementRef}
      className={cn(
        "absolute",
        className,
        isDraggable && "cursor-grab active:cursor-grabbing"
      )}
    >
      {children}
    </div>
  )
}

export const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      debug = false,
      gravity = { x: 0, y: 1 },
      grabCursor = true,
      resetOnResize = true,
      addTopWall = true,
      autoStart = true,
      className,
      ...props
    },
    ref
  ) => {
    const canvas = useRef<HTMLDivElement>(null)
    const engine = useRef(Engine.create({ enableSleeping: false }))
    const render = useRef<Render>()
    const runner = useRef<Runner>()
    const bodiesMap = useRef(new Map<string, PhysicsBody>())
    const frameId = useRef<number>()
    const mouseConstraint = useRef<Matter.MouseConstraint>()
    const mouseDown = useRef(false)
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
    const isRunning = useRef(false)
    const isInitialized = useRef(false)

    // Register Matter.js body in the physics world
    const registerElement = useCallback(
      (id: string, element: HTMLElement, props: MatterBodyProps) => {
        if (!canvas.current) {
          console.error("Canvas not available for registration");
          return;
        }
        
        const width = element.offsetWidth
        const height = element.offsetHeight
        const canvasRect = canvas.current!.getBoundingClientRect()

        const angle = (props.angle || 0) * (Math.PI / 180)

        const x = calculatePosition(props.x, canvasRect.width, width)
        const y = calculatePosition(props.y, canvasRect.height, height)

        console.log(`Registering body at ${x}, ${y} with size ${width}x${height}`);

        let body
        if (props.bodyType === "circle") {
          const radius = Math.max(width, height) / 2
          body = Bodies.circle(x, y, radius, {
            ...props.matterBodyOptions,
            angle: angle,
            render: {
              fillStyle: debug ? "rgba(244, 196, 48, 0.3)" : "transparent",
              strokeStyle: debug ? "#F4C430" : "transparent",
              lineWidth: debug ? 1 : 0,
            },
          })
        } else {
          body = Bodies.rectangle(x, y, width, height, {
            ...props.matterBodyOptions,
            angle: angle,
            render: {
              fillStyle: debug ? "rgba(244, 196, 48, 0.3)" : "transparent",
              strokeStyle: debug ? "#F4C430" : "transparent",
              lineWidth: debug ? 1 : 0,
            },
          })
        }

        if (body) {
          World.add(engine.current.world, [body])
          bodiesMap.current.set(id, { element, body, props })
          
          // Update position immediately
          updateElementPosition(element, body);
        }
      },
      [debug]
    )

    // Helper function to update element position based on physics body
    const updateElementPosition = (element: HTMLElement, body: Matter.Body) => {
      const { x, y } = body.position;
      const rotation = body.angle * (180 / Math.PI);
      
      element.style.transform = `translate(${
        x - element.offsetWidth / 2
      }px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`;
    };

    // Unregister Matter.js body from the physics world
    const unregisterElement = useCallback((id: string) => {
      const body = bodiesMap.current.get(id)
      if (body) {
        World.remove(engine.current.world, body.body)
        bodiesMap.current.delete(id)
      }
    }, [])

    // Keep react elements in sync with the physics world
    const updateElements = useCallback(() => {
      bodiesMap.current.forEach(({ element, body }) => {
        updateElementPosition(element, body);
      })

      frameId.current = requestAnimationFrame(updateElements)
    }, [])

    const initializeRenderer = useCallback(() => {
      if (!canvas.current) {
        console.error("Canvas ref not available");
        return;
      }

      if (isInitialized.current) {
        console.log("Renderer already initialized");
        return;
      }

      const height = canvas.current.offsetHeight || 300;
      const width = canvas.current.offsetWidth || 400;

      console.log(`Initializing renderer with size ${width}x${height}`);
      setCanvasSize({ width, height });

      // Initialize decomp
      try {
        if ((window as any).decomp) {
          Common.setDecomp((window as any).decomp);
        } else {
          (window as any).decomp = decomp;
          Common.setDecomp(decomp);
        }
      } catch (e) {
        console.error("Failed to set up decomp:", e);
      }

      // Set gravity
      engine.current.gravity.x = gravity.x;
      engine.current.gravity.y = gravity.y;

      // Create renderer
      try {
        render.current = Render.create({
          element: canvas.current,
          engine: engine.current,
          options: {
            width,
            height,
            wireframes: debug,
            background: "transparent",
            pixelRatio: window.devicePixelRatio || 1
          },
        });
      } catch (e) {
        console.error("Failed to create renderer:", e);
        return;
      }

      // Set up mouse interaction
      try {
        const mouse = Mouse.create(render.current.canvas);
        // Use type assertion to access mousewheel events
        const mouseWithEvents = mouse as any;
        mouseWithEvents.element.removeEventListener("mousewheel", mouseWithEvents.mousewheel);
        mouseWithEvents.element.removeEventListener("DOMMouseScroll", mouseWithEvents.mousewheel);

        mouseConstraint.current = MouseConstraint.create(engine.current, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: debug,
            },
          },
        });
      } catch (e) {
        console.error("Failed to set up mouse:", e);
      }

      // Add walls with the Brunswick Green color
      try {
        const walls = [
          // Floor
          Bodies.rectangle(width / 2, height + 10, width, 20, {
            isStatic: true,
            friction: 0.3,
            render: {
              fillStyle: debug ? "#1B4D3E" : "transparent",
              visible: debug,
            },
          }),

          // Right wall
          Bodies.rectangle(width + 10, height / 2, 20, height, {
            isStatic: true,
            friction: 0.3,
            render: {
              fillStyle: debug ? "#1B4D3E" : "transparent",
              visible: debug,
            },
          }),

          // Left wall
          Bodies.rectangle(-10, height / 2, 20, height, {
            isStatic: true,
            friction: 0.3,
            render: {
              fillStyle: debug ? "#1B4D3E" : "transparent",
              visible: debug,
            },
          }),
        ];

        const topWall = addTopWall
          ? Bodies.rectangle(width / 2, -10, width, 20, {
              isStatic: true,
              friction: 0.3,
              render: {
                fillStyle: debug ? "#1B4D3E" : "transparent",
                visible: debug,
              },
            })
          : null;

        if (topWall) {
          walls.push(topWall);
        }

        World.add(engine.current.world, walls);

        if (mouseConstraint.current) {
          World.add(engine.current.world, mouseConstraint.current);
        }
      } catch (e) {
        console.error("Failed to add walls:", e);
      }

      // Set up cursor and touch events
      if (grabCursor && canvas.current && mouseConstraint.current) {
        try {
          const touchingMouse = () =>
            Query.point(
              engine.current.world.bodies,
              mouseConstraint.current?.mouse.position || { x: 0, y: 0 }
            ).length > 0;

          Events.on(engine.current, "beforeUpdate", () => {
            if (canvas.current) {
              if (!mouseDown.current && !touchingMouse()) {
                canvas.current.style.cursor = "default";
              } else if (touchingMouse()) {
                canvas.current.style.cursor = mouseDown.current
                  ? "grabbing"
                  : "grab";
              }
            }
          });

          // Mouse events
          canvas.current.addEventListener("mousedown", () => {
            mouseDown.current = true;

            if (canvas.current) {
              if (touchingMouse()) {
                canvas.current.style.cursor = "grabbing";
              } else {
                canvas.current.style.cursor = "default";
              }
            }
          });
          
          canvas.current.addEventListener("mouseup", () => {
            mouseDown.current = false;

            if (canvas.current) {
              if (touchingMouse()) {
                canvas.current.style.cursor = "grab";
              } else {
                canvas.current.style.cursor = "default";
              }
            }
          });
          
          // Add touch events for mobile
          canvas.current.addEventListener("touchstart", (event) => {
            mouseDown.current = true;
            
            if (mouseConstraint.current?.mouse && event.touches[0]) {
              const position = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
              };
              
              // Update mouse position manually
              const mouseEvent = new MouseEvent('mousedown', {
                clientX: position.x,
                clientY: position.y
              });
              mouseConstraint.current.mouse.element.dispatchEvent(mouseEvent);
            }
          }, { passive: true });
          
          canvas.current.addEventListener("touchmove", (event) => {
            if (mouseConstraint.current?.mouse && event.touches[0]) {
              const position = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
              };
              
              // Update mouse position manually
              const mouseEvent = new MouseEvent('mousemove', {
                clientX: position.x,
                clientY: position.y
              });
              mouseConstraint.current.mouse.element.dispatchEvent(mouseEvent);
            }
            
            // Prevent scrolling when interacting with physics
            if (touchingMouse()) {
              event.preventDefault();
            }
          }, { passive: false });
          
          canvas.current.addEventListener("touchend", () => {
            mouseDown.current = false;
            
            if (mouseConstraint.current?.mouse) {
              const mouseEvent = new MouseEvent('mouseup');
              mouseConstraint.current.mouse.element.dispatchEvent(mouseEvent);
            }
          }, { passive: true });
          
        } catch (e) {
          console.error("Failed to set up cursor and touch events:", e);
        }
      }

      if (render.current) {
        render.current.mouse = mouseConstraint.current?.mouse;
      }

      runner.current = Runner.create({
        isFixed: true, // Use fixed timestep for more predictable physics
      });

      if (render.current) {
        Render.run(render.current);
      }

      updateElements();
      runner.current.enabled = false;

      if (autoStart) {
        runner.current.enabled = true;
        startEngine();
      }

      isInitialized.current = true;
      console.log("Renderer initialization complete");
    }, [updateElements, debug, autoStart, gravity, addTopWall, grabCursor])

    // Clear the Matter.js world
    const clearRenderer = useCallback(() => {
      console.log("Clearing renderer");
      
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
        frameId.current = undefined;
      }

      if (mouseConstraint.current) {
        World.remove(engine.current.world, mouseConstraint.current);
        mouseConstraint.current = undefined;
      }

      if (render.current) {
        try {
          if (render.current.mouse) {
            Mouse.clearSourceEvents(render.current.mouse);
          }
          Render.stop(render.current);
          if (render.current.canvas) {
            render.current.canvas.remove();
          }
          render.current = undefined;
        } catch (e) {
          console.error("Error clearing renderer:", e);
        }
      }

      if (runner.current) {
        Runner.stop(runner.current);
        runner.current = undefined;
      }

      if (engine.current) {
        World.clear(engine.current.world, false);
        Engine.clear(engine.current);
        engine.current = Engine.create({ enableSleeping: false });
      }

      bodiesMap.current.clear();
      isInitialized.current = false;
    }, [])

    const handleResize = useCallback(() => {
      if (!canvas.current || !resetOnResize) return;

      const newWidth = canvas.current.offsetWidth;
      const newHeight = canvas.current.offsetHeight;

      console.log(`Resizing to ${newWidth}x${newHeight}`);
      setCanvasSize({ width: newWidth, height: newHeight });

      // Clear and reinitialize
      clearRenderer();
      initializeRenderer();
    }, [clearRenderer, initializeRenderer, resetOnResize])

    const startEngine = useCallback(() => {
      console.log("Starting physics engine");
      
      if (!isInitialized.current) {
        console.log("Initializing before start");
        initializeRenderer();
      }
      
      if (runner.current) {
        runner.current.enabled = true;
        try {
          Runner.run(runner.current, engine.current);
          console.log("Runner started");
        } catch (e) {
          console.error("Failed to start runner:", e);
        }
      } else {
        console.error("Runner not available");
      }
      
      if (render.current) {
        try {
          Render.run(render.current);
          console.log("Render started");
        } catch (e) {
          console.error("Failed to start renderer:", e);
        }
      } else {
        console.error("Renderer not available");
      }
      
      if (!frameId.current) {
        frameId.current = requestAnimationFrame(updateElements);
      }
      
      isRunning.current = true;
    }, [updateElements, initializeRenderer])

    const stopEngine = useCallback(() => {
      console.log("Stopping physics engine");
      
      if (!isRunning.current) {
        console.log("Engine not running");
        return;
      }

      if (runner.current) {
        Runner.stop(runner.current);
      }
      
      if (render.current) {
        Render.stop(render.current);
      }
      
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
        frameId.current = undefined;
      }
      
      isRunning.current = false;
    }, [])

    const reset = useCallback(() => {
      console.log("Resetting physics bodies");
      
      stopEngine();
      
      bodiesMap.current.forEach(({ element, body, props }) => {
        body.angle = (props.angle || 0) * (Math.PI / 180);

        const x = calculatePosition(
          props.x,
          canvasSize.width,
          element.offsetWidth
        );
        const y = calculatePosition(
          props.y,
          canvasSize.height,
          element.offsetHeight
        );
        
        try {
          Matter.Body.setPosition(body, { x, y });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(body, 0);
          
          // Update element position immediately
          updateElementPosition(element, body);
        } catch (e) {
          console.error("Failed to reset body:", e);
        }
      });
      
      // Update rendered positions once more
      updateElements();
    }, [stopEngine, canvasSize, updateElements])

    const toggle = useCallback(() => {
      if (isRunning.current) {
        stopEngine();
      } else {
        startEngine();
      }
    }, [startEngine, stopEngine])

    useImperativeHandle(
      ref,
      () => ({
        start: startEngine,
        stop: stopEngine,
        reset,
        toggle
      }),
      [startEngine, stopEngine, reset, toggle]
    )

    useEffect(() => {
      if (!resetOnResize) return;

      const debouncedResize = debounce(handleResize, 500);
      window.addEventListener("resize", debouncedResize);

      return () => {
        window.removeEventListener("resize", debouncedResize);
        debouncedResize.cancel();
      }
    }, [handleResize, resetOnResize])

    useEffect(() => {
      console.log("Initializing physics on mount");
      
      // Only initialize after a short delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        initializeRenderer();
      }, 100);
      
      return () => {
        clearTimeout(timer);
        clearRenderer();
      };
    }, [initializeRenderer, clearRenderer])

    return (
      <GravityContext.Provider value={{ registerElement, unregisterElement }}>
        <div
          ref={canvas}
          className={cn(className, "relative w-full h-full")}
          {...props}
        >
          {children}
        </div>
      </GravityContext.Provider>
    )
  }
)

Gravity.displayName = "Gravity" 