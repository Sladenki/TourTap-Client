import { Logo } from "@/components/logo/logo";
import styles from "./map.module.scss";

export function MapHeader() {
  return (
    <header className={styles.top}>
      <a className={styles.brand} href="/" aria-label="TourTap">
        <Logo className={styles.mark} alt="" />
      </a>
      <div className={styles.place}>
        <p className={styles.kicker}>EXCURSIONS</p>
        <h1 className={styles.city}>Калининград</h1>
      </div>
    </header>
  );
}
