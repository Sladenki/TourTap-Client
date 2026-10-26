import type { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

export type ButtonVariant = "primary" | "inverse" | "outline" | "booking" | "forward";
export type Device = "desktop" | "mobile";

type ButtonProps = {
  variant?: ButtonVariant;
  device?: Device;
  href?: string;
  children: React.ReactNode;
  className?: string;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "type" | "onClick">;

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  device,
  href,
  children,
  className,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = classNames(
    styles.button,
    styles[variant],
    device && styles[device],
    className,
  );

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={classes}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (event) => event.preventDefault() : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
