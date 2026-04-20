import { motion } from "framer-motion";
import type { Skill } from "../../types";
import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../ui/SectionTitle";

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
  showPreview?: boolean; // 👈 NEW
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

export default function Skills({ skills, showPreview }: Props) {
  const displayedSkills = showPreview ? skills.slice(0, 5) : skills;

  return (
    <motion.div
      className="text-white2"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.div variants={item}>
        <SectionTitle title="Skills" className="mb-6 text-3xl font-bold" />
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
        variants={container}
      >
        {displayedSkills.map((skill, i) => (
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

        {showPreview && (
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center p-4 rounded-xl2 bg-glass-bg backdrop-blur-md shadow-soft"
          >
            <Link
              to="/resume"
              className="text-accent font-semibold text-center"
            >
              See more →
            </Link>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
