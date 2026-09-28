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
  /** Transparent cut-out used on the violet profile tile. */
  avatar: string;
  tag: string;
  /** Rotating roles in the "I'm a …" line. */
  roles: string[];
  timezone: string;
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

// Home bento content
export type ServiceIcon =
  | "code"
  | "responsive"
  | "layout"
  | "api"
  | "speed"
  | "motion";

export interface Service {
  name: string;
  icon: ServiceIcon;
}

export type ProcessIcon = "discover" | "plan" | "build" | "test" | "launch";

export interface ProcessStep {
  title: string;
  description: string;
  icon: ProcessIcon;
}

// Root Data Type
export interface PortfolioData {
  about: About;
  resume: Resume;
  projects: Project[];
  /** Skill names (from resume.skills) highlighted in the "My Stacks" card. */
  featuredStack: string[];
  services: Service[];
  workflow: ProcessStep[];
}
