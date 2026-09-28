"use client";

import { RiAddLine, RiBookOpenFill, RiCloseLine, RiGraduationCapFill, RiStackFill } from "react-icons/ri";
import { saveResume } from "@/app/admin/actions";
import type { Education, Resume } from "@/types";
import { AddButton, MoveButtons, Panel, SelectInput, TextInput, moveItem, replaceItem } from "./fields";
import { SaveBar } from "./SaveBar";
import { useSectionForm } from "./useSectionForm";

const LEVELS = ["Advanced", "Intermediate", "Practicing"];

function RemoveButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Удалить: ${label}`}
      className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-[8px] bg-icon text-soft transition-colors hover:text-[#ff6b6b]"
    >
      <RiCloseLine aria-hidden className="size-4" />
    </button>
  );
}

function EducationList({
  items,
  onChange,
  addLabel,
}: {
  items: Education[];
  onChange: (next: Education[]) => void;
  addLabel: string;
}) {
  const nextId = () => Math.max(0, ...items.map((item) => item.id)) + 1;

  return (
    <>
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li key={item.id} className="grid gap-2 rounded-tile border border-line bg-tile p-2 sm:grid-cols-[1.4fr_0.8fr_1fr_auto]">
            <TextInput
              aria-label="Учебное заведение"
              placeholder="Учебное заведение, город"
              value={item.place}
              onChange={(e) => onChange(replaceItem(items, index, { place: e.target.value }))}
            />
            <TextInput
              aria-label="Период"
              placeholder="2020-2024"
              value={item.period}
              onChange={(e) => onChange(replaceItem(items, index, { period: e.target.value }))}
            />
            <TextInput
              aria-label="Степень или ступень"
              placeholder="Степень / ступень"
              value={item.degree}
              onChange={(e) => onChange(replaceItem(items, index, { degree: e.target.value }))}
            />
            <span className="flex gap-1.5 self-center">
              <MoveButtons
                index={index}
                length={items.length}
                label={item.place}
                onMove={(from, to) => onChange(moveItem(items, from, to))}
              />
              <RemoveButton label={item.place} onClick={() => onChange(items.filter((_, i) => i !== index))} />
            </span>
          </li>
        ))}
      </ul>
      <AddButton onClick={() => onChange([...items, { id: nextId(), place: "", period: "", degree: "" }])}>
        <RiAddLine aria-hidden className="size-4" /> {addLabel}
      </AddButton>
    </>
  );
}

export function ResumeForm({ initial }: { initial: Resume }) {
  const form = useSectionForm(initial, saveResume);
  const resume = form.value;
  const set = (patch: Partial<Resume>) => form.setValue({ ...resume, ...patch });

  return (
    <div className="flex flex-col gap-3">
      <Panel icon={RiStackFill} title="Навыки" description="Уровень определяет заполнение шкалы в резюме.">
        <ul className="grid gap-2 lg:grid-cols-2">
          {resume.skills.map((skill, index) => (
            <li key={index} className="flex items-center gap-2 rounded-tile border border-line bg-tile p-2">
              <TextInput
                aria-label="Навык"
                placeholder="Навык"
                value={skill.name}
                onChange={(e) => set({ skills: replaceItem(resume.skills, index, { name: e.target.value }) })}
              />
              <SelectInput
                aria-label="Уровень"
                value={skill.level}
                onChange={(e) => set({ skills: replaceItem(resume.skills, index, { level: e.target.value }) })}
                className="w-[150px] shrink-0"
              >
                {[...new Set([...LEVELS, skill.level])].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </SelectInput>
              <MoveButtons
                index={index}
                length={resume.skills.length}
                label={skill.name}
                onMove={(from, to) => set({ skills: moveItem(resume.skills, from, to) })}
              />
              <RemoveButton
                label={skill.name}
                onClick={() => set({ skills: resume.skills.filter((_, i) => i !== index) })}
              />
            </li>
          ))}
        </ul>
        <AddButton onClick={() => set({ skills: [...resume.skills, { name: "", level: "Intermediate" }] })}>
          <RiAddLine aria-hidden className="size-4" /> Добавить навык
        </AddButton>
      </Panel>

      <Panel icon={RiGraduationCapFill} title="Образование" description="Школы и учебные заведения.">
        <EducationList
          items={resume.education}
          onChange={(education) => set({ education })}
          addLabel="Добавить учебное заведение"
        />
      </Panel>

      <Panel icon={RiBookOpenFill} title="Курсы разработки" description="Показываются отдельной иконкой в таймлайне.">
        <EducationList
          items={resume.developer_education}
          onChange={(developer_education) => set({ developer_education })}
          addLabel="Добавить курс"
        />
      </Panel>

      <SaveBar dirty={form.dirty} pending={form.pending} status={form.status} onSave={form.save} />
    </div>
  );
}
