import { Link } from "react-router-dom";
import styles from "./MoneyPage.module.css";

export function MoneyPage({ lang }) {
  const moneyModes = [
    {
      iconSrc: "/global-timeboard/icons/word-money.svg",
      title: {
        ru: "Валюты мира",
        en: "World Currencies",
      },
      text: {
        ru: "Проверь, знаешь ли ты валюты стран",
        en: "Test your knowledge of country currencies",
      },
      path: "/money/currencies",
    },
    {
      iconSrc: "/global-timeboard/icons/money-marathon.svg",
      title: {
        ru: "Мир денег",
        en: "Money Quiz",
      },
      text: {
        ru: "История, факты и рекорды денег",
        en: "Money history, facts and records",
      },
      path: "/money/marathon",
    },
  ];

  return (
    <main
      className={styles.moneyPage}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <h1 className={styles.title}>
        {lang === "ru" ? "Деньги и валюты" : "Money & Currencies"}
      </h1>

      <p className={styles.subtitle}>
        {lang === "ru"
          ? "Выбери режим: изучение валют стран или большой квиз о мире денег."
          : "Choose a mode: country currencies or a big quiz about money."}
      </p>

      <div className={styles.cards}>
        {moneyModes.map((mode) => (
          <Link to={mode.path} className={styles.card} key={mode.path}>
            <img
              className={styles.icon}
              src={mode.iconSrc}
              alt={mode.title[lang]}
            />

            <h2>{mode.title[lang]}</h2>
            <p>{mode.text[lang]}</p>
          </Link>
        ))}
      </div>
      <Link to="/quiz" className={styles.backButton}>
        {lang === "ru" ? "← Назад" : "← Back"}
      </Link>
    </main>
  );
}
