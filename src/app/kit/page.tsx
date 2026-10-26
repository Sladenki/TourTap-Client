import type { Metadata } from "next";
import { Button } from "@/components/button/button";
import { BookingField } from "@/components/field/field";
import { Card } from "@/components/card/card";
import { Header } from "@/components/header/header";
import styles from "./kit.module.scss";

export const metadata: Metadata = {
  title: "TourTap UI Kit",
  description: "Кнопки, поле бронирования, карточки и шапка TourTap.",
};

const buttons = [
  ["primary", "Создать экскурсию"],
  ["inverse", "Создать экскурсию"],
  ["outline", "Открыть бота"],
  ["booking", "Забронировать"],
  ["forward", "Переслать пост"],
] as const;

export default function KitPage() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.kicker}>TourTap / UI Kit</p>
        <h1 className={styles.title}>Компоненты</h1>
        <p className={styles.lead}>
          Общие кнопки, поле, карточки и шапка. Размеры и цвета взяты из UI Kit:
          light desktop — основной замер, mobile включается на узкой ширине или
          отдельным примером.
        </p>
      </header>

      <section className={styles.section} id="navigation">
        <h2 className={styles.heading}>Навигация</h2>
        <p className={styles.copy}>
          Desktop 1440 × 104, линия только снизу. Mobile 390 × 80: логотип и
          кнопка, ссылки в эту высоту не помещаются.
        </p>
        <div className={styles.scroll}>
          <Header layout="desktop" />
        </div>
        <div className={styles.phone}>
          <Header layout="mobile" />
        </div>
      </section>

      <section className={styles.section} id="buttons">
        <h2 className={styles.heading}>Кнопки</h2>
        <div className={styles.grid}>
          {buttons.map(([variant, label]) => (
            <div className={styles.row} key={variant}>
              <p className={styles.caption}>{variant}</p>
              <Button variant={variant} device="desktop">
                {label}
              </Button>
              <Button variant={variant} device="mobile">
                {label}
              </Button>
              <Button variant={variant} device="desktop" disabled>
                {label}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} id="field">
        <h2 className={styles.heading}>Поле</h2>
        <div className={styles.pair}>
          <BookingField
            name="booking-time"
            aria-label="Время экскурсии"
            defaultValue="Суббота · 18:00"
            device="desktop"
          />
          <Button variant="booking" device="desktop">
            Забронировать
          </Button>
        </div>
      </section>

      <section className={styles.section} id="cards">
        <h2 className={styles.heading}>Карточки</h2>
        <div className={styles.cards}>
          <Card variant="subtle" padding="md" className={styles.stepPost}>
            <p className={styles.caption}>Step-post</p>
            <h3 className={styles.cardTitle}>Хороший пост — уже начало.</h3>
            <p className={styles.cardCopy}>
              Фото, маршрут, детали — перешлите свой пост боту.
            </p>
          </Card>
          <Card variant="accent" padding="md" className={styles.stepPage}>
            <p className={styles.caption}>Step-page</p>
            <h3 className={styles.cardTitle}>Не просто ссылка. Приглашение в город.</h3>
            <p className={styles.cardCopy}>
              Фото, описание, условия и бронирование — на одной странице.
            </p>
          </Card>
          <Card variant="mint" padding="md" className={styles.stepBooking}>
            <p className={styles.caption}>Step-booking</p>
            <h3 className={styles.cardTitle}>20 секунд. Всё собирается.</h3>
            <BookingField
              name="slot"
              aria-label="Слот"
              defaultValue="Суббота · 18:00"
              device="mobile"
            />
            <Button variant="booking" device="mobile">
              Забронировать
            </Button>
          </Card>
          <Card variant="accent" padding="lg" className={styles.payment}>
            <p className={styles.caption}>Payment</p>
            <h3 className={styles.cardTitle}>Оплата без переписки</h3>
            <p className={styles.cardCopy}>
              Оферта, онлайн-оплата и чек — в одном сценарии бронирования.
            </p>
          </Card>
          <Card variant="subtle" padding="lg" className={styles.journey}>
            <p className={styles.caption}>Guest-journey</p>
            <h3 className={styles.cardTitle}>Понятно гостю. Удобно вам.</h3>
            <p className={styles.cardCopy}>
              Одна ссылка для вашего Telegram.
            </p>
          </Card>
          <Card variant="elevated" padding="none" className={styles.excursion}>
            <div className={styles.excursionBody}>
              <p className={styles.caption}>Excursion</p>
              <h3 className={styles.cardTitle}>Янтарный закат в янтарном крае</h3>
              <p className={styles.cardCopy}>
                Увидим знакомый город с неожиданного ракурса.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
