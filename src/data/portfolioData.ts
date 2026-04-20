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
      experience: "2+ Years",
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
        place: "Frontend Development Course, Open Web Academy",
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
      details:
        "This project focuses on fast search, clean typography, and a simple interface for reading definitions. It helped me practice API handling, component composition, and building a responsive layout.",
      image: "/images/dictionary-2.png",
      gallery: [
        "/images/dictionary-1.png",
        "/images/dictionary-2.png",
        "/images/dictionary-3.png",
      ],
      link: "https://splendid-figolla-2968a8.netlify.app/",
      github: "https://github.com/baxtiyorovdev/dictionary",
      technologies: ["CSS", "HTML", "JavaScript"],
    },
    {
      id: 2,
      title: "Github User Finder",
      description:
        "A simple application that allows users to search for and view information about GitHub users.",
      details:
        "The app lets users search profiles and review profile data in a focused card layout. I used this project to improve form state handling, async fetch flows, and polished UI feedback.",
      image: "/images/github-finder-1.png",
      gallery: [
        "/images/github-finder-1.png",
        "/images/github-finder-2.png",
        "/images/github-finder-3.png",
      ],
      link: "https://github-accout-finder.netlify.app/",
      github: "https://github.com/baxtiyorovdev/githubusersearch",
      technologies: ["React", "CSS", "HTML", "JavaScript"],
    },
    {
      id: 3,
      title: "Movie Entertainment",
      description:
        "A movie application that allows users to search for and view information about movies.",
      details:
        "This interface is centered around browsing movie content, search, and visually rich cards. It gave me experience working with media-heavy layouts, reusable sections, and responsive design decisions.",
      image: "/images/movie-1.png",
      gallery: [
        "/images/movie-1.png",
        "/images/movie-2.png",
        "/images/movie-3.png",
      ],
      link: "https://movie-erntartainment.netlify.app/",
      github: "https://github.com/baxtiyorovdev/Movie-Entertainment",
      technologies: ["React", "CSS", "HTML", "JavaScript"],
    },
    {
      id: 4,
      title: "Dine Restaurant",
      description:
        "A simple restaurant application built with React, allowing users to browse menu items and place orders.",
      details:
        "The restaurant concept focuses on menu presentation, product browsing, and a friendly ordering experience. I used it to practice cleaner card layouts, page sections, and interactive UI states.",
      image: "/images/dine-restaurant-1.png",
      gallery: [
        "/images/dine-restaurant-1.png",
        "/images/dine-restaurant-2.png",
        "/images/dine-restaurant-3.png",
      ],
      link: "https://dine-restaurant.netlify.app/",
      github: "https://github.com/baxtiyorovdev/dinorestaurant",
      technologies: ["Html", "CSS", "JavaScript"],
    },
    {
      id: 5,
      title: "POS System",
      description:
        "A simple point-of-sale system for managing sales and inventory.",
      details:
        "This project is a more advanced private system for sales flow, inventory, and dashboard-style management. It helped me work with a stronger architecture, typed flows, and backend-connected UI patterns.",
      image: "/images/pos-system-photo.png",
      gallery: [
        "/images/pos-system-photo.png",
        "/images/dictionary-photo.png",
        "/images/dino-restaurant.png",
      ],
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
