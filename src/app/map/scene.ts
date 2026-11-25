import { LngLatBounds, type ExpressionSpecification, type FilterSpecification, type Map as MapLibreMap } from "maplibre-gl";
import { excursions, toRouteCollection, type CategoryId, type Excursion } from "@/lib/mock-excursions";

type FramePadding = { top: number; right: number; bottom: number; left: number };

export const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

const SOURCE = "routes";

type LooseLayer = {
  id: string;
  type?: string;
  paint?: Record<string, unknown>;
  layout?: Record<string, unknown>;
  minzoom?: number;
};

type LooseStyle = {
  layers: LooseLayer[];
};

const FILL: Record<string, string> = {
  park: "#e3e7dc",
  water: "#d0d7de",
  landuse_residential: "#e8e5de",
  landcover_wood: "#d9e2d4",
  landcover_ice_shelf: "#e6e7e2",
  landcover_glacier: "#e6e7e2",
  building: "#e5e1d8",
};

const LINE: Record<string, string> = {
  waterway: "#b7c3cc",
  highway_path: "#e3dfd6",
  highway_minor: "#fbfaf6",
  highway_major_casing: "#d2cdc4",
  highway_major_inner: "#ffffff",
  highway_major_subtle: "#f4f1ea",
  highway_motorway_casing: "#cbc6bc",
  highway_motorway_inner: "#ffffff",
  highway_motorway_subtle: "#f4f1ea",
  highway_motorway_bridge_casing: "#cbc6bc",
  highway_motorway_bridge_inner: "#ffffff",
  tunnel_motorway_casing: "#d2cdc4",
  tunnel_motorway_inner: "#f6f4ef",
  railway: "#d4d0c8",
  railway_dashline: "#c9c4bb",
  railway_transit: "#d4d0c8",
  railway_service: "#ddd9d1",
  boundary_2: "#c8c3ba",
  boundary_3: "#d4cfc6",
};

const HIDDEN = new Set([
  "highway-shield-non-us",
  "highway-shield-us-interstate",
  "road_shield_us",
  "airport",
  "highway-name-path",
  "label_other",
  "label_village",
  "label_state",
  "label_country_1",
  "label_country_2",
  "label_country_3",
]);

const LABEL_LAYERS = new Set([
  "label_city",
  "label_town",
  "water_name_point_label",
  "water_name_line_label",
  "waterway_line_label",
  "highway-name-major",
  "highway-name-minor",
]);

export function tuneMonochromeStyle(style: LooseStyle) {
  for (const layer of style.layers) {
    layer.paint = layer.paint ?? {};
    layer.layout = layer.layout ?? {};

    if (layer.id === "background") layer.paint["background-color"] = "#f1efe8";
    if (FILL[layer.id]) layer.paint["fill-color"] = FILL[layer.id];
    if (LINE[layer.id]) layer.paint["line-color"] = LINE[layer.id];
    if (layer.id === "building") layer.paint["fill-outline-color"] = "#d9d4ca";
    if (HIDDEN.has(layer.id)) layer.layout.visibility = "none";

    if (LABEL_LAYERS.has(layer.id)) {
      layer.paint["text-color"] = "#2a2926";
      layer.paint["text-halo-color"] = "#f1efe8";
      layer.paint["text-halo-width"] = 1.25;
      layer.layout["text-field"] = ["coalesce", ["get", "name:ru"], ["get", "name"]];
    }

    if (layer.id === "highway-name-minor") layer.minzoom = 14.4;
    if (layer.id === "highway-name-major") layer.minzoom = 13;
    if (layer.id === "label_city") {
      layer.layout["text-size"] = ["interpolate", ["linear"], ["zoom"], 9, 13, 12, 16, 15, 20];
    }
  }

  return style;
}

function zoomWidth(near: number, far: number): ExpressionSpecification {
  return ["interpolate", ["linear"], ["zoom"], 11.5, near, 15.5, far];
}

function beforeSymbols(map: MapLibreMap) {
  return map.getStyle().layers?.find((layer) => layer.type === "symbol")?.id;
}

