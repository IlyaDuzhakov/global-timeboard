import styles from "./QuizRoom.module.css";
import { Link } from "react-router-dom";
import { sideLandmarks } from "../../data/sideLandmarks.js";

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
      path: "/quiz/landmarks",
    },
    {
      iconSrc: "/global-timeboard/icons/quiz-capitals.png",
      title: { ru: "Столицы", en: "Capitals" },
      text: { ru: "Проверь столицы мира", en: "Test world capitals" },
      path: "/quiz/capitals/play/world",
    },
    {
      iconSrc: "/global-timeboard/icons/currencies.svg",
      title: { ru: "Валюты", en: "Currencies" },
      text: {
        ru: "Угадай валюту страны",
        en: "Guess the country currency",
      },
      path: "/money",
    },
    {
      iconSrc: "/global-timeboard/icons/quiz-junior.png",
      title: { ru: "Junior", en: "Junior" },
      text: { ru: "40 лёгких вопросов", en: "40 easy questions" },
      path: "/quiz/junior",
    },
    {
      iconSrc: "/global-timeboard/icons/quiz-middle.png",
      title: { ru: "Middle", en: "Middle" },
      text: { ru: "40 вопросов посложнее", en: "40 medium questions" },
      path: "/quiz/middle",
    },
    {
      iconSrc: "/global-timeboard/icons/quiz-expert.png",
      title: { ru: "Expert", en: "Expert" },
      text: { ru: "40 сложных вопросов", en: "40 hard questions" },
      path: "/quiz/expert",
    },
    {
      iconSrc: "/global-timeboard/icons/quiz-marathon.png",
      title: { ru: "Марафон 100", en: "Marathon 100" },
      text: { ru: "Большой мировой челлендж", en: "Big world challenge" },
      path: "/quiz/marathon",
    },
    {
      iconSrc: "/global-timeboard/icons/food.svg",
      title: { ru: "Блюда мира", en: "World Food" },
      text: {
        ru: "Угадай блюдо по фото",
        en: "Guess the dish by photo",
      },
      path: "/quiz/food",
    },
  ];

  const leftLandmark =
    sideLandmarks[Math.floor(Math.random() * sideLandmarks.length)];

  let rightLandmark =
    sideLandmarks[Math.floor(Math.random() * sideLandmarks.length)];

  if (rightLandmark.title === leftLandmark.title) {
    rightLandmark =
      sideLandmarks[
        (sideLandmarks.indexOf(leftLandmark) + 1) % sideLandmarks.length
      ];
  }

  return (
    <main
      className={styles.quizRoom}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <div className={styles.desktopLandmarkLayout}>
        <aside className={styles.sideLandmark}>
          <img src={leftLandmark.image} alt="" />
          <p>{leftLandmark.title}</p>
        </aside>
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
                <img
                  className={styles.quizModeIcon}
                  src={mode.iconSrc}
                  alt=""
                />
                <span className={styles.quizModeTitle}>{mode.title[lang]}</span>
                <span className={styles.quizModeText}>{mode.text[lang]}</span>
              </Link>
            ))}
            <Link to="/quiz/achievements" className={styles.quizCard}>
              <div className={styles.quizIcon}>
                <img
                  className={styles.quizMainIcon}
                  src="/global-timeboard/icons/achievements.svg"
                  alt="Quiz Room"
                />
              </div>

              <h2 className={styles.hallAchievements}>
                {lang === "ru" ? "Зал достижений" : "Achievements Hall"}
              </h2>

              <p className={styles.hallAchievementsText}>
                {lang === "ru"
                  ? "Ваши медали, рекорды и прогресс"
                  : "Your medals, records and progress"}
              </p>
            </Link>
          </div>

          <Link to="/" className={styles.backButton}>
            {lang === "ru" ? "← Назад к странам" : "← Back to countries"}
          </Link>
        </section>
        <aside className={styles.sideLandmark}>
          <img src={rightLandmark.image} alt="" />
          <p>{rightLandmark.title}</p>
        </aside>
      </div>
    </main>
  );
}
