"use client";

import { useEffect, useRef, useState } from "react";
import { Map as MapLibreMap, Marker, NavigationControl, setWorkerUrl, type MapMouseEvent, type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Button } from "@/components/button/button";
import {
  CATEGORIES,
  categoryById,
  excursions,
  formatPlaces,
  formatPrice,
  formatRating,
  toRouteCollection,
  type CategoryId,
  type RouteStop,
} from "@/lib/mock-excursions";
import { MapHeader } from "./map-header";
import { addCityAndRoutes, frameRoutes, STYLE_URL, syncScene, tuneMonochromeStyle } from "./scene";
import styles from "./map.module.scss";

type MarkerEntry = {
  id: string;
  category: CategoryId;
  kind: RouteStop["kind"];
  element: HTMLButtonElement;
};

function prefersStill() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function overviewPadding() {
  if (window.innerWidth < 860) return { top: 136, right: 18, bottom: 64, left: 18 };
  return { top: 92, right: 70, bottom: 56, left: 236 };
}

function focusPadding() {
  if (window.innerWidth < 860) return { top: 136, right: 48, bottom: 280, left: 22 };
  return { top: 96, right: 410, bottom: 64, left: 248 };
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 23 23" width="14" height="14" aria-hidden="true">
      <path
        d="M16.291 16.291V6.709H6.709M16.291 6.709 6.709 16.291"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className={styles.star} viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M6 1.2 7.3 4.3l3.4.3-2.6 2.2.8 3.3L6 8.4 3.1 10.1l.8-3.3L1.3 4.6l3.4-.3L6 1.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function MapExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<MarkerEntry[]>([]);
  const hoverRef = useRef<(id: string | null) => void>(() => {});
  const selectRef = useRef<(id: string | null) => void>(() => {});
  const opened = useRef(false);
  const [mapReady, setMapReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  hoverRef.current = (id) => setHoverId((current) => (current === id ? current : id));
  selectRef.current = (id) => setSelectedId(id);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let map: MapLibreMap | null = null;
    let cancelled = false;

    const onResize = () => map?.resize();
    window.addEventListener("resize", onResize);

    async function mount() {
      try {
        const response = await fetch(STYLE_URL);
        if (!response.ok) throw new Error("style");
        const style = tuneMonochromeStyle(await response.json());
        if (cancelled || !containerRef.current) return;

        setWorkerUrl("/maplibre-gl-worker.js");
        map = new MapLibreMap({
          container: containerRef.current,
          style: style as unknown as StyleSpecification,
          center: [20.51, 54.712],
          zoom: 11.3,
          bearing: 0,
          pitch: 0,
          minZoom: 11,
          maxZoom: 17,
          maxPitch: 58,
          attributionControl: { compact: true },
          maplibreLogo: false,
          canvasContextAttributes: { antialias: true },
          fadeDuration: 0,
        });
        mapRef.current = map;
        map.addControl(new NavigationControl({ showCompass: true, visualizePitch: true }), "top-right");

        const routeLayers = ["route-focus", "route-line", "route-casing", "zone-core", "zone-mid", "zone-outer", "zone-field"];
        const hitId = (point: MapMouseEvent["point"]) => {
          if (!map?.isStyleLoaded()) return null;
          const layers = routeLayers.filter((id) => map?.getLayer(id));
          if (!layers.length) return null;
          const hits = map.queryRenderedFeatures(point, { layers });
          return typeof hits[0]?.properties?.id === "string" ? hits[0].properties.id : null;
        };

        map.on("load", () => {
          if (cancelled || !map) return;
          addCityAndRoutes(map, toRouteCollection(excursions));
          markersRef.current = excursions.flatMap((item) =>
            item.route.map((stop, index) => {
              const button = document.createElement("button");
              button.type = "button";
              const kindClass =
                stop.kind === "start" ? styles.pinStart : stop.kind === "end" ? styles.pinEnd : styles.pinStop;
              button.className = [styles.pin, kindClass, item.category === "eco" ? styles.pinEco : ""]
                .filter(Boolean)
                .join(" ");
              button.style.setProperty("--accent", item.color);
              button.setAttribute("aria-label", `${item.title}. ${stop.name}`);

              const pulse = document.createElement("span");
              pulse.className = styles.pulse;
              const core = document.createElement("span");
              core.className = styles.core;
              const num = document.createElement("span");
              num.className = styles.num;
              num.textContent = String(index + 1);
              core.append(num);
              button.append(pulse, core);

              button.addEventListener("mouseenter", () => hoverRef.current(item.id));
              button.addEventListener("mouseleave", () => hoverRef.current(null));
              button.addEventListener("focus", () => hoverRef.current(item.id));
              button.addEventListener("click", (event) => {
                event.stopPropagation();
                selectRef.current(item.id);
              });

              new Marker({ element: button, anchor: "center" })
                .setLngLat(stop.coordinates)
                .addTo(map!);

              return { id: item.id, category: item.category, kind: stop.kind, element: button };
            }),
          );

          const reduced = prefersStill();
          frameRoutes(map, excursions, {
            padding: overviewPadding(),
            duration: reduced ? 0 : 1500,
            pitch: reduced ? 0 : 42,
            bearing: reduced ? 0 : -16,
            maxZoom: 13.4,
          });
          setMapReady(true);
        });

        map.on("mousemove", (event) => {
          const id = hitId(event.point);
          hoverRef.current(id);
          map?.getCanvas().style.setProperty("cursor", id ? "pointer" : "");
        });
        map.on("mouseout", () => hoverRef.current(null));
        map.on("click", (event) => selectRef.current(hitId(event.point)));
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void mount();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      markersRef.current = [];
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    syncScene(map, { category, hoverId, selectedId });

    for (const entry of markersRef.current) {
      const allowed = category === "all" || entry.category === category;
      const on = entry.id === hoverId || entry.id === selectedId;
      const hide = !allowed || (entry.kind === "stop" && !on);
      entry.element.classList.toggle(styles.isHidden, hide);
      entry.element.classList.toggle(styles.isOn, allowed && on);
      entry.element.classList.toggle(styles.isActive, allowed && entry.id === selectedId);
      entry.element.classList.toggle(styles.isDim, allowed && !hide && Boolean(hoverId || selectedId) && !on);
      entry.element.style.zIndex = on ? "2" : "1";
      entry.element.setAttribute("aria-current", entry.id === selectedId ? "true" : "false");
    }
  }, [category, hoverId, selectedId, mapReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    const reduced = prefersStill();
    if (!selectedId) {
      if (!opened.current) return;
      frameRoutes(map, excursions, {
        padding: overviewPadding(),
        duration: reduced ? 0 : 900,
        pitch: reduced ? 0 : 42,
        bearing: reduced ? 0 : -16,
      });
      return;
    }
    opened.current = true;
    const item = excursions.find((excursion) => excursion.id === selectedId);
    if (!item) return;
    frameRoutes(map, [item], {
      padding: focusPadding(),
      duration: reduced ? 0 : 1100,
      pitch: reduced ? 0 : 51,
      bearing: reduced ? 0 : -24,
      maxZoom: 15.2,
    });
  }, [selectedId, mapReady]);

  function chooseCategory(next: CategoryId | "all") {
    setCategory(next);
    setHoverId(null);
    setSelectedId((current) => {
      if (!current || next === "all") return current;
      const item = excursions.find((excursion) => excursion.id === current);
      return item && item.category !== next ? null : current;
    });
  }

  function refitSelected() {
    const map = mapRef.current;
    const item = excursions.find((excursion) => excursion.id === selectedId);
    if (!map || !item) return;
    const reduced = prefersStill();
    frameRoutes(map, [item], {
      padding: focusPadding(),
      duration: reduced ? 0 : 900,
      pitch: reduced ? 0 : 51,
      bearing: reduced ? 0 : -24,
      maxZoom: 15.2,
    });
  }

  const selected = excursions.find((item) => item.id === selectedId) ?? null;
  const previewId = hoverId && hoverId !== selectedId ? hoverId : null;
  const preview = excursions.find((item) => item.id === previewId) ?? null;
  const previewCategory = preview ? categoryById(preview.category) : null;

  return (
    <div className={styles.page}>
      <div
        ref={containerRef}
        className={mapReady ? `${styles.map} ${styles.mapReady}` : styles.map}
        role="application"
        aria-label="Карта экскурсий по Калининграду"
      />
      <MapHeader />
      <div className={styles.filters} role="toolbar" aria-label="Категории экскурсий">
        <button
          type="button"
          className={styles.filter}
          aria-pressed={category === "all"}
          onClick={() => chooseCategory("all")}
        >
          <i className={`${styles.swatch} ${styles.swatchAll}`} />
          Все
        </button>
        {CATEGORIES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={styles.filter}
            aria-pressed={category === item.id}
            onClick={() => chooseCategory(item.id)}
          >
            <i className={styles.swatch} style={{ "--swatch": item.color } as React.CSSProperties} />
            {item.label}
          </button>
        ))}
      </div>

      {preview && previewCategory && (
        <div className={styles.preview} data-category={preview.category}>
          <i className={styles.swatch} style={{ "--swatch": preview.color } as React.CSSProperties} />
          <div className={styles.previewCopy}>
            <p className={styles.previewKicker}>{previewCategory.label}</p>
            <p className={styles.previewTitle}>{preview.title}</p>
          </div>
          <p className={styles.previewMeta}>{preview.duration}</p>
        </div>
      )}

      {selected && (
        <section className={styles.sheet} data-category={selected.category} aria-label={selected.title}>
          <div className={styles.cardTop}>
            <p className={styles.cardKicker}>
              <i className={styles.swatch} style={{ "--swatch": selected.color } as React.CSSProperties} />
              {categoryById(selected.category).label}
            </p>
            <button type="button" className={styles.close} onClick={() => setSelectedId(null)} aria-label="Закрыть">
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <h2 className={styles.title}>{selected.title}</h2>
          <p className={styles.text}>{selected.description}</p>
          <ul className={styles.stats}>
            <li>{selected.duration}</li>
            <li>{formatPrice(selected.price)}</li>
            <li className={styles.rating}>
              <StarIcon />
              {formatRating(selected.rating)}
            </li>
            <li>{formatPlaces(selected.availablePlaces)}</li>
          </ul>
          <p className={styles.when}>
            {selected.date} · {selected.startTime}
          </p>
          <p className={styles.path}>
            {selected.route.map((stop, index) => (
              <span key={`${stop.name}-${index}`}>
                {index > 0 && (
                  <span className={styles.pathArrow} style={{ "--route": selected.color } as React.CSSProperties}>
                    {" → "}
                  </span>
                )}
                {stop.name}
              </span>
            ))}
          </p>
          <Button variant="outline" className={styles.more} onClick={refitSelected}>
            Подробнее
            <ArrowIcon />
          </Button>
        </section>
      )}

      {failed && <p className={styles.notice}>Карта не загрузилась. Проверьте сеть и обновите страницу.</p>}
    </div>
  );
}
