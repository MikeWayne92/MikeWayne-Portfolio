"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0
  });
  const sections = [{
    id: 'home',
    label: 'Home'
  }, {
    id: 'works',
    label: 'Works'
  }, {
    id: 'resume',
    label: 'Resume'
  }, {
    id: 'contact',
    label: 'Contact'
  }];
  return <ul onMouseLeave={() => setPosition(pv => ({
    ...pv,
    opacity: 0
  }))} className="relative mx-auto flex w-fit border-2 border-none p-1 rounded-full bg-inherit">
      {sections.map(section => <Tab key={section.id} setPosition={setPosition} sectionId={section.id}>
          {section.label}
        </Tab>)}

      <Cursor position={position} />
    </ul>;
}
const Tab = ({
  children,
  setPosition,
  sectionId
}: {
  children: React.ReactNode;
  setPosition: any;
  sectionId: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const scrollToSection = () => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  return <li ref={ref} onClick={scrollToSection} onMouseEnter={() => {
    if (!ref.current) return;
    const {
      width
    } = ref.current.getBoundingClientRect();
    setPosition({
      width,
      opacity: 1,
      left: ref.current.offsetLeft
    });
  }} className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base">
      {children}
    </li>;
};
const Cursor = ({
  position
}: {
  position: any;
}) => {
  return <motion.li animate={position} className="absolute z-0 h-7 rounded-full bg-black md:h-12" />;
};
export default NavHeader;