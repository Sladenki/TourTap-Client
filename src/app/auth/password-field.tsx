"use client";

import { useState, type InputHTMLAttributes } from "react";
import styles from "./auth.module.scss";

type PasswordFieldProps = {
  id: string;
  label: string;
  className?: string;
  invalid?: boolean;
  message?: string;
  messageTone?: "error" | "success";
  hint?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id" | "className">;

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M3 12s3.5-6.5 9-6.5S21 12 21 12s-3.5 6.5-9 6.5S3 12 3 12Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M4 4l16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 12s3.5-6.5 9-6.5S21 12 21 12s-3.5 6.5-9 6.5S3 12 3 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function PasswordField({
  id,
  label,
  className,
  invalid,
  message,
  messageTone = "error",
  hint,
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const messageId = message ? `${id}-message` : undefined;

  return (
    <div className={classNames(styles.field, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.control}>
        <input
          {...props}
          id={id}
          className={classNames(
            styles.input,
            styles.inputWithToggle,
            invalid && styles.inputInvalid,
            messageTone === "success" && message && styles.inputValid,
          )}
          type={visible ? "text" : "password"}
          aria-invalid={invalid || undefined}
          aria-describedby={messageId}
        />
        <button
          className={styles.toggle}
          type="button"
          aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
          onClick={() => setVisible((value) => !value)}
        >
          <EyeIcon open={visible} />
        </button>
      </div>
      {message ? (
        <p
          id={messageId}
          className={messageTone === "success" ? styles.fieldSuccess : styles.fieldError}
          role="status"
        >
          {message}
        </p>
      ) : hint ? (
        <p className={styles.passwordHint}>{hint}</p>
      ) : null}
    </div>
  );
}
