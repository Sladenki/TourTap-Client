import type { Metadata } from "next";
import { Button } from "@/components/button/button";
import styles from "./dashboard.module.scss";

export const metadata: Metadata = {
  title: "Дашборд — TourTap",
  description: "Личный кабинет гида TourTap.",
};

const user = {
  firstName: "Анна",
  fullName: "Анна Кузнецова",
  initials: "АК",
  role: "Самозанятый (НПД)",
};

const stats = [
  { label: "Активные туры", value: "0", icon: "map" as const },
  { label: "Продано билетов", value: "0", icon: "ticket" as const },
  { label: "Баланс", value: "0 ₽", icon: "wallet" as const },
];

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

function NavIcon({ name }: { name: "dashboard" | "tours" | "finance" | "settings" }) {
  if (name === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (name === "tours") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 8.5h16v9.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M8 8.5V6.8a4 4 0 0 1 8 0V8.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 12h16" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (name === "finance") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M8.5 8h7M8.5 12h7M8.5 16h4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatIcon({ name }: { name: "map" | "ticket" | "wallet" }) {
  if (name === "map") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M9 4.5 3.5 6.5v13L9 17.5l6 2 5.5-2v-13L15 6.5 9 4.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M9 4.5v13M15 6.5v13" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (name === "ticket") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M3.5 9.5A2 2 0 0 0 5.5 7.5h13a2 2 0 0 1 2 2v1a1.5 1.5 0 0 0 0 3v1a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-1a1.5 1.5 0 0 0 0-3v-1Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M9 8v8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2 2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 8.5h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M4 11.5h16" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 8.5V7a4 4 0 0 1 8 0v1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const nav = [
  { href: "/dashboard", label: "Дашборд", icon: "dashboard" as const, active: true },
  { href: "#tours", label: "Экскурсии", icon: "tours" as const, active: false },
  { href: "#finance", label: "Финансы", icon: "finance" as const, active: false },
  { href: "#settings", label: "Настройки", icon: "settings" as const, active: false },
];

export default function DashboardPage() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <a className={styles.brand} href="/">
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

        <nav className={styles.nav} aria-label="Кабинет">
          {nav.map((item) => (
            <a
              key={item.label}
              className={`${styles.navLink} ${item.active ? styles.navLinkActive : ""}`}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
            >
              <NavIcon name={item.icon} />
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.sidebarFoot}>
          <p className={styles.sidebarTag}>
            <Arrow />
            Ваш город. Ваш голос.
          </p>
          <p className={styles.sidebarCopy}>© 2026 TourTap</p>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <a className={`${styles.brand} ${styles.mobileBrand}`} href="/">
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

          <div className={styles.userBar}>
            <button className={styles.bell} type="button" aria-label="Уведомления">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 9.5a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13.5 6 9.5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M10 18.5a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <span className={styles.avatar} aria-hidden="true">
              {user.initials}
            </span>
            <div className={styles.userMeta}>
              <p className={styles.userName}>{user.fullName}</p>
              <p className={styles.userRole}>{user.role}</p>
            </div>
          </div>
        </header>

        <main className={styles.content}>
          <div className={styles.pageHead}>
            <p className={styles.kicker}>
              <span className={styles.dot} />
              01 / Личный кабинет
            </p>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>Дашборд</h1>
              <p className={styles.greeting}>Хорошего маршрута, {user.firstName}</p>
            </div>
          </div>

          <div className={styles.heroRow}>
            <section className={styles.hero}>
              <div>
                <h2 className={styles.heroTitle}>Создать экскурсию за 20 секунд</h2>
                <p className={styles.heroText}>
                  Ваш анонс станет страницей экскурсии с бронированием и оплатой.
                </p>
              </div>
              <Button className={styles.heroAction} href="#telegram">
                + Переслать пост из Telegram
                <Arrow className={styles.icon} />
              </Button>
            </section>

            <aside className={styles.promo}>
              <p className={styles.promoLabel}>
                Из поста
                <br />
                в билет
              </p>
              <span className={styles.badge}>20с</span>
              <p className={styles.promoFoot}>
                Меньше рутины.
                <br />
                Больше маршрутов.
              </p>
            </aside>
          </div>

          <section className={styles.stats} aria-label="Показатели">
            {stats.map((stat) => (
              <article key={stat.label} className={styles.stat}>
                <div>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <p className={styles.statValue}>{stat.value}</p>
                </div>
                <span className={styles.statIcon}>
                  <StatIcon name={stat.icon} />
                </span>
              </article>
            ))}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Активные экскурсии</h2>
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>
                <StatIcon name="ticket" />
              </span>
              <p className={styles.emptyText}>
                У вас пока нет активных экскурсий. Перешлите анонс из Telegram, чтобы запустить
                продажи.
              </p>
              <Button className={styles.emptyAction} variant="outline" href="#guide">
                Инструкция
                <Arrow className={styles.icon} />
              </Button>
            </div>
          </section>

          <footer className={styles.footer}>
            <p>Пост → Страница → Бронирование</p>
            <a className={styles.help} href="#help">
              Помощь
              <Arrow />
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
