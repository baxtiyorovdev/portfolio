import { motion } from "framer-motion";
import ProjectsList from "../../components/projects/Projects";
import PageHeader from "../../components/ui/PageHeader";
import usePortfolioData from "../../hooks/usePortfolioData";

export default function Projects() {
  const data = usePortfolioData();

  return (
    <motion.div
      className="text-white2"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <PageHeader title="My Projects" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <ProjectsList projects={data.projects} />
      </motion.div>
    </motion.div>
  );
}
