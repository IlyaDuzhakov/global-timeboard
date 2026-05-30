import styles from "./QuizRoom.module.css";
import { Link } from "react-router-dom";

export function QuizRoom({ lang }) {
  const quizModes = [
    {
      iconSrc: "/global-timeboard/icons/quiz-flags.png",
      title: { ru: "Флаги", en: "Flags" },
      text: {
        ru: "Угадай страну по флагу",
        en: "Guess the country by its flag",
      },
      path: "/quiz/flags",
    },
    {
      iconSrc: "/global-timeboard/icons/quiz-landmarks.png",
      title: { ru: "Достопримечательности", en: "Landmarks" },
      text: { ru: "Узнай объект по фото", en: "Guess the landmark by photo" },
    },
    {
      iconSrc: "/global-timeboard/icons/quiz-capitals.png",
      title: { ru: "Столицы", en: "Capitals" },
      text: { ru: "Проверь столицы мира", en: "Test world capitals" },
    },
    {
      iconSrc: "/global-timeboard/icons/quiz-currencies.png",
      title: { ru: "Валюты", en: "Currencies" },
      text: {
        ru: "Угадай валюту по изображению",
        en: "Guess the currency by image",
      },
    },
    {
      iconSrc: "/global-timeboard/icons/quiz-junior.png",
      title: { ru: "Junior", en: "Junior" },
      text: { ru: "40 лёгких вопросов", en: "40 easy questions" },
    },
    {
      iconSrc: "/global-timeboard/icons/quiz-middle.png",
      title: { ru: "Middle", en: "Middle" },
      text: { ru: "40 вопросов посложнее", en: "40 medium questions" },
    },
    {
      iconSrc: "/global-timeboard/icons/quiz-expert.png",
      title: { ru: "Expert", en: "Expert" },
      text: { ru: "40 сложных вопросов", en: "40 hard questions" },
    },
    {
      iconSrc: "/global-timeboard/icons/quiz-marathon.png",
      title: { ru: "Марафон 100", en: "Marathon 100" },
      text: { ru: "Большой мировой челлендж", en: "Big world challenge" },
    },
  ];

  return (
    <main
      className={styles.quizRoom}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.quizPanel}>
        <img
          className={styles.quizMainIcon}
          src="/global-timeboard/icons/quiz-room.svg"
          alt="Quiz Room"
        />

        <h1 className={styles.quizTitle}>
          {lang === "ru" ? "Игровая комната" : "Quiz Room"}
        </h1>

        <p className={styles.quizSubtitle}>
          Выберите игровой режим и проверьте знания о странах мира.
        </p>

        <div className={styles.quizModesGrid}>
          {quizModes.map((mode) => (
            <Link
              to={mode.path}
              className={styles.quizModeCard}
              key={mode.title[lang]}
            >
              <img className={styles.quizModeIcon} src={mode.iconSrc} alt="" />
              <span className={styles.quizModeTitle}>{mode.title[lang]}</span>
              <span className={styles.quizModeText}>{mode.text[lang]}</span>
            </Link>
          ))}
        </div>

        <Link to="/" className={styles.backButton}>
          {lang === "ru" ? "← Назад к странам" : "← Back to countries"}
        </Link>
      </section>
    </main>
  );
}
