import { motion } from "framer-motion";
import ProjectsList from "../../components/projects/Projects";
import PageHeader from "../../components/ui/PageHeader";
import Seo from "../../components/ui/Seo";
import usePortfolioData from "../../hooks/usePortfolioData";

export default function Projects() {
  const data = usePortfolioData();

  return (
    <motion.article
      className="text-white2"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Seo
        title="Projects | Baxtiyorov Shaxriyor"
        description="Browse frontend and full stack projects by Baxtiyorov Shaxriyor, including live demos, source code, and detailed project previews."
      />
      <PageHeader title="My Projects" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <ProjectsList projects={data.projects} />
      </motion.section>
    </motion.article>
  );
}
