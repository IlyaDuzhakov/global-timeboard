import { Link } from "react-router-dom";
import styles from "./FlagRegionSelect.module.css";

export function FlagRegionSelect({ lang = "ru", mode = "play" }) {
  const regions = [
    {
      key: "asia",
      icon: "/global-timeboard/img/flags/brunei.png",
      title: { ru: "Азия", en: "Asia" },
    },
    {
      key: "europe",
      icon: "/global-timeboard/img/flags/monaco.png",
      title: { ru: "Европа", en: "Europe" },
    },
    {
      key: "africa",
      icon: "/global-timeboard/img/flags/angola.png",
      title: { ru: "Африка", en: "Africa" },
    },
    {
      key: "north-america",
      icon: "/global-timeboard/img/flags/antigua-and-barbuda.png",
      title: { ru: "Северная Америка", en: "North America" },
    },
    {
      key: "south-america",
      icon: "/global-timeboard/img/flags/ecuador.png",
      title: { ru: "Южная Америка", en: "South America" },
    },
    {
      key: "oceania",
      icon: "/global-timeboard/img/flags/papua-new-guinea.png",
      title: { ru: "Океания", en: "Oceania" },
    },
    {
      key: "world",
      icon: "/global-timeboard/img/globus.svg",
      title: { ru: "Весь мир", en: "World" },
    },
  ];

  return (
    <main
      className={styles.regionPage}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
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
              to={
                mode === "learn"
                  ? `/quiz/flags/learn/${region.key}`
                  : `/quiz/flags/play/${region.key}`
              }
              className={`${styles.regionCard} ${
                region.key === "world" ? styles.worldCard : ""
              }`}
            >
              <img
                src={region.icon}
                alt=""
                className={`${styles.regionIcon} ${
                  region.key === "world" ? styles.worldIcon : ""
                }`}
              />

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
