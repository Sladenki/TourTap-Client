"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/button/button";
import { PasswordField } from "./password-field";
import { formatPhone, isValidLogin, loginError, looksLikePhone } from "./validation";
import styles from "./auth.module.scss";

function Arrow() {
  return (
    <svg className={styles.submitIcon} viewBox="0 0 23 23" aria-hidden="true">
      <path
        d="M16.291 16.291V6.709H6.709M16.291 6.709 6.709 16.291"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function LoginForm() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const loginMessage = loginError(login);
  const canSubmit = isValidLogin(login) && password.length > 0;

  function onLoginChange(value: string) {
    if (looksLikePhone(value) || (/^\d/.test(value) && !value.includes("@"))) {
      setLogin(formatPhone(value));
      return;
    }
    setLogin(value);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    router.push("/dashboard");
  }

  return (
    <>
      <div className={styles.intro}>
        <p className={styles.kicker}>
          <span className={styles.dot} />
          01 / Снова на маршруте
        </p>
        <h1 className={styles.title}>С возвращением</h1>
        <p className={styles.lead}>Войдите в личный кабинет TourTap.</p>
      </div>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="login-login">
            Email или телефон
          </label>
          <div className={styles.control}>
            <input
              id="login-login"
              className={classNames(styles.input, loginMessage && styles.inputInvalid)}
              name="login"
              type="text"
              autoComplete="username"
              placeholder="Введите email или номер телефона"
              value={login}
              onChange={(event) => onLoginChange(event.target.value)}
              aria-invalid={Boolean(loginMessage) || undefined}
              aria-describedby={loginMessage ? "login-login-error" : undefined}
              required
            />
          </div>
          {loginMessage ? (
            <p id="login-login-error" className={styles.fieldError} role="alert">
              {loginMessage}
            </p>
          ) : null}
        </div>

        <PasswordField
          id="login-password"
          label="Пароль"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <a className={styles.forgot} href="#forgot">
          Забыли пароль?
        </a>

        <Button className={styles.submit} type="submit" disabled={!canSubmit}>
          Войти
          <Arrow />
        </Button>

        <p className={styles.switch}>
          Нет аккаунта? <a href="/auth">Зарегистрироваться</a>
        </p>

        <p className={styles.legal}>© 2026 TourTap</p>
      </form>
    </>
  );
}
