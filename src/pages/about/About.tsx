import { motion } from "framer-motion";
import Languages from "../../components/languages/Languages";
import Projects from "../../components/projects/Projects";
import ProgLanguagesSmall from "../../components/skills/Skills";
import PageHeader from "../../components/ui/PageHeader";
import Seo from "../../components/ui/Seo";
import SectionTitle from "../../components/ui/SectionTitle";
import usePortfolioData from "../../hooks/usePortfolioData";

export default function About() {
  const data = usePortfolioData();

  return (
    <motion.article
      className="text-white2"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Seo
        title="About | Baxtiyorov Shaxriyor"
        description="Learn more about Baxtiyorov Shaxriyor, a frontend developer focused on modern responsive interfaces, projects, skills, and languages."
      />
      <PageHeader title="About Me" underlineSpacingClassName="mb-4" />

      <section aria-labelledby="about-summary">
        <motion.p
          id="about-summary"
          className="mb-4"
          key={data.about.description}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {data.about.description}
        </motion.p>

        <motion.p
          className="mb-6"
          key={data.about.about_job}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {data.about.about_job}
        </motion.p>
      </section>

      <motion.section
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
        >
          <SectionTitle title="Languages" />
        </motion.div>

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
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
      >
        <Projects projects={data.projects} showPreview />
      </motion.section>
      <motion.section
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <ProgLanguagesSmall skills={data.resume.skills} showPreview />
      </motion.section>
    </motion.article>
  );
}
