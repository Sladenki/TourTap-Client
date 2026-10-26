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
          <rect width="32" height="32" rx="10" fill="currentColor" />
          <path
            d="M20.791 20.791V11.209H11.209M20.791 11.209 11.209 20.791"
            fill="none"
            stroke="#20201e"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
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
        <svg viewBox="0 0 23 23" width="16" height="16" aria-hidden="true">
          <path
            d="M16.291 16.291V6.709H6.709M16.291 6.709 6.709 16.291"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </Button>
    </header>
  );
}
