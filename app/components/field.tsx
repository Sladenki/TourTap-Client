import type { InputHTMLAttributes } from "react";
import styles from "./field.module.css";
import type { Device } from "./button";

type BookingFieldProps = {
  device?: Device;
} & InputHTMLAttributes<HTMLInputElement>;

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function BookingField({ device, className, ...props }: BookingFieldProps) {
  return (
    <input
      className={classNames(styles.field, device && styles[device], className)}
      {...props}
    />
  );
}
