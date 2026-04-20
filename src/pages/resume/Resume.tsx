import { motion } from "framer-motion";
import Education from "../../components/education/Education";
import usePortfolioData from "../../hooks/usePortfolioData";
import ProgLanguagesSmall from "../../components/skills/Skills";
import PageHeader from "../../components/ui/PageHeader";
import Seo from "../../components/ui/Seo";

export default function Resume() {
  const data = usePortfolioData();
  return (
    <motion.article
      className="text-white2"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Seo
        title="Resume | Baxtiyorov Shaxriyor"
        description="Explore the resume of Baxtiyorov Shaxriyor, including education, frontend development background, and core technical skills."
      />
      <PageHeader title="My Resume" />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
      >
        <Education
          education={data.resume.education}
          developer_education={data.resume.developer_education}
        />
      </motion.section>

      <motion.section
        className="mt-8"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <ProgLanguagesSmall skills={data.resume.skills} />
      </motion.section>
    </motion.article>
  );
}
