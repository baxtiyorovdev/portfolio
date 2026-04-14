export type Social = {
  email: string;
  phone: string;
  location: string;
  birthday: string;
  telegram: string;
  github: string;
  instagram: string;
};
export type About = {
  name: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  social: Social;
};
export type EducationItem = {
  id: number;
  place: string;
  period: string;
  degree: string;
};
export type SkillLevel = "Advanced" | "Intermediate" | "Practicing";
export type Skill = {
  name: string;
  level: SkillLevel;
};
export type Resume = {
  education: EducationItem[];
  developer_education: EducationItem[];
  skills: Skill[];
};
export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
  type?: "private";
};
export type PortfolioData = {
  about: About;
  resume: Resume;
  projects: Project[];
};
