"use client";

import { RiAddLine, RiCloseLine, RiLayoutGridFill, RiSparkling2Fill, RiStackFill } from "react-icons/ri";
import { saveHome } from "@/app/admin/actions";
import { PROCESS_ICONS, SERVICE_ICONS } from "@/lib/icons";
import type { ProcessIcon, ProcessStep, Service, ServiceIcon } from "@/types";
import { AddButton, Field, MoveButtons, Panel, SelectInput, TextInput, moveItem, replaceItem } from "./fields";
import { SaveBar } from "./SaveBar";
import { TagInput } from "./TagInput";
import { useSectionForm } from "./useSectionForm";

type HomeContent = { featuredStack: string[]; services: Service[]; workflow: ProcessStep[] };

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

/** Select with a live preview of the chosen glyph. */
function IconSelect<K extends string>({
  value,
  options,
  onChange,
}: {
  value: K;
  options: Record<K, { icon: React.ComponentType<{ className?: string }>; label: string }>;
  onChange: (next: K) => void;
}) {
  const Preview = options[value].icon;
  return (
    <span className="flex shrink-0 items-center gap-2">
      <span aria-hidden className="grid size-9 place-items-center rounded-[8px] bg-icon text-soft">
        <Preview className="size-4" />
      </span>
      <SelectInput aria-label="Иконка" value={value} onChange={(e) => onChange(e.target.value as K)} className="w-[150px]">
        {(Object.keys(options) as K[]).map((key) => (
          <option key={key} value={key}>
            {options[key].label}
          </option>
        ))}
      </SelectInput>
    </span>
  );
}

export function HomeForm({ initial, skillNames }: { initial: HomeContent; skillNames: string[] }) {
  const form = useSectionForm(initial, saveHome);
  const home = form.value;
  const set = (patch: Partial<HomeContent>) => form.setValue({ ...home, ...patch });

  return (
    <div className="flex flex-col gap-3">
      <Panel icon={RiStackFill} title="Карточка «My Stacks»" description="До 4 технологий со ссылками на их сайты.">
        <Field as="group" label="Технологии" hint="Подсказки берутся из навыков в резюме">
          <TagInput
            value={home.featuredStack}
            onChange={(featuredStack) => set({ featuredStack })}
            suggestions={skillNames}
            max={4}
          />
        </Field>
      </Panel>

      <Panel icon={RiLayoutGridFill} title="Услуги" description="Две бегущие строки в карточке «Solutions Suite».">
        <ul className="grid gap-2 lg:grid-cols-2">
          {home.services.map((service, index) => (
            <li key={index} className="flex flex-wrap items-center gap-2 rounded-tile border border-line bg-tile p-2">
              <TextInput
                aria-label="Название услуги"
                placeholder="Название"
                value={service.name}
                onChange={(e) => set({ services: replaceItem(home.services, index, { name: e.target.value }) })}
                className="min-w-[160px] flex-1"
              />
              <IconSelect<ServiceIcon>
                value={service.icon}
                options={SERVICE_ICONS}
                onChange={(icon) => set({ services: replaceItem(home.services, index, { icon }) })}
              />
              <MoveButtons
                index={index}
                length={home.services.length}
                label={service.name}
                onMove={(from, to) => set({ services: moveItem(home.services, from, to) })}
              />
              <RemoveButton
                label={service.name}
                onClick={() => set({ services: home.services.filter((_, i) => i !== index) })}
              />
            </li>
          ))}
        </ul>
        {home.services.length < 12 && (
          <AddButton onClick={() => set({ services: [...home.services, { name: "", icon: "code" }] })}>
            <RiAddLine aria-hidden className="size-4" /> Добавить услугу
          </AddButton>
        )}
      </Panel>

      <Panel icon={RiSparkling2Fill} title="Этапы работы" description="Карточка «Workflow Highlights»; описание видно во всплывающей подсказке.">
        <ul className="flex flex-col gap-2">
          {home.workflow.map((step, index) => (
            <li key={index} className="flex flex-col gap-2 rounded-tile border border-line bg-tile p-2 lg:flex-row lg:items-center">
              <TextInput
                aria-label="Название этапа"
                placeholder="Этап"
                value={step.title}
                onChange={(e) => set({ workflow: replaceItem(home.workflow, index, { title: e.target.value }) })}
                className="lg:w-[200px] lg:shrink-0"
              />
              <TextInput
                aria-label="Описание этапа"
                placeholder="Описание"
                value={step.description}
                onChange={(e) => set({ workflow: replaceItem(home.workflow, index, { description: e.target.value }) })}
              />
              <span className="flex items-center gap-2">
                <IconSelect<ProcessIcon>
                  value={step.icon}
                  options={PROCESS_ICONS}
                  onChange={(icon) => set({ workflow: replaceItem(home.workflow, index, { icon }) })}
                />
                <MoveButtons
                  index={index}
                  length={home.workflow.length}
                  label={step.title}
                  onMove={(from, to) => set({ workflow: moveItem(home.workflow, from, to) })}
                />
                <RemoveButton
                  label={step.title}
                  onClick={() => set({ workflow: home.workflow.filter((_, i) => i !== index) })}
                />
              </span>
            </li>
          ))}
        </ul>
        {home.workflow.length < 6 && (
          <AddButton
            onClick={() => set({ workflow: [...home.workflow, { title: "", description: "", icon: "build" }] })}
          >
            <RiAddLine aria-hidden className="size-4" /> Добавить этап
          </AddButton>
        )}
      </Panel>

      <SaveBar dirty={form.dirty} pending={form.pending} status={form.status} onSave={form.save} />
    </div>
  );
}
