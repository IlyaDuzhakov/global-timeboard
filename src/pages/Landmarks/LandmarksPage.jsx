import { Link } from "react-router-dom";
import styles from "./LandmarksPage.module.css";

export function LandmarksPage({ lang }) {


  return (
    <main
      className={styles.landmarksPage}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.panel}>
        <h1 className={styles.title}>
          {lang === "ru" ? "Достопримечательности" : "Landmarks"}
        </h1>

        <p className={styles.subtitle}>
          {lang === "ru"
            ? "Выберите континент и угадывайте знаменитые места мира."
            : "Choose a continent and guess famous landmarks."}
        </p>

        <div className={styles.modeGrid}>
          <Link to="/quiz/landmarks/play/europe" className={styles.modeCard}>
             <img 
             className={styles.modeIcon} 
             src="/global-timeboard/icons/europe.svg"
             alt="attractions-europe" 
             />
            <span className={styles.modeTitle}>
              {lang === "ru" ? "Европа" : "Europe"}
            </span>
          </Link>

          <Link to="/quiz/landmarks/play/asia" className={styles.modeCard}>
             <img 
             className={styles.modeIcon} 
             src="/global-timeboard/icons/asia.svg"
             alt="attractions-asia" 
             />
            <span className={styles.modeTitle}>
              {lang === "ru" ? "Азия" : "Asia"}
            </span>
          </Link>

          <Link to="/quiz/landmarks/play/africa" className={styles.modeCard}>
            <img 
             className={styles.modeIcon} 
             src="/global-timeboard/icons/africa.svg"
             alt="attractions-africa" 
             />
            <span className={styles.modeTitle}>
              {lang === "ru" ? "Африка" : "Africa"}
            </span>
          </Link>

          <Link
            to="/quiz/landmarks/play/north-america"
            className={styles.modeCard}
          >
            <img 
             className={styles.modeIcon} 
             src="/global-timeboard/icons/north-america.svg"
             alt="north-america" 
             />
            <span className={styles.modeTitle}>
              {lang === "ru" ? "Северная Америка" : "North America"}
            </span>
          </Link>

          <Link
            to="/quiz/landmarks/play/south-america"
            className={styles.modeCard}
          >
            <img 
             className={styles.modeIcon} 
             src="/global-timeboard/icons/south-america.svg"
             alt="south-america" 
             />
            <span className={styles.modeTitle}>
              {lang === "ru" ? "Южная Америка" : "South America"}
            </span>
          </Link>

          <Link to="/quiz/landmarks/play/oceania" className={styles.modeCard}>
             <img 
             className={styles.modeIcon} 
             src="/global-timeboard/icons/oceania.svg"
             alt="oceania" 
             />
            <span className={styles.modeTitle}>
              {lang === "ru" ? "Океания" : "Oceania"}
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