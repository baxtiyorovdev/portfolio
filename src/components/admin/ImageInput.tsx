"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { upload, uploadPresigned } from "@vercel/blob/client";
import { RiImageLine, RiUploadCloud2Line } from "react-icons/ri";
import { TextInput } from "./fields";
import { useUploadMode } from "./UploadModeProvider";

/**
 * Image path field with a preview and a direct-to-Vercel-Blob upload button.
 * Accepts either a /public path or an uploaded Blob URL.
 */
export function ImageInput({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (next: string) => void;
  label: string;
}) {
  const mode = useUploadMode();
  const fileRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function onFile(file: File | undefined) {
    if (!file) return;
    setError("");
    setProgress(0);
    try {
      // OIDC stores use presigned URLs; older stores use client tokens.
      const send = mode === "presigned" ? uploadPresigned : upload;
      const blob = await send(`portfolio/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
      });
      onChange(blob.url);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "";
      setError(message || "Не удалось загрузить файл.");
    } finally {
      setProgress(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const previewable = value.startsWith("/") || value.startsWith("https://");

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="text-[13px] font-medium text-muted">{label}</span>
      <div className="flex gap-3">
        <span className="relative grid size-[72px] shrink-0 place-items-center overflow-hidden rounded-tile border border-line bg-surface text-faint">
          {previewable ? (
            <Image src={value} alt="" fill unoptimized sizes="72px" className="object-cover" />
          ) : (
            <RiImageLine aria-hidden className="size-6" />
          )}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <TextInput
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="/images/example.png"
            aria-label={`${label} — путь`}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={progress !== null || mode === "none"}
              className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-[8px] bg-icon px-3 text-[13px] font-medium text-soft transition-colors hover:bg-button-hover hover:text-fg disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RiUploadCloud2Line aria-hidden className="size-4 text-primary" />
              {progress !== null ? `Загрузка… ${progress}%` : "Загрузить"}
            </button>
            {mode === "none" && !error && (
              <span className="text-xs font-medium text-faint">Загрузка появится после подключения Vercel Blob</span>
            )}
            {error && <span className="text-xs font-medium text-[#ff6b6b]">{error}</span>}
          </div>
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={(event) => onFile(event.target.files?.[0])}
      />
    </div>
  );
}
