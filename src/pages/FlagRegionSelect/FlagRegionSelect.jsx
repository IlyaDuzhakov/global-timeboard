import { Link } from "react-router-dom";
import styles from "./FlagRegionSelect.module.css";

export function FlagRegionSelect({ lang = "ru" }) {
  const regions = [
    {
      key: "asia",
      icon: "/global-timeboard/icons/quiz-flags.png",
      title: { ru: "Азия", en: "Asia" },
    },
    {
      key: "europe",
      icon: "/global-timeboard/icons/quiz-flags.png",
      title: { ru: "Европа", en: "Europe" },
    },
    {
      key: "africa",
      icon: "/global-timeboard/icons/quiz-flags.png",
      title: { ru: "Африка", en: "Africa" },
    },
    {
      key: "north-america",
      icon: "/global-timeboard/icons/quiz-flags.png",
      title: { ru: "Северная Америка", en: "North America" },
    },
    {
      key: "south-america",
      icon: "/global-timeboard/icons/quiz-flags.png",
      title: { ru: "Южная Америка", en: "South America" },
    },
    {
      key: "oceania",
      icon: "/global-timeboard/icons/quiz-flags.png",
      title: { ru: "Океания", en: "Oceania" },
    },
    {
      key: "world",
      icon: "/global-timeboard/icons/quiz-flags.png",
      title: { ru: "Весь мир", en: "World" },
    },
  ];

  return (
    <main className={styles.regionPage}>
      <section className={styles.panel}>
        <h1 className={styles.title}>
          {lang === "ru" ? "Выберите регион" : "Choose a region"}
        </h1>

        <p className={styles.subtitle}>
          {lang === "ru"
            ? "Проверьте знания флагов по континентам или сыграйте во весь мир."
            : "Test flags by continent or play the whole world mode."}
        </p>

        <div className={styles.regionGrid}>
          {regions.map((region) => (
            <Link
              key={region.key}
              to={`/quiz/flags/play/${region.key}`}
              className={styles.regionCard}
            >
              <img className={styles.regionIcon} src={region.icon} alt="" />
              <span className={styles.regionTitle}>{region.title[lang]}</span>
            </Link>
          ))}
        </div>

        <Link to="/quiz/flags" className={styles.backButton}>
          {lang === "ru" ? "← Назад к режимам" : "← Back to modes"}
        </Link>
      </section>
    </main>
  );
}