"use client";

import { useState } from "react";
import Image from "next/image";
import {
  RiAddLine,
  RiArrowDownSLine,
  RiBriefcase4Fill,
  RiCloseLine,
  RiDeleteBin6Line,
  RiLockFill,
} from "react-icons/ri";
import { saveProjects } from "@/app/admin/actions";
import { getProjectCategory } from "@/lib/portfolio";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { AddButton, Field, MoveButtons, Panel, TextArea, TextInput, moveItem, replaceItem } from "./fields";
import { ImageInput } from "./ImageInput";
import { SaveBar } from "./SaveBar";
import { TagInput } from "./TagInput";
import { useSectionForm } from "./useSectionForm";

function newProject(projects: Project[]): Project {
  const id = Math.max(0, ...projects.map((project) => project.id)) + 1;
  return { id, title: "Новый проект", description: "", image: "", gallery: [], technologies: [] };
}

/** Two-step delete: first click arms the button, second click confirms. */
function DeleteButton({ onConfirm, label }: { onConfirm: () => void; label: string }) {
  const [armed, setArmed] = useState(false);
  return (
    <button
      type="button"
      onClick={() => (armed ? onConfirm() : setArmed(true))}
      onBlur={() => setArmed(false)}
      aria-label={armed ? `Подтвердить удаление: ${label}` : `Удалить: ${label}`}
      className={cn(
        "inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-[8px] px-2.5 text-[13px] font-medium transition-colors",
        armed ? "bg-[#ff6b6b] text-white" : "bg-icon text-soft hover:bg-button-hover hover:text-[#ff6b6b]",
      )}
    >
      <RiDeleteBin6Line aria-hidden className="size-4" />
      {armed && "Точно удалить?"}
    </button>
  );
}

