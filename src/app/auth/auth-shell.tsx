import styles from "./auth.module.scss";

const steps = [
  "Перешлите анонс из Telegram",
  "Проверьте страницу экскурсии",
  "Поделитесь ссылкой с гостями",
];

type AuthShellProps = {
  children: React.ReactNode;
};

function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 23 23" aria-hidden="true">
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

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
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
        <a className={styles.homeLink} href="/">
          На главный сайт
          <Arrow className={styles.homeArrow} />
        </a>
      </header>

      <main className={styles.content}>
        <div className={styles.stage}>
          <aside className={styles.promo}>
            <div className={styles.promoTop}>
              <p className={styles.kicker}>
                <span className={styles.dot} />
                Для гидов, которые ведут за собой
              </p>
              <h2 className={styles.promoTitle}>
                <span>Вы — гид.</span>
                <span>Не админ.</span>
              </h2>
              <p className={styles.promoLead}>
                Больше внимания маршруту. Меньше — тому, что вокруг него.
              </p>
            </div>

            <img
              className={styles.star}
              src="/assets/Объёмная звезда.webp"
              alt=""
              width={280}
              height={280}
            />

            <ol className={styles.steps}>
              {steps.map((step, index) => (
                <li key={step} className={styles.step}>
                  <span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.stepText}>{step}</span>
                  <Arrow className={styles.stepArrow} />
                </li>
              ))}
            </ol>
          </aside>

          <section className={styles.panel}>{children}</section>
        </div>
      </main>
    </div>
  );
}
