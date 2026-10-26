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
      </Button>
    </header>
  );
}
