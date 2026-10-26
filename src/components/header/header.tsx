import { Button, type Device } from "../button/button";
import styles from "./header.module.scss";

const defaultLinks = [
  { href: "#how", label: "Как это работает" },
  { href: "#guides", label: "Для гидов" },
  { href: "#faq", label: "Вопросы" },
];

type HeaderProps = {
  layout?: Device;
  links?: Array<{ href: string; label: string }>;
  actionHref?: string;
  actionLabel?: string;
};

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Header({
  layout,
  links = defaultLinks,
  actionHref = "#bot",
  actionLabel = "Открыть бота",
}: HeaderProps) {
  return (
    <header className={classNames(styles.header, layout && styles[layout])}>
      <a className={styles.logo} href="/">
        <svg className={styles.mark} viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="9" fill="currentColor" />
          <path
            d="M8 16.2 23.2 9.2 16.4 23.4 14.6 17.6 8 16.2Z"
            fill="#fff"
          />
          <path d="M14.7 17.4 23.2 9.2" fill="none" stroke="#fff" strokeWidth="1.2" />
        </svg>
        TourTap
      </a>
      <nav className={styles.links} aria-label="Разделы">
        {links.map((link) => (
          <a key={link.href} className={styles.link} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <Button variant="outline" href={actionHref}>
        {actionLabel}
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path
            d="M4 12 12 4M7 4h5v5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </header>
  );
}
