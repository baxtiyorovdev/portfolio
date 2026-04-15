import "./background-effects.css";
import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <>
      <motion.div
        className="blob lg:left-1/10 lg:top-1/6 md:left-0 md:top-0 top-0 bottom-0 left-2/6 transition-all duration-1000"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.7, 0.9, 0.75, 0.8],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="blob lg:left-3/5 lg:top-3/6 md:left-100 md:top-100 top-1 bottom-3 left-1/7 transition-all duration-1000"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, 60, -30, 0],
          scale: [1, 0.9, 1.05, 1],
          opacity: [0.8, 0.6, 0.85, 0.75],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
