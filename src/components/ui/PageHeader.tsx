import { motion } from "framer-motion";

type Props = {
  title: string;
  underlineSpacingClassName?: string;
};

export default function PageHeader({
  title,
  underlineSpacingClassName = "mb-8",
}: Props) {
  return (
    <motion.header>
      <motion.h1
        className="mb-4 text-3xl font-bold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h1>

      <motion.div
        className={`h-1.5 w-12 rounded-2xl bg-accent ${underlineSpacingClassName}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        style={{ originX: 0 }}
      />
    </motion.header>
  );
}
