import { Button, type Device } from "../button/button";
import { Logo } from "../logo/logo";
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
  actionLabel = "Войти",
}: HeaderProps) {
  return (
    <header className={classNames(styles.header, layout && styles[layout])}>
      <a className={styles.logo} href="/" aria-label="TourTap">
        <Logo className={styles.mark} alt="" />
      </a>
      <nav className={styles.links} aria-label="Разделы">
        {links.map((link) => (
          <a key={link.href} className={styles.link} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <Button variant="outline" href={actionHref}>
        <span className={styles.actionFull}>{actionLabel}</span>
        <span className={styles.actionShort}>Войти</span>
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
