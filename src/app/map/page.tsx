import type { Metadata } from "next";
import { MapPage } from "./map-page";

export const metadata: Metadata = {
  title: "Карта экскурсий — Калининград — TourTap",
  description: "Демо-карта экскурсий по Калининграду: маршруты, категории и карточки.",
};

export default function Page() {
  return <MapPage />;
}