function ProjectFields({
  project,
  onChange,
  techSuggestions,
}: {
  project: Project;
  onChange: (patch: Partial<Project>) => void;
  techSuggestions: string[];
}) {
  const gallery = project.gallery ?? [];

  return (
    <div className="grid gap-4 border-t border-line p-4 sm:grid-cols-2">
      <Field label="Название">
        <TextInput value={project.title} onChange={(e) => onChange({ title: e.target.value })} />
      </Field>
      <Field label="Ссылка на демо" hint="Необязательно">
        <TextInput
          value={project.link ?? ""}
          onChange={(e) => onChange({ link: e.target.value })}
          placeholder="https://…"
        />
      </Field>
      <Field label="Краткое описание (карточка)" className="sm:col-span-2">
        <TextArea value={project.description} onChange={(e) => onChange({ description: e.target.value })} rows={2} />
      </Field>
      <Field label="Подробности (окно проекта)" className="sm:col-span-2">
        <TextArea value={project.details ?? ""} onChange={(e) => onChange({ details: e.target.value })} rows={3} />
      </Field>
      <Field label="Ссылка на GitHub" hint="Необязательно">
        <TextInput
          value={project.github ?? ""}
          onChange={(e) => onChange({ github: e.target.value })}
          placeholder="https://github.com/…"
        />
      </Field>
      <label className="flex cursor-pointer items-center gap-3 self-end rounded-tile border border-line bg-surface px-3.5 py-3 text-sm font-medium text-soft">
        <input
          type="checkbox"
          checked={Boolean(project.private)}
          onChange={(e) => onChange({ private: e.target.checked })}
          className="size-4 accent-[#916ce7]"
        />
        Приватный проект (без кода и демо)
      </label>
      <Field as="group" label="Технологии" className="sm:col-span-2">
        <TagInput
          value={project.technologies}
          onChange={(technologies) => onChange({ technologies })}
          suggestions={techSuggestions}
          max={15}
        />
      </Field>
      <div className="sm:col-span-2">
        <ImageInput label="Обложка" value={project.image} onChange={(image) => onChange({ image })} />
      </div>

      <div role="group" aria-label="Галерея" className="flex flex-col gap-3 sm:col-span-2">
        <span className="text-[13px] font-medium text-muted">Галерея (до 12 картинок)</span>
        {gallery.map((src, index) => (
          <div key={index} className="flex items-end gap-2">
            <div className="min-w-0 flex-1">
              <ImageInput
                label={`Картинка ${index + 1}`}
                value={src}
                onChange={(next) => onChange({ gallery: gallery.map((item, i) => (i === index ? next : item)) })}
              />
            </div>
            <MoveButtons
              index={index}
              length={gallery.length}
              label={`картинка ${index + 1}`}
              onMove={(from, to) => onChange({ gallery: moveItem(gallery, from, to) })}
            />
            <button
              type="button"
              onClick={() => onChange({ gallery: gallery.filter((_, i) => i !== index) })}
              aria-label={`Убрать картинку ${index + 1}`}
              className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-[8px] bg-icon text-soft transition-colors hover:text-[#ff6b6b]"
            >
              <RiCloseLine aria-hidden className="size-4" />
            </button>
          </div>
        ))}
        {gallery.length < 12 && (
          <AddButton onClick={() => onChange({ gallery: [...gallery, ""] })}>
            <RiAddLine aria-hidden className="size-4" /> Добавить картинку
          </AddButton>
        )}
      </div>
    </div>
  );
}

export function ProjectsEditor({ initial, techSuggestions }: { initial: Project[]; techSuggestions: string[] }) {
  const form = useSectionForm(initial, saveProjects);
  const projects = form.value;
  const [openId, setOpenId] = useState<number | null>(null);

  function add() {
    const project = newProject(projects);
    form.setValue([...projects, project]);
    setOpenId(project.id);
  }

  return (
    <div className="flex flex-col gap-3">
      <Panel
        icon={RiBriefcase4Fill}
        title={`Проекты · ${projects.length}`}
        description="Порядок здесь = порядок на сайте. Нажмите на проект, чтобы редактировать."
      >
        <ul className="flex flex-col gap-2">
          {projects.map((project, index) => {
            const open = openId === project.id;
            return (
              <li key={project.id} className="overflow-hidden rounded-tile border border-line bg-tile">
                <div className="flex items-center gap-3 p-2 pr-3">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : project.id)}
                    aria-expanded={open}
                    className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
                  >
                    <span className="relative h-11 w-16 shrink-0 overflow-hidden rounded-[8px] bg-icon">
                      {project.image && (
                        <Image src={project.image} alt="" fill unoptimized sizes="64px" className="object-cover" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 truncate text-sm font-semibold text-fg">
                        {project.title || "Без названия"}
                        {project.private && <RiLockFill aria-label="Приватный" className="size-3.5 text-faint" />}
                      </span>
                      <span className="block truncate text-xs font-medium text-faint">
                        {getProjectCategory(project)} · {project.technologies.join(", ") || "нет технологий"}
                      </span>
                    </span>
                    <RiArrowDownSLine
                      aria-hidden
                      className={cn("ml-auto size-5 shrink-0 text-faint transition-transform", open && "rotate-180")}
                    />
                  </button>
                  <MoveButtons
                    index={index}
                    length={projects.length}
                    label={project.title}
                    onMove={(from, to) => form.setValue(moveItem(projects, from, to))}
                  />
                  <DeleteButton
                    label={project.title}
                    onConfirm={() => form.setValue(projects.filter((item) => item.id !== project.id))}
                  />
                </div>
                {open && (
                  <ProjectFields
                    project={project}
                    techSuggestions={techSuggestions}
                    onChange={(patch) => form.setValue(replaceItem(projects, index, patch))}
                  />
                )}
              </li>
            );
          })}
        </ul>
        <AddButton onClick={add}>
          <RiAddLine aria-hidden className="size-4" /> Добавить проект
        </AddButton>
      </Panel>

      <SaveBar dirty={form.dirty} pending={form.pending} status={form.status} onSave={form.save} />
    </div>
  );
}
