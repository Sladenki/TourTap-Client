"use client";

import dynamic from "next/dynamic";
import { MapHeader } from "./map-header";
import styles from "./map.module.scss";

const MapExperience = dynamic(() => import("./map-experience"), {
  ssr: false,
  loading: () => (
    <div className={styles.page}>
      <MapHeader />
    </div>
  ),
});

export function MapPage() {
  return <MapExperience />;
}
