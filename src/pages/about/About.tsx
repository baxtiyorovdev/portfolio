import { motion } from "framer-motion";
import Languages from "../../components/languages/Languages";
import Education from "../../components/education/Education";
import ProgLanguagesSmall from "../../components/prog-languages-small/ProgLanguagesSmall";
import usePortfolioData from "../../hooks/usePortfolioData";

export default function About() {
  const data = usePortfolioData();

  return (
    <motion.div
      className="text-white2"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* TITLE */}
      <motion.h1
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        About Me
      </motion.h1>

      {/* ACCENT LINE */}
      <motion.div
        className="w-12 h-1.5 rounded-2xl bg-accent mb-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        style={{ originX: 0 }}
      />

      {/* DESCRIPTION */}
      <motion.p
        className="mb-4"
        key={data.about.description}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        {data.about.description}
      </motion.p>

      {/* JOB INFO */}
      <motion.p
        className="mb-6"
        key={data.about.about_job}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {data.about.about_job}
      </motion.p>

      {/* LANGUAGES SECTION */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <motion.h3
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
        >
          Languages
        </motion.h3>

        <motion.p
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          There are languages I am proficient in.
        </motion.p>

        <motion.div
          key={data.about.languages.length}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55 }}
        >
          <Languages languages={data.about.languages} />
        </motion.div>
      </motion.div>

      {/* SKILLS SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <ProgLanguagesSmall skills={data.resume.skills} showPreview />
        </motion.div>
      </motion.div>
      <Education
        education={data.resume.education}
        developer_education={data.resume.developer_education}
      />
    </motion.div>
  );
}
