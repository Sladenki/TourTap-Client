import type { Metadata } from "next";
import { liveTour } from "@/lib/live-demo";
import { LiveWall } from "./live-wall";

export const metadata: Metadata = {
  title: `${liveTour.title} — в эфире`,
  description: "Живой список гостей экскурсии.",
};

export default function LiveTourPage() {
  return <LiveWall />;
}
