"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/button/button";
import { BookingField } from "@/components/field/field";
import {
  cleanName,
  clearSavedBooking,
  explainBookingError,
  liveTour,
  nameError,
  readSavedBooking,
  saveBooking,
  type Booking,
} from "@/lib/live-demo";
import { supabase } from "@/lib/supabase-browser";
import { TourMark } from "./tour-mark";
import styles from "./book.module.scss";

export function BookPanel() {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setSaved(readSavedBooking());
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = cleanName(name);
    const validation = nameError(nextName);
    if (validation) {
      setError(validation);
      return;
    }
    if (!supabase) {
      setError("Нет publishable key в .env.local.");
      return;
    }

    setPending(true);
    setError(null);
    const { data, error: insertError } = await supabase
      .from("bookings")
      .insert({ tour_slug: liveTour.slug, name: nextName })
      .select("id, name, created_at")
      .single();

    setPending(false);
    if (insertError || !data) {
      setError(explainBookingError(insertError ?? { message: "" }));
      return;
    }

    const booking = data as Booking;
    saveBooking(booking);
    setSaved(booking);
  }

  function bookAnother() {
    clearSavedBooking();
    setSaved(null);
    setName("");
    setError(null);
  }

  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <a className={styles.logo} href="/">
          <TourMark className={styles.mark} />
          TourTap
        </a>
      </header>

      <main className={styles.layout}>
        <img
          className={styles.poster}
          src={liveTour.image}
          alt="Поколение Z: от идеи до сообщества, преакселератор, 12 октября — 24 ноября"
        />

        <section className={styles.copy}>
          <p className={styles.kicker}>
            <span className={styles.dot} />
            {liveTour.kicker}
          </p>
          <h1 className={styles.title}>{liveTour.title}</h1>
          <p className={styles.lead}>{liveTour.lead}</p>
          <p className={styles.when}>{liveTour.when}</p>

          <div className={styles.panel}>
            {saved ? (
              <div className={styles.success}>
                <p className={styles.successKicker}>Место ваше</p>
                <p className={styles.successName}>{saved.name}</p>
                <p className={styles.successText}>Вы уже на экране в зале.</p>
                <button type="button" className={styles.again} onClick={bookAnother}>
                  Записать другое имя
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit}>
                <label className={styles.label}>
                  Как вас представить на экране
                  <BookingField
                    className={styles.name}
                    name="name"
                    value={name}
                    placeholder="Имя"
                    autoComplete="name"
                    autoCapitalize="words"
                    enterKeyHint="done"
                    maxLength={40}
                    disabled={pending}
                    onChange={(event) => setName(event.target.value)}
                  />
                </label>
                {supabase ? null : (
                  <p className={styles.note}>
                    Осталось вставить publishable key в .env.local и выполнить SQL в Supabase.
                  </p>
                )}
                {error ? <p className={styles.error}>{error}</p> : null}
                <Button className={styles.submit} variant="booking" type="submit" disabled={pending || !supabase}>
                  {pending ? "Записываем…" : "Занять место"}
                </Button>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
