export const liveTour = {
  slug: "final",
  title: "Финал Поколения Z",
  kicker: "Экскурсия",
  lead: "От идеи до сообщества. Преакселератор.",
  when: "12 октября — 24 ноября",
  image: "/assets/pokolenie-z.jpg",
} as const;

export type Booking = {
  id: string;
  name: string;
  created_at: string;
};

const storageKey = `tourtap-live-${liveTour.slug}`;

export function cleanName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function nameError(name: string) {
  if (name.length < 2) return "Напишите, как вас представить";
  if (name.length > 40) return "Слишком длинное имя";
  return null;
}

export function guestsLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "человек";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "человека";
  return "человек";
}

export function explainBookingError(error: { message: string; code?: string }) {
  const message = error.message.toLowerCase();
  if (message.includes("row-level security") || error.code === "42501") {
    return "База ещё не открыта для записи. Выполните SQL из supabase/live-bookings.sql.";
  }
  if (
    message.includes("does not exist") ||
    message.includes("schema cache") ||
    error.code === "42P01" ||
    error.code === "PGRST205"
  ) {
    return "Таблицы bookings ещё нет. Выполните SQL из supabase/live-bookings.sql.";
  }
  if (message.includes("failed to fetch") || message.includes("network")) {
    return "Нет связи с Supabase. Проверьте интернет: бесплатный проект мог уснуть.";
  }
  if (message.includes("check constraint") || error.code === "23514") {
    return "Имя не подходит. Напишите его короче.";
  }
  return "Не получилось записать имя. Попробуйте ещё раз.";
}

export function readSavedBooking(): Booking | null {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Booking>;
    if (!parsed.id || !parsed.name || !parsed.created_at) return null;
    return { id: parsed.id, name: parsed.name, created_at: parsed.created_at };
  } catch {
    return null;
  }
}

export function saveBooking(booking: Booking) {
  localStorage.setItem(storageKey, JSON.stringify(booking));
}

export function clearSavedBooking() {
  localStorage.removeItem(storageKey);
}
