import styles from "./map.module.scss";

export function MapHeader() {
  return (
    <header className={styles.top}>
      <a className={styles.brand} href="/">
        <svg className={styles.mark} viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="10" fill="currentColor" />
          <path
            d="M20.791 20.791V11.209H11.209M20.791 11.209 11.209 20.791"
            fill="none"
            stroke="#fdf3ff"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        TourTap
      </a>
      <div className={styles.place}>
        <p className={styles.kicker}>EXCURSIONS</p>
        <h1 className={styles.city}>Калининград</h1>
      </div>
    </header>
  );
}
