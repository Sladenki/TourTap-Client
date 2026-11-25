import type { Excursion } from "@/lib/mock-excursions";

const EARTH = 6378137;
const PAPER: [number, number, number] = [241, 239, 232];

type Band = "field" | "outer" | "mid" | "core";

function project(coord: [number, number], lat0: number): [number, number] {
  const lat = (lat0 * Math.PI) / 180;
  return [((coord[0] * Math.PI) / 180) * EARTH * Math.cos(lat), ((coord[1] * Math.PI) / 180) * EARTH];
}

function unproject(point: [number, number], lat0: number): [number, number] {
  const lat = (lat0 * Math.PI) / 180;
  return [(point[0] / (EARTH * Math.cos(lat))) * (180 / Math.PI), (point[1] / EARTH) * (180 / Math.PI)];
}

function unit(x: number, y: number): [number, number] {
  const length = Math.hypot(x, y) || 1;
  return [x / length, y / length];
}

function chaikin(points: [number, number][]) {
  let current = points;
  for (let pass = 0; pass < 2; pass += 1) {
    const next: [number, number][] = [];
    for (let index = 0; index < current.length; index += 1) {
      const start = current[index];
      const end = current[(index + 1) % current.length];
      next.push([start[0] * 0.72 + end[0] * 0.28, start[1] * 0.72 + end[1] * 0.28]);
      next.push([start[0] * 0.28 + end[0] * 0.72, start[1] * 0.28 + end[1] * 0.72]);
    }
    current = next;
  }
  return current;
}

function capsules(coordinates: [number, number][], radius: number) {
  const lat0 = coordinates.reduce((sum, coord) => sum + coord[1], 0) / coordinates.length;
  const points = coordinates.map((coord) => project(coord, lat0));
  return points.slice(0, -1).map((start, index) => {
    const end = points[index + 1];
    const [dx, dy] = unit(end[0] - start[0], end[1] - start[1]);
    const normal = [-dy, dx];
    const arc = (center: [number, number], from: number) =>
      Array.from({ length: 8 }, (_, step) => {
        const angle = from - (Math.PI * step) / 7;
        return [center[0] + Math.cos(angle) * radius, center[1] + Math.sin(angle) * radius] as [number, number];
      });
    const ring = chaikin([
      [start[0] + normal[0] * radius, start[1] + normal[1] * radius],
      [end[0] + normal[0] * radius, end[1] + normal[1] * radius],
      ...arc(end, Math.atan2(normal[1], normal[0])),
      [end[0] - normal[0] * radius, end[1] - normal[1] * radius],
      [start[0] - normal[0] * radius, start[1] - normal[1] * radius],
      ...arc(start, Math.atan2(-normal[1], -normal[0])),
    ]).map((point) => unproject(point, lat0));
    ring.push(ring[0]);
    return [ring];
  });
}

function mix(hex: string, amount: number) {
  const value = Number.parseInt(hex.slice(1), 16);
  const channel = (index: number) => {
    const source = (value >> (16 - index * 8)) & 255;
    return Math.round(source + (PAPER[index] - source) * amount)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(0)}${channel(1)}${channel(2)}`;
}

function bands(item: Excursion): Array<{ band: Band; radius: number; fill: string }> {
  if (item.category === "eco") {
    return [
      { band: "field", radius: 230, fill: "#e7f4ec" },
      { band: "outer", radius: 148, fill: "#d3eadc" },
      { band: "mid", radius: 86, fill: "#b7dcc8" },
      { band: "core", radius: 42, fill: item.color },
    ];
  }
  return [
    { band: "outer", radius: 118, fill: mix(item.color, 0.8) },
    { band: "mid", radius: 68, fill: mix(item.color, 0.58) },
    { band: "core", radius: 30, fill: item.color },
  ];
}

export function toZoneCollection(list: Excursion[]) {
  return {
    type: "FeatureCollection" as const,
    features: list.flatMap((item) => {
      const coordinates = item.route.map((stop) => stop.coordinates);
      return bands(item).flatMap((band) => {
        const polygons = capsules(coordinates, band.radius);
        if (!polygons.length) return [];
        return [
          {
            type: "Feature" as const,
            id: `${item.id}:${band.band}`,
            properties: {
              id: item.id,
              category: item.category,
              color: item.color,
              fill: band.fill,
              band: band.band,
            },
            geometry: { type: "MultiPolygon" as const, coordinates: polygons },
          },
        ];
      });
    }),
  };
}
