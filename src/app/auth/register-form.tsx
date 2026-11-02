"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/button/button";
import { PasswordField } from "./password-field";
import {
  emailError,
  formatName,
  formatPhone,
  isEmail,
  isPhone,
  passwordComplete,
  passwordRules,
  phoneError,
} from "./validation";
import styles from "./auth.module.scss";

const passwordChecklist = [
  { key: "minLength" as const, label: "Минимум 8 символов" },
  { key: "hasUppercase" as const, label: "Есть хотя бы одна заглавная буква (A – Z)" },
  { key: "hasDigit" as const, label: "Минимум одна цифра" },
];

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

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);

  const rules = passwordRules(password);
  const showRules = password.length > 0;
  const emailMessage = emailError(email);
  const phoneMessage = phoneError(phone);
  const passwordsMatch = confirm.length > 0 && confirm === password;
  const passwordsMismatch = confirm.length > 0 && confirm !== password;
  const confirmMessage = passwordsMismatch
    ? "Пароли не совпадают"
    : passwordsMatch
      ? "Пароли совпадают"
      : "";

  const canSubmit =
    name.trim().length > 1 &&
    isEmail(email) &&
    isPhone(phone) &&
    passwordComplete(password) &&
    confirm === password &&
    agreed;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
  }

  return (
    <>
      <div className={styles.intro}>
        <p className={styles.kicker}>
          <span className={styles.dot} />
          01 / Начало вашего маршрута
        </p>
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.lead}>
          Создайте аккаунт, чтобы публиковать экскурсии и принимать бронирования.
        </p>
      </div>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="register-name">
            ФИО
          </label>
          <div className={styles.control}>
            <input
              id="register-name"
              className={styles.input}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Введите фамилию, имя и отчество"
              value={name}
              onChange={(event) => setName(formatName(event.target.value))}
              onKeyDown={(event) => {
                if (/\d/.test(event.key)) event.preventDefault();
              }}
              inputMode="text"
              required
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="register-email">
            Электронная почта
          </label>
          <div className={styles.control}>
            <input
              id="register-email"
              className={classNames(styles.input, emailMessage && styles.inputInvalid)}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Введите email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(emailMessage) || undefined}
              aria-describedby={emailMessage ? "register-email-error" : undefined}
              required
            />
          </div>
          {emailMessage ? (
            <p id="register-email-error" className={styles.fieldError} role="alert">
              {emailMessage}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="register-phone">
            Телефон
          </label>
          <div className={styles.control}>
            <input
              id="register-phone"
              className={classNames(styles.input, phoneMessage && styles.inputInvalid)}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
              aria-invalid={Boolean(phoneMessage) || undefined}
              aria-describedby={phoneMessage ? "register-phone-error" : undefined}
              required
            />
          </div>
          {phoneMessage ? (
            <p id="register-phone-error" className={styles.fieldError} role="alert">
              {phoneMessage}
            </p>
          ) : null}
        </div>

        <PasswordField
          id="register-password"
          label="Пароль"
          name="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          hint={
            showRules ? undefined : "Минимум 8 символов, заглавная латинская буква и цифра."
          }
          required
        />

        <div
          className={classNames(styles.hintWrap, showRules && styles.hintOpen)}
          aria-hidden={!showRules}
        >
          <div className={styles.hintInner}>
            <ul className={styles.rules} aria-label="Требования к паролю">
              {passwordChecklist.map((item) => {
                const checked = rules[item.key];
                return (
                  <li key={item.key} className={classNames(styles.rule, checked && styles.ruleMet)}>
                    <span className={styles.ruleCheck} aria-hidden="true">
                      <input
                        className={styles.checkboxInput}
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}}
                        tabIndex={-1}
                        aria-checked={checked}
                      />
                      <span className={styles.checkbox}>
                        <svg viewBox="0 0 16 16" width="11" height="11">
                          <path
                            d="M3.2 8.2 6.4 11.2 12.8 4.6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </span>
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <PasswordField
          id="register-confirm"
          label="Подтвердите пароль"
          name="confirm"
          autoComplete="new-password"
          placeholder="••••••••"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          invalid={passwordsMismatch}
          message={confirmMessage}
          messageTone={passwordsMatch ? "success" : "error"}
          required
        />

        <label className={styles.agree}>
          <span className={styles.agreeControl}>
            <input
              className={styles.checkboxInput}
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              required
            />
            <span className={styles.agreeMark} aria-hidden="true">
              <svg viewBox="0 0 16 16" width="12" height="12">
                <path
                  d="M3.2 8.2 6.4 11.2 12.8 4.6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
          <span>
            Принимаю{" "}
            <a href="#terms">пользовательское соглашение</a> и{" "}
            <a href="#privacy">политику конфиденциальности</a>.
          </span>
        </label>

        <Button className={styles.submit} type="submit" disabled={!canSubmit}>
          Зарегистрироваться
          <Arrow />
        </Button>

        <p className={styles.switch}>
          Уже есть аккаунт? <a href="/auth/login">Войти</a>
        </p>

        <p className={styles.legal}>© 2026 TourTap</p>
      </form>
    </>
  );
}
