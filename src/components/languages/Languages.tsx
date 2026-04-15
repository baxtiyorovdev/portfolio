import { motion } from "framer-motion";

export default function Languages({ languages }: { languages: string[] }) {
  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {languages.map((lang, i) => (
        <motion.div
          key={lang}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl text-center"
        >
          <h3 className="text-lg text-white2 font-semibold">{lang}</h3>
        </motion.div>
      ))}
    </div>
  );
}
