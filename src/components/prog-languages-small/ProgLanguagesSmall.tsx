import { motion } from "framer-motion";
import type { Skill } from "../../types";
import React from "react";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaNodeJs,
  FaLinux,
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiRedux } from "react-icons/si";

type Props = {
  skills: Skill[];
};

const iconMap: Record<string, React.ReactNode> = {
  HTML: <FaHtml5 />,
  CSS: <FaCss3Alt />,
  JavaScript: <FaJs />,
  TypeScript: <SiTypescript />,
  React: <FaReact />,
  "Next.js": <SiNextdotjs />,
  Redux: <SiRedux />,
  Git: <FaGitAlt />,
  "Node.js": <FaNodeJs />,
  Linux: <FaLinux />,
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function SkillsPage({ skills }: Props) {
  return (
    <motion.div
      className="text-white2"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.h1 className="text-3xl font-bold mb-6" variants={item}>
        Skills
      </motion.h1>

      <motion.div
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
        variants={container}
      >
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="group p-4 rounded-xl2 bg-glass-bg backdrop-blur-md shadow-soft transition-all duration-100"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl text-accent group-hover:rotate-6 transition">
                {iconMap[skill.name] || "⚡"}
              </div>

              <div>
                <p className="font-medium">{skill.name}</p>
                <p className="text-xs text-gray70">{skill.level}</p>
              </div>
            </div>

            {/* subtle animated bar */}
            <div className="mt-3 h-1 w-full bg-jet rounded overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width:
                    skill.level === "Advanced"
                      ? "90%"
                      : skill.level === "Intermediate"
                        ? "70%"
                        : "40%",
                }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-full bg-accent"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
