import { Button } from "@/components/button/button";
import { Card } from "@/components/card/card";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Header } from "@/components/header/header";
import styles from "./page.module.scss";

const assets = {
  composition: "/assets/Объёмная композиция.webp",
  star: "/assets/Объёмная звезда.webp",
  excursion: "/assets/Фото экскурсии.webp",
  routes: "/assets/Ваши маршруты.webp",
};

const marquee = ["МЕНЬШЕ РУТИНЫ", "БОЛЬШЕ МАРШРУТОВ", "ИЗ ПОСТА В БИЛЕТ"];

const pageBits = [
  "Маршрут с вашим характером",
  "Понятный следующий шаг для гостя",
  "Одна ссылка для вашего Telegram",
];

const benefits = [
  {
    title: "Не начинайте с чистого листа",
    text: "У вас уже есть пост. TourTap превращает знакомый формат в страницу, на которой можно забронировать экскурсию.",
  },
  {
    title: "Не собирайте сайт по кусочкам",
    text: "Описание, оферта и оплата оказываются рядом. Вместо отдельной сборки страницы — пересылка сообщения.",
  },
  {
    title: "Оставайтесь в своём ритме",
    text: "Рассказывайте о городе в Telegram, делитесь ссылкой на экскурсию и уделяйте больше внимания самой прогулке.",
  },
];

const paymentPoints = [
  {
    title: "Оферта на странице",
    text: "Условия экскурсии рядом с описанием — до бронирования и оплаты.",
    icon: "/icons/file-text.svg",
  },
  {
    title: "Оплата по СБП",
    text: "Гость переходит к онлайн-оплате со страницы экскурсии.",
    icon: "/icons/scan-line.svg",
  },
  {
    title: "Чек НПД",
    text: "Чек для экскурсии самозанятого — часть сценария TourTap.",
    icon: "/icons/receipt-text.svg",
  },
];

const faqs = [
  {
    question: "Что нужно переслать боту?",
    answer:
      "Перешлите TourTap пост из Telegram с описанием вашей экскурсии. Бот соберёт готовую страницу с офертой, оплатой по СБП и чеком НПД за 20 секунд.",
  },
  {
    question: "Нужен ли отдельный сайт?",
    answer:
      "Нет. Готовая страница открывается по ссылке TourTap. Гость читает описание и условия и бронирует экскурсию без отдельного сайта.",
  },
  {
    question: "Что увидит гость по ссылке?",
    answer:
      "Фото, описание, время и условия экскурсии. На этой же странице можно выбрать количество гостей и перейти к оплате.",
  },
  {
    question: "Как устроена онлайн-оплата?",
    answer:
      "Гость оплачивает экскурсию на странице по СБП. Отдельная переписка, чтобы договориться о переводе, не нужна.",
  },
  {
    question: "Для кого предназначен чек НПД?",
    answer:
      "Чек НПД входит в сценарий для экскурсии самозанятого. Перед публикацией проверьте описание, условия и свои данные.",
  },
];

const footerLinks = [
  { href: "#how", label: "Как это работает" },
  { href: "#guides", label: "Для гидов" },
  { href: "#faq", label: "Вопросы" },
  { href: "#start", label: "Открыть бота" },
];

