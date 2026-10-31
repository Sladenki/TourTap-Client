import { Header } from "@/components/header/header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import styles from "./auth.module.scss";

const navLinks = [
  { href: "/#how", label: "Как это работает" },
  { href: "/#guides", label: "Для гидов" },
  { href: "/#faq", label: "Вопросы" },
];

const footerLinks = [
  ...navLinks,
  { href: "/auth", label: "Открыть бота" },
];

type AuthShellProps = {
  children: React.ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.topbar}>
        <div className={styles.page}>
          <Header links={navLinks} actionHref="/auth" />
        </div>
      </div>
      <main className={styles.content}>
        <div className={styles.stage}>
          <div className={styles.bento}>
            <aside className={styles.promo} aria-hidden="true">
              <p className={styles.promoCopy}>
                Инструменты, которые делают работу гида проще
                <span className={styles.promoHere}>здесь</span>
              </p>
              <div className={styles.orbits}>
                <span className={styles.orbit} />
                <span className={styles.orbit} />
                <span className={styles.orbit} />
                <span className={styles.orbit} />
              </div>
              <img
                className={styles.springTop}
                src="/assets/auth-spring.webp"
                alt=""
                width={191}
                height={148}
              />
              <img
                className={styles.springBottom}
                src="/assets/auth-spring.webp"
                alt=""
                width={417}
                height={390}
              />
            </aside>
            <section className={styles.panel}>{children}</section>
          </div>
        </div>
        <div className={styles.page}>
          <SiteFooter links={footerLinks} actionHref="/auth" />
        </div>
      </main>
    </div>
  );
}
