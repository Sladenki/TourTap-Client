import type { Metadata } from "next";
import { liveTour } from "@/lib/live-demo";
import { BookPanel } from "./book-panel";

export const metadata: Metadata = {
  title: `${liveTour.title} — TourTap`,
  description: "Займите место на экскурсии. Имя сразу появится на экране в зале.",
};

export default function FinalTourPage() {
  return <BookPanel />;
}
