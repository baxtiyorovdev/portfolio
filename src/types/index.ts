// About Section
export interface SocialLinks {
  email: string;
  phone: string;
  location: string;
  experience: string;
  telegram: string;
  github: string;
  instagram: string;
}

export interface About {
  name: string;
  title: string;
  description: string;
  about_job: string;
  image: string;
  tag: string;
  languages: string[];
  social: SocialLinks;
}

// Resume Section
export interface Education {
  id: number;
  place: string;
  period: string;
  degree: string;
}

export interface Skill {
  name: string;
  level: "Advanced" | "Intermediate" | "Practicing" | string;
}

export interface Resume {
  education: Education[];
  developer_education: Education[];
  skills: Skill[];
}

// Projects Section
export interface Project {
  id: number;
  title: string;
  description: string;
  details?: string;
  image: string;
  gallery?: string[];
  link?: string;
  github?: string;
  technologies: string[];
  private?: boolean;
}

// Root Data Type
export interface PortfolioData {
  about: About;
  resume: Resume;
  projects: Project[];
}