export function addCityAndRoutes(map: MapLibreMap, data: ReturnType<typeof toRouteCollection>) {
  const before = beforeSymbols(map);

  try {
    if (!map.getLayer("building-3d")) {
      map.addLayer(
        {
          id: "building-3d",
          type: "fill-extrusion",
          source: "openmaptiles",
          "source-layer": "building",
          minzoom: 13.7,
          paint: {
            "fill-extrusion-color": "#e3dfd6",
            "fill-extrusion-opacity": 0.78,
            "fill-extrusion-vertical-gradient": true,
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13.7,
              0,
              15.6,
              ["*", ["coalesce", ["get", "render_height"], ["get", "height"], 10], 0.7],
            ],
            "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
          },
        },
        before,
      );
    }

    if (map.getLayer("building")) {
      map.setPaintProperty("building", "fill-opacity", [
        "interpolate",
        ["linear"],
        ["zoom"],
        13.6,
        1,
        15.2,
        0.08,
      ]);
    }
  } catch {
    // The flat map stays in place if extrusion data is missing.
  }

  map.addSource(SOURCE, {
    type: "geojson",
    data,
    promoteId: "id",
  });

  const none: FilterSpecification = ["==", ["get", "id"], ""];
  const eco: FilterSpecification = ["==", ["get", "category"], "eco"];
  const cap = { "line-cap": "round" as const, "line-join": "round" as const };

  map.addLayer(
    {
      id: "route-eco",
      type: "line",
      source: SOURCE,
      filter: eco,
      layout: cap,
      paint: {
        "line-color": "#b7dcc8",
        "line-width": zoomWidth(11, 20),
        "line-blur": 2.4,
        "line-opacity": [
          "case",
          ["boolean", ["feature-state", "dim"], false],
          0.08,
          ["boolean", ["feature-state", "hot"], false],
          0,
          0.7,
        ],
        "line-opacity-transition": { duration: 280, delay: 0 },
      },
    },
    before,
  );

  map.addLayer(
    {
      id: "route-casing",
      type: "line",
      source: SOURCE,
      layout: cap,
      paint: {
        "line-color": "#f7f5f0",
        "line-width": zoomWidth(4.2, 7.4),
        "line-opacity": [
          "case",
          ["boolean", ["feature-state", "hot"], false],
          0,
          ["boolean", ["feature-state", "dim"], false],
          0.25,
          0.96,
        ],
        "line-opacity-transition": { duration: 280, delay: 0 },
      },
    },
    before,
  );

  map.addLayer(
    {
      id: "route-line",
      type: "line",
      source: SOURCE,
      layout: cap,
      paint: {
        "line-color": ["get", "color"],
        "line-width": zoomWidth(2.4, 4.6),
        "line-opacity": [
          "case",
          ["boolean", ["feature-state", "hot"], false],
          0,
          ["boolean", ["feature-state", "dim"], false],
          0.18,
          ["==", ["get", "category"], "eco"],
          1,
          0.92,
        ],
        "line-opacity-transition": { duration: 280, delay: 0 },
        "line-width-transition": { duration: 280, delay: 0 },
      },
    },
    before,
  );

  map.addLayer(
    {
      id: "route-focus-glow",
      type: "line",
      source: SOURCE,
      filter: none,
      layout: cap,
      paint: {
        "line-color": ["get", "color"],
        "line-width": zoomWidth(12, 22),
        "line-blur": 2.4,
        "line-opacity": 0.38,
      },
    },
    before,
  );

  map.addLayer(
    {
      id: "route-focus-casing",
      type: "line",
      source: SOURCE,
      filter: none,
      layout: cap,
      paint: {
        "line-color": "#f7f5f0",
        "line-width": zoomWidth(5.4, 8.8),
        "line-opacity": 1,
      },
    },
    before,
  );

  map.addLayer(
    {
      id: "route-focus",
      type: "line",
      source: SOURCE,
      filter: none,
      layout: cap,
      paint: {
        "line-color": ["get", "color"],
        "line-width": zoomWidth(3.1, 6),
        "line-opacity": 1,
      },
    },
    before,
  );
}

export type SceneState = {
  category: CategoryId | "all";
  hoverId: string | null;
  selectedId: string | null;
};

export function syncScene(map: MapLibreMap, state: SceneState) {
  if (!map.getLayer("route-line")) return;

  const categoryFilter: FilterSpecification | null =
    state.category === "all" ? null : ["==", ["get", "category"], state.category];
  const ids = [...new Set([state.selectedId, state.hoverId].filter((id): id is string => Boolean(id)))];
  const focusFilter: FilterSpecification = ids.length
    ? (["any", ...ids.map((id) => ["==", ["get", "id"], id])] as FilterSpecification)
    : ["==", ["get", "id"], ""];
  const combine = (filter: FilterSpecification): FilterSpecification =>
    categoryFilter ? (["all", categoryFilter, filter] as FilterSpecification) : filter;

  map.setFilter("route-line", categoryFilter);
  map.setFilter("route-casing", categoryFilter);
  map.setFilter("route-eco", combine(["==", ["get", "category"], "eco"]));
  map.setFilter("route-focus", combine(focusFilter));
  map.setFilter("route-focus-casing", combine(focusFilter));
  map.setFilter("route-focus-glow", combine(focusFilter));

  for (const item of excursions) {
    const hot = item.id === state.hoverId || item.id === state.selectedId;
    map.setFeatureState(
      { source: SOURCE, id: item.id },
      { hot, dim: ids.length > 0 && !hot },
    );
  }
}

export function frameRoutes(
  map: MapLibreMap,
  list: Excursion[],
  options: { padding: FramePadding; duration: number; pitch: number; bearing: number; maxZoom?: number },
) {
  const bounds = new LngLatBounds();
  for (const item of list) {
    for (const stop of item.route) bounds.extend(stop.coordinates);
  }
  const camera = map.cameraForBounds(bounds, {
    padding: options.padding,
    maxZoom: options.maxZoom ?? 13.15,
    pitch: 0,
    bearing: 0,
  });
  if (!camera?.center || camera.zoom == null) return;
  const tilt = options.pitch > 20 ? 0.3 : 0;
  map.easeTo({
    center: camera.center,
    zoom: Math.max(12.05, camera.zoom - tilt),
    pitch: options.pitch,
    bearing: options.bearing,
    duration: options.duration,
  });
}
