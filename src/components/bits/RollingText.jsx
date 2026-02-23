"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const RollingText = ({ text, className = "" }) => {
  return (
    <div className={`flex overflow-hidden h-[1.2em] ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            delay: i * 0.05,
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

export default RollingText;
