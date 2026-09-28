"use client";

import { RiContactsBook2Line, RiImage2Line, RiUserSmileFill } from "react-icons/ri";
import { saveAbout } from "@/app/admin/actions";
import type { About, SocialLinks } from "@/types";
import { Field, Panel, TextArea, TextInput } from "./fields";
import { ImageInput } from "./ImageInput";
import { SaveBar } from "./SaveBar";
import { TagInput } from "./TagInput";
import { useSectionForm } from "./useSectionForm";

export function ProfileForm({ initial }: { initial: About }) {
  const form = useSectionForm(initial, saveAbout);
  const about = form.value;
  const set = (patch: Partial<About>) => form.setValue({ ...about, ...patch });
  const setSocial = (patch: Partial<SocialLinks>) => set({ social: { ...about.social, ...patch } });

  return (
    <div className="flex flex-col gap-3">
      <Panel icon={RiUserSmileFill} title="Основное" description="Имя, должность и тексты на главной и в резюме.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Имя">
            <TextInput value={about.name} onChange={(e) => set({ name: e.target.value })} />
          </Field>
          <Field label="Должность">
            <TextInput value={about.title} onChange={(e) => set({ title: e.target.value })} />
          </Field>
          <Field label="Короткий тег" hint="Например: Web Developer">
            <TextInput value={about.tag} onChange={(e) => set({ tag: e.target.value })} />
          </Field>
          <Field label="Часовой пояс" hint="Показывается в резюме рядом с городом">
            <TextInput value={about.timezone} onChange={(e) => set({ timezone: e.target.value })} />
          </Field>
          <Field as="group" label="Роли в строке «I’m a …»" hint="Сменяют друг друга по кругу" className="sm:col-span-2">
            <TagInput value={about.roles} onChange={(roles) => set({ roles })} max={8} />
          </Field>
          <Field label="Описание" className="sm:col-span-2">
            <TextArea value={about.description} onChange={(e) => set({ description: e.target.value })} />
          </Field>
          <Field label="Что ищу (работа, стажировка)" className="sm:col-span-2">
            <TextArea value={about.about_job} onChange={(e) => set({ about_job: e.target.value })} rows={3} />
          </Field>
          <Field as="group" label="Языки" className="sm:col-span-2">
            <TagInput value={about.languages} onChange={(languages) => set({ languages })} max={10} />
          </Field>
        </div>
      </Panel>

      <Panel icon={RiImage2Line} title="Фото" description="Загрузите файл или укажите путь из /public.">
        <div className="grid gap-5 sm:grid-cols-2">
          <ImageInput
            label="Аватар (прозрачный PNG на фиолетовой плитке)"
            value={about.avatar}
            onChange={(avatar) => set({ avatar })}
          />
          <ImageInput label="Фото для поисковиков и соцсетей" value={about.image} onChange={(image) => set({ image })} />
        </div>
      </Panel>

      <Panel icon={RiContactsBook2Line} title="Контакты и соцсети">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email">
            <TextInput type="email" value={about.social.email} onChange={(e) => setSocial({ email: e.target.value })} />
          </Field>
          <Field label="Телефон">
            <TextInput value={about.social.phone} onChange={(e) => setSocial({ phone: e.target.value })} />
          </Field>
          <Field label="Местоположение">
            <TextInput value={about.social.location} onChange={(e) => setSocial({ location: e.target.value })} />
          </Field>
          <Field label="Опыт" hint="Например: 2+ Years — число идёт в счётчик">
            <TextInput value={about.social.experience} onChange={(e) => setSocial({ experience: e.target.value })} />
          </Field>
          <Field label="Telegram (ссылка)">
            <TextInput value={about.social.telegram} onChange={(e) => setSocial({ telegram: e.target.value })} />
          </Field>
          <Field label="GitHub (ссылка)">
            <TextInput value={about.social.github} onChange={(e) => setSocial({ github: e.target.value })} />
          </Field>
          <Field label="Instagram (ссылка)" className="sm:col-span-2">
            <TextInput value={about.social.instagram} onChange={(e) => setSocial({ instagram: e.target.value })} />
          </Field>
        </div>
      </Panel>

      <SaveBar dirty={form.dirty} pending={form.pending} status={form.status} onSave={form.save} />
    </div>
  );
}
