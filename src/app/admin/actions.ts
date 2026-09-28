"use server";

import { and, count, eq, gt, lt } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { getDb, schema } from "@/db";
import { isAdminConfigured } from "@/lib/auth";
import {
  clientIp,
  endAdminSession,
  hashValue,
  passwordMatches,
  requireAdmin,
  startAdminSession,
} from "@/lib/admin-session";
import { saveContent } from "@/lib/content";
import { aboutSchema, homeSchema, projectsSchema, resumeSchema } from "@/lib/content-schema";

// ---------------------------------------------------------------------------
// Login / logout
// ---------------------------------------------------------------------------

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export type LoginState = { error?: string };

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return { error: "Админка не настроена: задайте ADMIN_PASSWORD и ADMIN_SESSION_SECRET (≥ 32 символов)." };
  }

  const db = getDb();
  const ipHash = hashValue(`login|${await clientIp()}`);
  const windowStart = new Date(Date.now() - LOCKOUT_MINUTES * 60_000);

  if (db) {
    const [{ failures }] = await db
      .select({ failures: count() })
      .from(schema.loginAttempts)
      .where(and(eq(schema.loginAttempts.ipHash, ipHash), gt(schema.loginAttempts.createdAt, windowStart)));
    if (failures >= MAX_FAILED_ATTEMPTS) {
      return { error: `Слишком много попыток. Попробуйте через ${LOCKOUT_MINUTES} минут.` };
    }
  }

  const password = formData.get("password");
  if (typeof password !== "string" || !passwordMatches(password)) {
    if (db) {
      await db.insert(schema.loginAttempts).values({ ipHash });
      // Housekeeping: forget attempts older than a day.
      await db.delete(schema.loginAttempts).where(lt(schema.loginAttempts.createdAt, new Date(Date.now() - 86_400_000)));
    }
    await new Promise((resolve) => setTimeout(resolve, 600)); // slow down guessing
    return { error: "Неверный пароль." };
  }

  if (db) await db.delete(schema.loginAttempts).where(eq(schema.loginAttempts.ipHash, ipHash));
  await startAdminSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endAdminSession();
  redirect("/admin/login");
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export type SaveResult = { ok: true; savedAt: string } | { ok: false; error: string; issues?: string[] };

/** How each section names its fields and list items in error messages. */
type Labels = { fields: Record<string, string>; item: string };

const ABOUT_LABELS: Labels = {
  item: "№",
  fields: {
    name: "Имя",
    title: "Должность",
    description: "Описание",
    about_job: "Что ищу",
    image: "Фото для поисковиков",
    avatar: "Аватар",
    tag: "Короткий тег",
    roles: "Роли",
    timezone: "Часовой пояс",
    languages: "Языки",
    social: "Контакты",
    email: "Email",
    phone: "Телефон",
    location: "Местоположение",
    experience: "Опыт",
    telegram: "Telegram",
    github: "GitHub",
    instagram: "Instagram",
  },
};

const PROJECT_LABELS: Labels = {
  item: "Проект",
  fields: {
    title: "Название",
    description: "Краткое описание",
    details: "Подробности",
    image: "Обложка",
    gallery: "Галерея",
    link: "Ссылка на демо",
    github: "GitHub",
    technologies: "Технологии",
  },
};

const RESUME_LABELS: Labels = {
  item: "№",
  fields: {
    skills: "Навыки",
    education: "Образование",
    developer_education: "Курсы",
    name: "Навык",
    level: "Уровень",
    place: "Учебное заведение",
    period: "Период",
    degree: "Степень",
  },
};

const HOME_LABELS: Labels = {
  item: "№",
  fields: {
    featuredStack: "My Stacks",
    services: "Услуги",
    workflow: "Этапы работы",
    name: "Название",
    icon: "Иконка",
    title: "Этап",
    description: "Описание",
  },
};

function describePath(path: PropertyKey[], labels: Labels): string {
  const parts = path.map((segment) =>
    typeof segment === "number" ? `${labels.item} ${segment + 1}` : (labels.fields[String(segment)] ?? String(segment)),
  );
  return parts.join(" › ") || "Раздел";
}

async function runSave(save: () => Promise<void>, labels: Labels): Promise<SaveResult> {
  try {
    await save();
    return { ok: true, savedAt: new Date().toISOString() };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        ok: false,
        error: "Проверьте поля — есть ошибки.",
        issues: error.issues.slice(0, 8).map((issue) => `${describePath(issue.path, labels)}: ${issue.message}`),
      };
    }
    console.error("[admin] Save failed:", error);
    return { ok: false, error: error instanceof Error ? error.message : "Не удалось сохранить." };
  }
}

export async function saveAbout(input: unknown): Promise<SaveResult> {
  await requireAdmin();
  return runSave(() => saveContent((current) => ({ ...current, about: aboutSchema.parse(input) })), ABOUT_LABELS);
}

export async function saveProjects(input: unknown): Promise<SaveResult> {
  await requireAdmin();
  return runSave(
    () => saveContent((current) => ({ ...current, projects: projectsSchema.parse(input) })),
    PROJECT_LABELS,
  );
}

export async function saveResume(input: unknown): Promise<SaveResult> {
  await requireAdmin();
  return runSave(() => saveContent((current) => ({ ...current, resume: resumeSchema.parse(input) })), RESUME_LABELS);
}

export async function saveHome(input: unknown): Promise<SaveResult> {
  await requireAdmin();
  return runSave(() => saveContent((current) => ({ ...current, ...homeSchema.parse(input) })), HOME_LABELS);
}
