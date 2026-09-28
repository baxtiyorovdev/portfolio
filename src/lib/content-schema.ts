import { z } from "zod";

// Messages are in Russian: they're shown to the site owner in the admin panel.

// Uploaded images come from Vercel Blob; everything else must live in /public.
const BLOB_URL = /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//i;
const HTTP_URL = /^https?:\/\//;
const URL_MESSAGE = "Ссылка должна начинаться с http:// или https://";

const text = (max: number) =>
  z.string().trim().min(1, "Обязательное поле").max(max, `Не длиннее ${max} символов`);

const imagePath = z
  .string()
  .trim()
  .min(1, "Нужна картинка")
  .max(400, "Слишком длинный путь")
  .refine((value) => value.startsWith("/") || BLOB_URL.test(value), {
    message: "Укажите путь из /public или загрузите картинку",
  });

const url = z
  .string()
  .trim()
  .max(300, "Слишком длинная ссылка")
  .refine((value) => HTTP_URL.test(value), { message: URL_MESSAGE });

/** Optional URL: empty form fields become `undefined`. */
const optionalUrl = z
  .string()
  .trim()
  .max(300, "Слишком длинная ссылка")
  .optional()
  .transform((value) => value || undefined)
  .refine((value) => value === undefined || HTTP_URL.test(value), { message: URL_MESSAGE });

const stringList = (max: number, itemMax = 60) =>
  z.array(text(itemMax)).max(max, `Не больше ${max}`);

export const aboutSchema = z.object({
  name: text(80),
  title: text(80),
  description: text(1000),
  about_job: text(1000),
  image: imagePath,
  avatar: imagePath,
  tag: text(60),
  roles: stringList(8).min(1, "Добавьте хотя бы одну роль"),
  timezone: text(20),
  languages: stringList(10).min(1, "Добавьте хотя бы один язык"),
  social: z.object({
    email: z.email("Неверный email").max(120),
    phone: text(40),
    location: text(80),
    experience: text(40),
    telegram: url,
    github: url,
    instagram: url,
  }),
});

export const projectSchema = z.object({
  id: z.number().int().positive(),
  title: text(80),
  description: text(300),
  details: z
    .string()
    .trim()
    .max(2000, "Не длиннее 2000 символов")
    .optional()
    .transform((value) => value || undefined),
  image: imagePath,
  gallery: z.array(imagePath).max(12, "Не больше 12 картинок").optional(),
  link: optionalUrl,
  github: optionalUrl,
  technologies: stringList(15, 40).min(1, "Добавьте хотя бы одну технологию"),
  private: z.boolean().optional(),
});

export const projectsSchema = z.array(projectSchema).max(50, "Не больше 50 проектов");

const educationSchema = z.object({
  id: z.number().int().positive(),
  place: text(120),
  period: text(40),
  degree: text(80),
});

export const resumeSchema = z.object({
  education: z.array(educationSchema).max(20),
  developer_education: z.array(educationSchema).max(20),
  skills: z.array(z.object({ name: text(40), level: text(30) })).max(40, "Не больше 40 навыков"),
});

export const SERVICE_ICON_KEYS = ["code", "responsive", "layout", "api", "speed", "motion"] as const;
export const PROCESS_ICON_KEYS = ["discover", "plan", "build", "test", "launch"] as const;

export const homeSchema = z.object({
  featuredStack: stringList(4, 40).min(1, "Выберите хотя бы одну технологию"),
  services: z
    .array(z.object({ name: text(40), icon: z.enum(SERVICE_ICON_KEYS) }))
    .min(2, "Добавьте минимум две услуги")
    .max(12, "Не больше 12 услуг"),
  workflow: z
    .array(
      z.object({
        title: text(40),
        description: text(160),
        icon: z.enum(PROCESS_ICON_KEYS),
      }),
    )
    .min(1, "Добавьте хотя бы один этап")
    .max(6, "Не больше 6 этапов"),
});

export const portfolioSchema = z.object({
  about: aboutSchema,
  resume: resumeSchema,
  projects: projectsSchema,
  ...homeSchema.shape,
});
