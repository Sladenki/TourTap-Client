"use client";

import { useEffect, useState } from "react";
import { explainBookingError, guestsLabel, liveTour, type Booking } from "@/lib/live-demo";
import { supabase } from "@/lib/supabase-browser";
import { Logo } from "@/components/logo/logo";
import styles from "./live.module.scss";

type LinkState = "connecting" | "live" | "poll";

function sameList(current: Booking[], next: Booking[]) {
  return current.length === next.length && current.every((row, index) => row.id === next[index]?.id);
}

function isFresh(createdAt: string) {
  return Date.now() - new Date(createdAt).getTime() < 15_000;
}

function isBooking(value: unknown): value is Booking {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return typeof row.id === "string" && typeof row.name === "string" && typeof row.created_at === "string";
}

export function LiveWall() {
  const [people, setPeople] = useState<Booking[]>([]);
  const [link, setLink] = useState<LinkState>("connecting");
  const [problem, setProblem] = useState<string | null>(null);
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("setup")) {
      setBookingUrl(`${window.location.origin}/e/final`);
    }
  }, []);

  useEffect(() => {
    let stop = false;
    const client = supabase;

    async function load() {
      const { data, error } = await client
        .from("bookings")
        .select("id, name, created_at")
        .eq("tour_slug", liveTour.slug)
        .order("created_at", { ascending: true });

      if (stop) return;
      if (error) {
        setProblem(explainBookingError(error));
        return;
      }

      const next = (data ?? []) as Booking[];
      setProblem(null);
      setPeople((current) => (sameList(current, next) ? current : next));
    }

    load();
    const timer = window.setInterval(load, 3000);
    const channel = client
      .channel(`live-${liveTour.slug}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bookings",
          filter: `tour_slug=eq.${liveTour.slug}`,
        },
        (payload) => {
          if (!isBooking(payload.new)) return;
          const row = payload.new;
          setPeople((current) => (current.some((item) => item.id === row.id) ? current : [...current, row]));
          setProblem(null);
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setLink("live");
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") setLink("poll");
      });

    return () => {
      stop = true;
      window.clearInterval(timer);
      client.removeChannel(channel);
    };
  }, []);

  const latest = people.at(-1);
  const earlier = people.slice(0, -1).reverse();
  const linkLabel = link === "live" ? "В эфире" : link === "poll" ? "На связи" : "Подключаемся";

  return (
    <div className={styles.stage}>
      <header className={styles.top}>
        <div className={styles.brand}>
          <img className={styles.thumb} src={liveTour.image} alt="" />
          <p className={styles.logo}>
            <Logo className={styles.mark} />
          </p>
        </div>
        <p className={styles.live}>
          <span
            className={`${styles.dot} ${link === "live" ? styles.liveDot : ""} ${link === "poll" ? styles.pollDot : ""}`}
          />
          {linkLabel}
        </p>
      </header>

      <div className={styles.hero}>
        <div>
          <h1 className={styles.title}>{liveTour.title}</h1>
          <p className={styles.lead}>{liveTour.lead}</p>
        </div>
        <p className={styles.countBlock}>
          <span className={styles.count} key={people.length}>
            {people.length}
          </span>
          <span className={styles.countLabel}>{guestsLabel(people.length)}</span>
        </p>
      </div>

      <section className={styles.board} aria-label="Кто уже занял место">
        {problem && people.length === 0 ? <p className={styles.problem}>{problem}</p> : null}
        {!problem && !latest ? (
          <p className={styles.empty}>
            Имена появятся здесь, как только гости займут место по QR
          </p>
        ) : null}
        {latest ? (
          <div className={styles.featuredWrap} key={latest.id}>
            {isFresh(latest.created_at) ? <p className={styles.fresh}>Только что</p> : null}
            <p className={styles.featured}>{latest.name}</p>
          </div>
        ) : null}
        {earlier.length > 0 ? (
          <div className={styles.names}>
            {earlier.map((person) => (
              <span className={styles.chip} key={person.id}>
                {person.name}
              </span>
            ))}
          </div>
        ) : null}
        {bookingUrl ? (
          <p className={styles.setupUrl}>
            QR: <span>{bookingUrl}</span>
          </p>
        ) : null}
      </section>

      <p className={styles.sr} aria-live="polite">
        {people.length} {guestsLabel(people.length)}
        {latest ? `. Последний: ${latest.name}` : ""}
      </p>
    </div>
  );
}