function StepMark({ down = false }: { down?: boolean }) {
  return (
    <svg className={styles.stepMark} viewBox="0 0 12 12" aria-hidden="true">
      <path
        d={down ? "M6 2.2v6.2M3.4 6.1 6 8.8 8.6 6.1" : "M2.2 6h6.2M6.1 3.4 8.8 6 6.1 8.6"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <svg className={styles.arrowIcon} viewBox="0 0 23 23" aria-hidden="true">
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

function OutlinePlane() {
  return (
    <img className={styles.plane} src="/icons/send.svg" alt="" width={24} height={24} />
  );
}

export default function Home() {
  return (
    <div className={styles.shell}>
      <div className={styles.topbar}>
        <div className={styles.page}>
          <Header actionHref="#start" />
        </div>
      </div>
      <main className={styles.content}>
      <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.cover}>
          <p className={styles.kicker}>
            <span className={styles.marker} />
            Для гидов, которые ведут за собой
          </p>
          <h1 className={styles.heroTitle}>
            ВАШ ПОСТ —
            <br />
            УЖЕ СТРАНИЦА
            <br />
            ЭКСКУРСИИ.
          </h1>
          <div className={styles.coverCopy}>
            <p className={styles.lead}>
              Перешлите пост из Telegram боту. TourTap соберет страницу с офертой,
              оплатой по СБП и чеком НПД за 20 секунд.
            </p>
            <div className={styles.heroAction}>
              <Button href="#start">
                Создать экскурсию
                <Arrow />
              </Button>
            </div>
            <p className={styles.badgeLine}>
              <span>БЕЗ КОДА</span>
              Ваш контент. Готовый маршрут к брони.
            </p>
          </div>
          <img
            className={styles.composition}
            src={assets.composition}
            alt="Телефон с постом TourTap, билет и пружина"
            width={604}
            height={609}
          />
          <div className={styles.coverFoot}>
            <p>
              ПОСТ
              <StepMark />
              СТРАНИЦА
              <StepMark />
              БРОНИРОВАНИЕ
            </p>
            <p>
              ЛИСТАЙТЕ ДАЛЬШЕ
              <StepMark down />
            </p>
          </div>
        </div>
      </section>
      </div>

      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className={styles.marqueeGroup}
              aria-hidden={copy === 1 || undefined}
            >
              {marquee.flatMap((item) => [
                <span key={item}>{item}</span>,
                <img
                  key={`${item}-mark`}
                  className={styles.asterisk}
                  src="/icons/asterisk.svg"
                  alt=""
                  width={24}
                  height={24}
                />,
              ])}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.page}>
      <section className={styles.section} id="how">
        <p className={styles.kicker}>
          <span className={styles.marker} />
          01 / Как это работает
        </p>
        <h2 className={styles.h1}>
          МЕНЬШЕ ДЕЙСТВИЙ.
          <br />
          БЛИЖЕ К ГОСТЯМ.
        </h2>
        <div className={styles.bento}>
          <div className={styles.stack}>
            <Card variant="subtle" padding="md" className={styles.postCard}>
              <div className={styles.cardHead}>
                <p className={styles.step}>01 / ПОСТ</p>
                <OutlinePlane />
              </div>
              <h3 className={styles.h3}>
                Хороший пост —
                <br />
                уже начало.
              </h3>
              <p className={styles.copy}>
                Фото, маршрут, детали — перешлите свой пост боту TourTap в Telegram.
              </p>
              <article className={styles.forwardCard}>
                <p className={styles.whisper}>Переслать сообщение</p>
                <div className={styles.botRow}>
                  <span className={styles.avatar}>
                    <Arrow />
                  </span>
                  <span>
                    <strong>TourTap</strong>
                    <small>бот для ваших экскурсий</small>
                  </span>
                </div>
                <Button variant="forward" href="#start">
                  Переслать пост
                  <Arrow />
                </Button>
              </article>
            </Card>
          </div>
          <div className={styles.stack}>
            <Card variant="accent" padding="md" className={styles.readyCard}>
              <div className={styles.readyCopy}>
                <p className={styles.step}>02 / СТРАНИЦА</p>
                <h3 className={styles.h3}>
                  20 секунд.
                  <br />
                  Всё собирается.
                </h3>
                <p className={styles.copy}>
                  TourTap превращает пост в страницу экскурсии с бронированием.
                </p>
              </div>
              <aside className={styles.ready}>
                <p className={styles.readyLabel}>СТРАНИЦА ГОТОВА</p>
                <ul>
                  {["Описание и фото", "Оферта", "Онлайн-оплата"].map((item) => (
                    <li key={item}>
                      <img src="/icons/circle-check.svg" alt="" width={17} height={17} />
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </Card>
            <Card variant="mint" padding="md" className={styles.bookingCard}>
              <div>
                <p className={styles.step}>03 / БРОНИРОВАНИЕ</p>
                <h3 className={styles.h3}>
                  Делитесь ссылкой.
                  <br />
                  Собирайте группу.
                </h3>
              </div>
              <div className={styles.notice}>
                <img
                  className={styles.noticeIcon}
                  src="/icons/ticket-check.svg"
                  alt=""
                  width={28}
                  height={28}
                />
                <span>
                  <strong>Новое бронирование</strong>
                  <small>2 гостя · Петербург с высоты крыш</small>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      </div>

      <section className={styles.result} id="result">
      <div className={styles.page}>
      <div className={styles.section}>
        <div className={styles.split}>
          <div className={styles.explain}>
            <p className={styles.kicker}>
              <span className={styles.marker} />
              02 / Вот что увидит гость
            </p>
            <h2 className={styles.h2}>
              НЕ ПРОСТО
              <br />
              ССЫЛКА.
              <br />
              ПРИГЛАШЕНИЕ
              <br />
              В ГОРОД.
            </h2>
            <p className={styles.muted}>
              Фото, описание, условия и бронирование — на одной странице. Гостю проще
              выбрать прогулку. Вам — поделиться ею.
            </p>
            <ul className={styles.bits}>
              {pageBits.map((bit) => (
                <li key={bit}>
                  <Arrow />
                  {bit}
                </li>
              ))}
            </ul>
            <p className={styles.note}>Иллюстративный пример экскурсии.</p>
          </div>
          <figure className={styles.showcase}>
            <Card variant="elevated" padding="none" className={styles.browser}>
              <div className={styles.chrome}>
                <span className={styles.dots} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.url}>tourtap / ваша-экскурсия</span>
                <img className={styles.share} src="/icons/lock.svg" alt="" width={12} height={12} />
              </div>
              <div className={styles.photo}>
                <img
                  src={assets.excursion}
                  alt="Город с реки на закате"
                  width={720}
                  height={255}
                />
                <span className={styles.photoTag}>ГОРОД С ДРУГОЙ СТОРОНЫ</span>
              </div>
              <div className={styles.excursionBody}>
                <h3>Янтарный закат янтарного края</h3>
                <p className={styles.meta}>
                  <span>2 часа</span>
                  <span>Пешком</span>
                  <span>До 6 гостей</span>
                </p>
                <p className={styles.muted}>
                  Увидим знакомый город с неожиданного ракурса: рыбная деревня, богатая
                  история и янтарный закат, который заставит влюбиться в этот город.
                </p>
                <div className={styles.select}>
                  <strong>Суббота · 18:00</strong>
                  <small>Выберите количество гостей</small>
                  <span className={styles.chevron} aria-hidden="true" />
                </div>
                <Button className={styles.bookAction} href="#start">
                  Забронировать
                  <Arrow />
                </Button>
                <p className={styles.fine}>Условия экскурсии и оферта — на странице</p>
              </div>
            </Card>
            <figcaption className={styles.caption}>
              ВАШ ПОСТ ВНУТРИ. TOURTAP — ЗА КУЛИСАМИ.
            </figcaption>
          </figure>
        </div>
      </div>
      </div>
      </section>

      <div className={styles.page}>
      <section className={styles.section} id="guides">
        <p className={styles.kicker}>
          <span className={styles.marker} />
          03 / Вы занимаетесь главным
        </p>
        <div className={styles.editorial}>
          <div className={styles.manifesto}>
            <h2 className={styles.h1}>
              ВЫ — ГИД.
              <br />
              НЕ АДМИН.
            </h2>
            <img
              className={styles.star}
              src={assets.star}
              alt="Объёмная оранжевая звезда"
              width={370}
              height={260}
            />
            <p className={styles.manifestoLine}>
              Больше внимания маршруту.
              <br />
              Меньше — тому, что вокруг него.
            </p>
          </div>
          <ol className={styles.benefitList}>
            {benefits.map((item, index) => (
              <li key={item.title}>
                <div className={styles.benefitTitle}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} id="payment">
        <p className={styles.kicker}>
          <span className={styles.marker} />
          04 / От брони до чека
        </p>
        <div className={styles.payGrid}>
          <Card variant="accent" padding="lg" className={styles.payCard}>
            <h2 className={styles.h1}>
              ОПЛАТА.
              <br />
              НЕ ПЕРЕПИСКА.
            </h2>
            <p>
              Оферта, онлайн-оплата и чек —
              <br />
              в одном сценарии бронирования.
            </p>
            <article className={styles.receipt}>
              <header>
                ЧЕК НПД
                <img src="/icons/check-check.svg" alt="" width={24} height={24} />
              </header>
              <span className={styles.rule} />
              <p>
                Экскурсия
                <br />
                Янтарный закат янтарного края
              </p>
              <span className={styles.example}>ПРИМЕР ДОКУМЕНТА</span>
            </article>
          </Card>
          <Card variant="subtle" padding="lg" className={styles.guestCard}>
            <h2 className={styles.h3}>
              ПОНЯТНО ГОСТЮ.
              <br />
              УДОБНО ВАМ.
            </h2>
            <ul>
              {paymentPoints.map((point) => (
                <li key={point.title}>
                  <span className={styles.pointIcon}>
                    <img src={point.icon} alt="" width={21} height={21} />
                  </span>
                  <span>
                    <strong>{point.title}</strong>
                    <span>{point.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className={styles.disclaimer}>
              Перед публикацией проверьте описание, условия и свои данные. Сценарий с чеком
              НПД предназначен для самозанятых.
            </p>
          </Card>
        </div>
      </section>

      </div>

      <section className={styles.routes} id="routes">
        <img
          className={styles.routesPhoto}
          src={assets.routes}
          alt=""
          width={1440}
          height={610}
        />
        <div className={styles.routesShade} aria-hidden="true" />
        <div className={styles.routesTop}>
          <p>05 / ВАШИ МАРШРУТЫ</p>
          <img
            className={styles.routesArrow}
            src="/icons/arrow-up-right-paper.svg"
            alt=""
            width={24}
            height={24}
          />
        </div>
        <div className={styles.routesCopy}>
          <h2>
            ВАШ ГОРОД.
            <br />
            ВАШ ГОЛОС.
          </h2>
          <p>
            TourTap берёт на себя страницу. Содержание и впечатления — за вами.
          </p>
          <ul>
            <li>Городские прогулки</li>
            <li>Авторские маршруты</li>
            <li>Камерные группы</li>
          </ul>
        </div>
      </section>

      <div className={styles.page}>
      <section className={styles.section} id="faq">
        <div className={styles.faqGrid}>
          <div className={styles.faqIntro}>
            <p className={styles.kicker}>
              <span className={styles.marker} />
              06 / Вопросы и ответы
            </p>
            <h2 className={styles.h1}>
              ЕСТЬ
              <br />
              ВОПРОСЫ?
            </h2>
            <p className={styles.muted}>
              Начните с поста, который уже рассказывает о вашей экскурсии.
            </p>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      </div>

      <section className={styles.cta} id="start">
      <div className={styles.page}>
        <p className={styles.kicker}>07 / ВАШ СЛЕДУЮЩИЙ ШАГ</p>
        <div className={styles.ctaBody}>
          <h2>
            СЛЕДУЮЩАЯ
            <br />
            ОСТАНОВКА —
            <br />
            ВАША ЭКСКУРСИЯ.
          </h2>
          <div className={styles.ctaRow}>
            <Button variant="inverse" href="#start">
              Создать экскурсию
              <Arrow />
            </Button>
            <p>
              У вас уже есть всё для старта.
              <br />
              Осталось переслать пост.
            </p>
          </div>
        </div>
        <img
          className={styles.ctaStar}
          src={assets.star}
          alt=""
          width={370}
          height={260}
        />
      </div>
      </section>

      <div className={styles.page}>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <p>
            Из вашего поста —
            <br />
            в новое приключение.
          </p>
          <nav aria-label="Подвал">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.wordmark}>
          <p>TourTap</p>
          <a href="#start" aria-label="Создать экскурсию">
            <Arrow />
          </a>
        </div>
        <div className={styles.legal}>
          <p>© 2026 TourTap</p>
          <p>
            <a href="#privacy">Политика конфиденциальности</a>
            <a href="#terms">Условия использования</a>
          </p>
        </div>
      </footer>
        </div>
      </main>
    </div>
  );
}
