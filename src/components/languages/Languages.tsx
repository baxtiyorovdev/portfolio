import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

export default function Languages({ languages }: { languages: string[] }) {
  return (
    <div>
      <SectionTitle title="Languages" className="sr-only" />
      <div className="grid gap-6 sm:grid-cols-3">
        {languages.map((lang, i) => (
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="rounded-2xl bg-white/5 p-6 text-center shadow-soft backdrop-blur-xl"
          >
            <h3 className="text-lg font-semibold text-white2">{lang}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
