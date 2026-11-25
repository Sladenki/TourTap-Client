export const CATEGORIES = [
  { id: "history", label: "История", color: "#B5523A" },
  { id: "architecture", label: "Архитектура", color: "#3E6C8A" },
  { id: "food", label: "Еда", color: "#C9843A" },
  { id: "walks", label: "Прогулки", color: "#7464A4" },
  { id: "mystic", label: "Мистика", color: "#9A3F5C" },
  { id: "military", label: "Военная история", color: "#4E5A42" },
  { id: "eco", label: "Экология", color: "#3B8F60" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export type RouteStop = {
  name: string;
  coordinates: [number, number];
  kind: "start" | "stop" | "end";
};

export type Excursion = {
  id: string;
  title: string;
  category: CategoryId;
  description: string;
  color: string;
  duration: string;
  price: number;
  rating: number;
  availablePlaces: number;
  date: string;
  startTime: string;
  meetingPoint: string;
  coordinates: [number, number];
  route: RouteStop[];
  icon: CategoryId;
};

type ExcursionInput = {
  id: string;
  title: string;
  category: CategoryId;
  description: string;
  duration: string;
  price: number;
  rating: number;
  availablePlaces: number;
  date: string;
  startTime: string;
  points: Array<[string, number, number]>;
};

function buildRoute(points: ExcursionInput["points"]): RouteStop[] {
  return points.map(([name, lng, lat], index) => ({
    name,
    coordinates: [lng, lat],
    kind: index === 0 ? "start" : index === points.length - 1 ? "end" : "stop",
  }));
}

function excursion(input: ExcursionInput): Excursion {
  const category = CATEGORIES.find((item) => item.id === input.category)!;
  const route = buildRoute(input.points);
  return {
    id: input.id,
    title: input.title,
    category: input.category,
    description: input.description,
    color: category.color,
    duration: input.duration,
    price: input.price,
    rating: input.rating,
    availablePlaces: input.availablePlaces,
    date: input.date,
    startTime: input.startTime,
    meetingPoint: route[0].name,
    coordinates: route[0].coordinates,
    route,
    icon: input.category,
  };
}

export const excursions: Excursion[] = [
  excursion({
    id: "royal",
    title: "Королевский Кёнигсберг",
    category: "history",
    description:
      "Собор, Рыбная деревня, Медовый мост и корабли музея. Короткая ось старого города вдоль Преголи.",
    duration: "2 ч 30 мин",
    price: 1500,
    rating: 4.9,
    availablePlaces: 8,
    date: "29 ноября",
    startTime: "11:00",
    points: [
      ["Кафедральный собор", 20.51222, 54.70639],
      ["Медовый мост", 20.51083, 54.70472],
      ["Рыбная деревня", 20.5078, 54.7031],
      ["Набережная Петра Великого", 20.5041, 54.70455],
      ["Музей Мирового океана", 20.5006, 54.7065],
    ],
  }),
  excursion({
    id: "east-gates",
    title: "Восточные ворота",
    category: "history",
    description:
      "Закхаймские, Королевские и Росгартенские ворота. Кирпич, гербы и дорога, которой город встречал гостей.",
    duration: "2 ч",
    price: 1300,
    rating: 4.8,
    availablePlaces: 10,
    date: "30 ноября",
    startTime: "12:00",
    points: [
      ["Закхаймские ворота", 20.5418, 54.7058],
      ["Литовский вал", 20.5384, 54.7097],
      ["Королевские ворота", 20.5356, 54.7135],
      ["Старая стена", 20.5306, 54.7165],
      ["Росгартенские ворота", 20.5267, 54.719],
      ["Башня Врангеля", 20.5213, 54.7187],
    ],
  }),
  excursion({
    id: "lost-castle",
    title: "Замок, которого нет",
    category: "history",
    description:
      "Площадка орденского замка, остров Канта и блиндаж коменданта. О том, что снесли, и о том, что осталось в земле.",
    duration: "2 ч 15 мин",
    price: 1400,
    rating: 4.7,
    availablePlaces: 12,
    date: "5 декабря",
    startTime: "13:00",
    points: [
      ["Дом Советов", 20.5126, 54.7107],
      ["Северный берег острова", 20.5112, 54.70815],
      ["Кафедральный собор", 20.51222, 54.70639],
      ["Улица Канта", 20.5097, 54.70855],
      ["Блиндаж Ляша", 20.5088, 54.7104],
    ],
  }),
  excursion({
    id: "amalienau",
    title: "Виллы Амалиенау",
    category: "architecture",
    description:
      "Луизенваль, Кутузова, Тельмана. Особняки начала века и тихие улицы, где Кёнигсберг похож на курорт.",
    duration: "2 ч",
    price: 1600,
    rating: 4.9,
    availablePlaces: 8,
    date: "1 декабря",
    startTime: "11:30",
    points: [
      ["Парк Луизенваль", 20.4735, 54.7162],
      ["Улица Кутузова", 20.4762, 54.7224],
      ["Улица Тельмана", 20.4816, 54.7212],
      ["Проспект Мира", 20.4854, 54.7196],
      ["Калининградский зоопарк", 20.4878, 54.7204],
      ["Музей изобразительных искусств", 20.4922, 54.7168],
    ],
  }),
  excursion({
    id: "towers",
    title: "Башни Дона и Врангеля",
    category: "architecture",
    description: "Две башни у старой стены, янтарная коллекция и берег Верхнего пруда.",
    duration: "1 ч 45 мин",
    price: 1700,
    rating: 4.8,
    availablePlaces: 10,
    date: "3 декабря",
    startTime: "15:00",
    points: [
      ["Башня Врангеля", 20.5213, 54.7187],
      ["Городская стена", 20.5225, 54.7207],
      ["Башня Дона", 20.5233, 54.7224],
      ["Музей янтаря", 20.5224, 54.7229],
      ["Берег Верхнего пруда", 20.5176, 54.7234],
    ],
  }),
  excursion({
    id: "leninsky",
    title: "Ось Ленинского",
    category: "architecture",
    description:
      "От площади Победы к Королевским воротам: как новый проспект лёг поверх старого города.",
    duration: "2 ч 20 мин",
    price: 1400,
    rating: 4.6,
    availablePlaces: 14,
    date: "6 декабря",
    startTime: "12:30",
    points: [
      ["Площадь Победы", 20.5012, 54.7198],
      ["Драматический театр", 20.5004, 54.7184],
      ["Храм Христа Спасителя", 20.5083, 54.717],
      ["Блиндаж Ляша", 20.5088, 54.7104],
      ["Дом Советов", 20.5126, 54.7107],
      ["Ленинский проспект", 20.5242, 54.7121],
      ["Королевские ворота", 20.5356, 54.7135],
    ],
  }),
  excursion({
    id: "pregolya-taste",
    title: "Вкус Преголи",
    category: "food",
    description: "Рынок, набережная и кухни Рыбной деревни. Рыба, клопсы и кофе у моста.",
    duration: "2 ч 30 мин",
    price: 2200,
    rating: 4.8,
    availablePlaces: 8,
    date: "29 ноября",
    startTime: "13:00",
    points: [
      ["Центральный рынок", 20.5045, 54.7092],
      ["Спуск к реке", 20.5036, 54.7069],
      ["Набережная у музея", 20.5014, 54.7056],
      ["Рыбная деревня", 20.5078, 54.7031],
      ["Медовый мост", 20.51083, 54.70472],
      ["Площадь Кафедрального собора", 20.51222, 54.70639],
    ],
  }),
  excursion({
    id: "amalienau-yards",
    title: "Дворы Амалиенау",
    category: "food",
    description: "Короткий кофейный круг по дворам и витринам района вилл.",
    duration: "1 ч 40 мин",
    price: 1800,
    rating: 4.7,
    availablePlaces: 6,
    date: "2 декабря",
    startTime: "16:00",
    points: [
      ["Проспект Мира", 20.4808, 54.7195],
      ["Двор на Кутузова", 20.4754, 54.7217],
      ["Улица Огарёва", 20.4798, 54.7182],
      ["Кафе у зоопарка", 20.4886, 54.7184],
      ["Музей изобразительных искусств", 20.4922, 54.7168],
    ],
  }),
  excursion({
    id: "kneiphof",
    title: "Петля Кнайпхофа",
    category: "walks",
    description: "Остров, мосты и набережная без спешки. Маршрут на час между службами в соборе.",
    duration: "1 ч 30 мин",
    price: 900,
    rating: 4.9,
    availablePlaces: 16,
    date: "28 ноября",
    startTime: "10:30",
    points: [
      ["Рыбная деревня", 20.5078, 54.7031],
      ["Медовый мост", 20.51083, 54.70472],
      ["Кафедральный собор", 20.51222, 54.70639],
      ["Восточная оконечность острова", 20.5156, 54.7057],
      ["Северный рукав Преголи", 20.5104, 54.7076],
      ["Музей Мирового океана", 20.5006, 54.7065],
    ],
  }),
  excursion({
    id: "two-ponds",
    title: "Два пруда",
    category: "walks",
    description: "Нижний и Верхний пруды, аллеи и вода в самом центре города.",
    duration: "1 ч 50 мин",
    price: 1000,
    rating: 4.8,
    availablePlaces: 14,
    date: "4 декабря",
    startTime: "11:00",
    points: [
      ["Южный берег Нижнего пруда", 20.5126, 54.7155],
      ["Нижний пруд", 20.5168, 54.7176],
      ["Перешеек между прудами", 20.5162, 54.7202],
      ["Верхний пруд", 20.5192, 54.7241],
      ["Западный берег", 20.5146, 54.7233],
    ],
  }),
  excursion({
    id: "island-legends",
    title: "Легенды острова",
    category: "mystic",
    description: "Кант, Медовый мост и истории, которые на острове рассказывают вполголоса.",
    duration: "2 ч",
    price: 1500,
    rating: 4.8,
    availablePlaces: 10,
    date: "30 ноября",
    startTime: "19:00",
    points: [
      ["Медовый мост", 20.51083, 54.70472],
      ["Рыбная деревня", 20.5072, 54.70335],
      ["Могила Канта", 20.5117, 54.70655],
      ["Кафедральный собор", 20.51222, 54.70639],
      ["Площадка замка", 20.5126, 54.7107],
      ["Блиндаж Ляша", 20.5088, 54.7104],
    ],
  }),
  excursion({
    id: "midnight-gates",
    title: "Полуночные ворота",
    category: "mystic",
    description: "Фридландские и Бранденбургские ворота после заката. Коты, кирпич и городские байки.",
    duration: "1 ч 45 мин",
    price: 1300,
    rating: 4.6,
    availablePlaces: 12,
    date: "6 декабря",
    startTime: "18:30",
    points: [
      ["Фридландские ворота", 20.5094, 54.697],
      ["Южный вокзал", 20.4988, 54.6945],
      ["Бранденбургские ворота", 20.4946, 54.6974],
      ["Улица Багратиона", 20.4912, 54.7046],
      ["Аусфальские ворота", 20.4886, 54.712],
    ],
  }),
  excursion({
    id: "assault",
    title: "Блиндаж и штурм",
    category: "military",
    description:
      "Апрель 1945-го: вокзал, площадь, блиндаж последнего коменданта и ворота на востоке.",
    duration: "2 ч 40 мин",
    price: 1600,
    rating: 4.7,
    availablePlaces: 12,
    date: "5 декабря",
    startTime: "12:00",
    points: [
      ["Северный вокзал", 20.5005, 54.721],
      ["Площадь Победы", 20.5012, 54.7198],
      ["Храм Христа Спасителя", 20.5083, 54.717],
      ["Блиндаж Ляша", 20.5088, 54.7104],
      ["Дом Советов", 20.5126, 54.7107],
      ["Ленинский проспект", 20.5248, 54.7122],
      ["Королевские ворота", 20.5356, 54.7135],
    ],
  }),
  excursion({
    id: "south-ring",
    title: "Южный обвод",
    category: "military",
    description: "Аусфальские, Бранденбургские и Фридландские ворота. Укрепления южной стороны города.",
    duration: "2 ч",
    price: 1400,
    rating: 4.5,
    availablePlaces: 10,
    date: "7 декабря",
    startTime: "11:30",
    points: [
      ["Аусфальские ворота", 20.4886, 54.712],
      ["Южный вал", 20.4904, 54.7049],
      ["Бранденбургские ворота", 20.4946, 54.6974],
      ["Южный вокзал", 20.4988, 54.6945],
      ["Фридландские ворота", 20.5094, 54.697],
    ],
  }),
  excursion({
    id: "green",
    title: "Зелёный Калининград",
    category: "eco",
    description:
      "Ботанический сад, два пруда, парк, остров Канта и набережная. Город со стороны листвы и воды.",
    duration: "3 ч",
    price: 1200,
    rating: 4.9,
    availablePlaces: 12,
    date: "29 ноября",
    startTime: "10:00",
    points: [
      ["Ботанический сад", 20.5088, 54.7358],
      ["Дорога к Верхнему пруду", 20.5124, 54.7294],
      ["Верхний пруд", 20.5186, 54.7244],
      ["Аллея между прудами", 20.5164, 54.7206],
      ["Нижний пруд", 20.515, 54.7172],
      ["Центральный парк", 20.5082, 54.7146],
      ["Зелёный клин к центру", 20.5074, 54.711],
      ["Остров Канта", 20.51222, 54.70639],
      ["Набережная Преголи", 20.5062, 54.7037],
    ],
  }),
];

export function categoryById(id: CategoryId) {
  return CATEGORIES.find((item) => item.id === id)!;
}

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
}

export function formatPlaces(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} место`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} места`;
  return `${count} мест`;
}

export function formatRating(rating: number) {
  return rating.toFixed(1).replace(".", ",");
}

export function toRouteCollection(list: Excursion[]) {
  return {
    type: "FeatureCollection" as const,
    features: list.map((item) => ({
      type: "Feature" as const,
      id: item.id,
      properties: {
        id: item.id,
        category: item.category,
        color: item.color,
        title: item.title,
      },
      geometry: {
        type: "LineString" as const,
        coordinates: item.route.map((stop) => stop.coordinates),
      },
    })),
  };
}
