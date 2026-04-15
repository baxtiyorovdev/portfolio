import type { PortfolioData } from "../types";

export const portfolioData: PortfolioData = {
  about: {
    name: "Baxtiyorov Shaxriyor",
    title: "Front End Developer",
    description:
      "Front End Developer skilled in building responsive and modern web applications using HTML, CSS, JavaScript, and React. Focused on clean UI, performance, and user experience. Continuously learning and improving with modern technologies.",
    about_job:
      "Looking for opportunities to work on real-world projects, collaborate with developers, and grow as a Front End Engineer. Open to internships, freelance work, and junior positions.",
    image: "/illustrations/avatar-1.png",
    tag: "Web Developer",
    languages: ["English", "Russian", "Uzbek"],
    social: {
      email: "baxtiyorovdev@gmail.com",
      phone: "+998 (94) 808-16-14",
      location: "Qashqadaryo, UZ",
      birthday: "October 22, 2010",
      telegram: "https://t.me/baxtiyorovdev",
      github: "https://github.com/baxtiyorovdev",
      instagram: "https://www.instagram.com/baxtiyorovdev",
    },
  },
  resume: {
    education: [
      {
        id: 1,
        place: "26 School, Qashqadaryo",
        period: "2017-2018",
        degree: "Pre School",
      },
      {
        id: 2,
        place: "11 School, Qashqadaryo",
        period: "2018-2020",
        degree: "Secondary School",
      },
      {
        id: 3,
        place: "Ulugbek School, Qashqadaryo",
        period: "2020-2024",
        degree: "Secondary School",
      },
      {
        id: 4,
        place: "Umid Uchqunlari, Qashqadaryo",
        period: "2024-Present",
        degree: "High School",
      },
    ],
    developer_education: [
      {
        id: 1,
        place: "Frontend Development Course, Open Web Academy (Qashqadaryo)",
        period: "2024-2025",
        degree: "Certificate",
      },
    ],
    skills: [
      {
        name: "HTML",
        level: "Advanced",
      },
      {
        name: "CSS",
        level: "Intermediate",
      },
      {
        name: "JavaScript",
        level: "Intermediate",
      },
      {
        name: "TypeScript",
        level: "Intermediate",
      },
      {
        name: "React",
        level: "Intermediate",
      },
      {
        name: "Next.js",
        level: "Intermediate",
      },
      {
        name: "Redux",
        level: "Practicing",
      },
      {
        name: "Git",
        level: "Intermediate",
      },
      {
        name: "Node.js",
        level: "Intermediate",
      },
      {
        name: "Linux",
        level: "Practicing",
      },
    ],
  },
  projects: [
    {
      id: 1,
      title: "Dictionary App",
      description:
        "A simple dictionary app built with React, featuring search functionality and word definitions.",
      image: "/images/dictionary-photo.png",
      link: "https://splendid-figolla-2968a8.netlify.app/",
      github: "https://github.com/baxtiyorovdev/dictionary-app",
      technologies: ["React", "CSS", "HTML", "JavaScript"],
    },
    {
      id: 2,
      title: "Github User Finder",
      description:
        "A simple application that allows users to search for and view information about GitHub users.",
      image: "/images/github-photo.png",
      link: "https://github-accout-finder.netlify.app/",
      technologies: ["React", "CSS", "HTML", "JavaScript"],
    },
    {
      id: 3,
      title: "Movie Entertainment",
      description:
        "A movie application that allows users to search for and view information about movies.",
      image: "/images/movie-photo.png",
      link: "https://movie-erntartainment.netlify.app/",
      technologies: ["React", "CSS", "HTML", "JavaScript"],
    },
    {
      id: 4,
      title: "Dino Restaurant",
      description:
        "A simple restaurant application built with React, allowing users to browse menu items and place orders.",
      image: "/images/dino-restaurant-photo.png",
      link: "https://dino-restaurant.netlify.app/",
      technologies: ["Html", "CSS", "JavaScript"],
    },
    {
      id: 5,
      title: "POS System",
      description: "A simple point-of-sale system for managing sales and inventory.",
      image: "/images/pos-system-photo.png",
      technologies: [
        "Next.js",
        "CSS",
        "TypeScript",
        "Node.js",
        "Prisma",
        "PostgreSQL",
      ],
      private: true,
    },
  ],
};
