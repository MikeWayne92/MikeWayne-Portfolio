import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Portfolio custom colors
        "brunswick-green": "#1B4D3E",
        "dark-purple": "#29131C",
        "eerieblack": "#24201B",
        "platinum": "#D3DED9",
        "saffron": "#F4C430",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "droplet-fall": {
          "0%": { 
            transform: "translateY(-10%) scale(1)",
            opacity: "0" 
          },
          "10%": { 
            opacity: "0.7" 
          },
          "100%": { 
            transform: "translateY(110%) scale(0.8)",
            opacity: "0" 
          }
        },
        "float": {
          "0%": { 
            transform: "translate(0, 0)",
          },
          "25%": { 
            transform: "translate(10px, -15px)",
          },
          "50%": { 
            transform: "translate(-5px, -25px)",
          },
          "75%": { 
            transform: "translate(-15px, -10px)",
          },
          "100%": { 
            transform: "translate(0, 0)",
          }
        },
        "float-slow": {
          "0%": { 
            transform: "translate(0, 0)",
          },
          "33%": { 
            transform: "translate(-20px, -10px) rotate(5deg)",
          },
          "66%": { 
            transform: "translate(15px, -20px) rotate(-3deg)",
          },
          "100%": { 
            transform: "translate(0, 0)",
          }
        },
        "pulse-soft": {
          "0%, 100%": { 
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": { 
            opacity: "0.8",
            transform: "scale(0.98)",
          }
        },
        "slide-right": {
          "0%": { 
            transform: "translateX(0)",
          },
          "100%": { 
            transform: "translateX(10px)",
          }
        },
        "fade-in": {
          "0%": { 
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": { 
            opacity: "1",
            transform: "translateY(0)",
          }
        },
        "fade-in-up": {
          "0%": { 
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": { 
            opacity: "1",
            transform: "translateY(0)",
          }
        },
        "rotate-slow": {
          "0%": { 
            transform: "rotate(0deg)",
          },
          "100%": { 
            transform: "rotate(360deg)",
          }
        },
        "star-movement-bottom": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(-100%, 0%)", opacity: "0" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(100%, 0%)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "droplet-fall": "droplet-fall 7s ease-in forwards",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float-slow 12s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "slide-right": "slide-right 0.3s ease-out forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "star-movement-bottom": "star-movement-bottom linear infinite alternate",
        "star-movement-top": "star-movement-top linear infinite alternate",
      },
      transitionTimingFunction: {
        "natural": "cubic-bezier(0.4, 0.0, 0.2, 1)",
        "bouncy": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
