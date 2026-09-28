"use client";

import { useActionState } from "react";
import { RiErrorWarningFill, RiLoginBoxLine } from "react-icons/ri";
import { login, type LoginState } from "@/app/admin/actions";
import { PrimaryButton } from "@/components/bento/Primitives";
import { Field, TextInput } from "./fields";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="relative flex flex-col gap-4">
      <Field label="Пароль">
        <TextInput
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={Boolean(state.error)}
          aria-describedby={state.error ? "login-error" : undefined}
        />
      </Field>
      {state.error && (
        <p id="login-error" role="alert" className="flex items-start gap-2 text-[13px] font-medium text-[#ff6b6b]">
          <RiErrorWarningFill aria-hidden className="mt-0.5 size-4 shrink-0" />
          {state.error}
        </p>
      )}
      <PrimaryButton type="submit" disabled={pending} className="w-full">
        {pending ? (
          <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : (
          <RiLoginBoxLine aria-hidden className="size-4" />
        )}
        {pending ? "Проверка…" : "Войти"}
      </PrimaryButton>
    </form>
  );
}
