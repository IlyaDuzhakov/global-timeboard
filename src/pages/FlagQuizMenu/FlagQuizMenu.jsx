import { Link } from "react-router-dom";
import styles from "./FlagQuizMenu.module.css";

export function FlagQuizMenu({ lang }) {
  return (
    <main
      className={styles.flagQuizMenu}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.panel}>
        <h1 className={styles.title}>
          {lang === "ru" ? "Флаги мира" : "World Flags"}
        </h1>

        <p className={styles.subtitle}>
          {lang === "ru"
            ? "Выберите режим: тренировка или проверка знаний."
            : "Choose a mode: learning or knowledge test."}
        </p>

        <div className={styles.modeGrid}>
          <Link to="/quiz/flags/play" className={styles.modeCard}>
            <span className={styles.modeIcon}>
              <img
                className={styles.quizMainIcon}
                src="/global-timeboard/icons/quiz-game.png"
                alt="quiz-game"
              />
            </span>
            <span className={styles.modeTitle}>
              {lang === "ru" ? "Играть" : "Play"}
            </span>
            <span className={styles.modeText}>
              {lang === "ru"
                ? "Угадай страну по флагу"
                : "Guess the country by flag"}
            </span>
          </Link>

          <Link to="/quiz/flags/learn" className={styles.modeCard}>
            <span className={styles.modeIcon}>
                <img
                className={styles.quizMainIcon}
                src="/global-timeboard/icons/quiz-learn.png"
                alt="quiz-learn"
              />
            </span>
            <span className={styles.modeTitle}>
              {lang === "ru" ? "Учить" : "Learn"}
            </span>
            <span className={styles.modeText}>
              {lang === "ru"
                ? "Переворачивай карточки и запоминай страны"
                : "Flip cards and memorize countries"}
            </span>
          </Link>
        </div>

        <Link to="/quiz" className={styles.backButton}>
          {lang === "ru" ? "← Назад в игровую комнату" : "← Back to Quiz Room"}
        </Link>
      </section>
    </main>
  );
}
