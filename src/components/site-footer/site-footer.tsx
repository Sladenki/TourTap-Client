import styles from "./site-footer.module.scss";

const defaultLinks = [
  { href: "/#how", label: "Как это работает" },
  { href: "/#guides", label: "Для гидов" },
  { href: "/#faq", label: "Вопросы" },
  { href: "/auth", label: "Открыть бота" },
];

type SiteFooterProps = {
  links?: Array<{ href: string; label: string }>;
  actionHref?: string;
};

function Arrow() {
  return (
    <svg className={styles.arrowIcon} viewBox="0 0 23 23" aria-hidden="true">
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

export function SiteFooter({
  links = defaultLinks,
  actionHref = "/auth",
}: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <p>
          Из вашего поста —
          <br />
          в новое приключение.
        </p>
        <nav aria-label="Подвал">
          {links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className={styles.wordmark}>
        <p>TourTap</p>
        <a href={actionHref} aria-label="Создать экскурсию">
          <Arrow />
        </a>
      </div>
      <div className={styles.legal}>
        <p>© 2026 TourTap</p>
        <p>
          <a href="#privacy">Политика конфиденциальности</a>
          <a href="#terms">Условия использования</a>
        </p>
      </div>
    </footer>
  );
}
