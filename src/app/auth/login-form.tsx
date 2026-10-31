"use client";

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
  }

  return (
    <>
      <h1 className={styles.panelHead}>Давайте войдем в ваш профиль</h1>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="login-login">
            Ваша почта или номер телефона
          </label>
          <div className={styles.control}>
            <input
              id="login-login"
              className={classNames(styles.input, loginMessage && styles.inputInvalid)}
              name="login"
              type="text"
              autoComplete="username"
              placeholder="example@mail.ru или +7 (999) 777-77-77"
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
          label="Введите ваш пароль"
          name="password"
          autoComplete="current-password"
          placeholder="*********"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <p className={styles.note}>
          Если у Вас в профиле была прикреплена социальная сеть — вы можете войти с помощью нее!
          <br />
          Если нет — <a href="/auth">мы поможем это сделать здесь.</a>
          <br />
          Все для вашего удобства!
        </p>

        <Button className={styles.submit} type="submit" disabled={!canSubmit}>
          ВОЙТИ
          <Arrow />
        </Button>

        <p className={styles.switch}>
          Нет аккаунта? <a href="/auth">Зарегистрироваться</a>
        </p>
      </form>
    </>
  );
}
