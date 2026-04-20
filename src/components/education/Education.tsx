import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

type EducationItem = {
  id: number;
  place: string;
  period: string;
  degree: string;
};

type Props = {
  education: EducationItem[];
  developer_education: EducationItem[];
};

const Education = ({ education, developer_education }: Props) => {
  const data = [...education, ...developer_education];

  return (
    <section className="mb-8">
      <SectionTitle title="Education" className="mb-8 text-3xl font-bold" />

      <div className="relative border-l border-jet ml-4">
        <span className="absolute -left-2 bottom-0 w-4 h-4 bg-accent rounded-full border-4 border-jet"></span>

        {data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="mb-10 ml-6 relative"
          >
            {/* Dot */}
            {index < data.length - 1 && (
              <span className="absolute -left-8 w-4 h-4 bg-accent rounded-full border-4 border-jet"></span>
            )}

            {/* Content */}
            <div className="backdrop-blur-md bg-glass-bg p-4 rounded-xl shadow-md hover:scale-105 transition">
              <h3 className="text-lg font-semibold">{item.place}</h3>

              <span className="text-yellow-400 text-sm block my-1">
                {item.period}
              </span>

              <p className="text-gray-400 text-sm">{item.degree}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
