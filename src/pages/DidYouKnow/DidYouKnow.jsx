import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { didYouKnowFacts } from "../../data/didYouKnow/didYouKnowFacts.js";
import styles from "./DidYouKnow.module.css";

export default function DidYouKnow({ lang = "ru" }) {
  const STORAGE_KEY = "global-timeboard-did-you-know-progress";

  const savedProgress = (() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  })();

  const [factIndex, setFactIndex] = useState(savedProgress?.factIndex || 0);
  const [isFinished, setIsFinished] = useState(
    savedProgress?.isFinished || false,
  );

  const currentFact = didYouKnowFacts[factIndex];
  const isLastFact = factIndex === didYouKnowFacts.length - 1;

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        factIndex,
        isFinished,
      }),
    );
  }, [factIndex, isFinished]);

  function handleNextFact() {
    if (isLastFact) {
      setIsFinished(true);
      return;
    }

    setFactIndex((prevIndex) => prevIndex + 1);
  }

  function handleRestart() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }

  if (!currentFact) {
    return (
      <main
        className={styles.page}>
        <section className={styles.card}>
          <h1 className={styles.title}>
            {lang === "ru" ? "Фактов пока нет" : "No facts yet"}
          </h1>

          <Link to="/quiz" className={styles.backButton}>
            {lang === "ru" ? "← Назад" : "← Back"}
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}
     style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
        }}>
      <section className={styles.card}>
        <p className={styles.progress}>
          {lang === "ru"
            ? `Факт ${factIndex + 1} / ${didYouKnowFacts.length}`
            : `Fact ${factIndex + 1} / ${didYouKnowFacts.length}`}
        </p>

        <picture>
          <source media="(max-width: 768px)" srcSet={currentFact.mobileImage} />
          <img
            className={styles.image}
            src={currentFact.desktopImage}
            alt={currentFact.title?.[lang] || ""}
          />
        </picture>

        <div className={styles.mobileText}>
          <h1 className={styles.title}>{currentFact.title?.[lang]}</h1>

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: currentFact.description?.[lang],
            }}
          />
        </div>

        <button className={styles.nextButton} onClick={handleNextFact}>
          {isLastFact
            ? lang === "ru"
              ? "Завершить"
              : "Finish"
            : lang === "ru"
              ? "Следующий факт →"
              : "Next fact →"}
        </button>
      </section>

      <Link to="/quiz" className={styles.backButton}>
        {lang === "ru" ? "← Назад" : "← Back"}
      </Link>

      {isFinished && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalIcon}>💡</div>

            <h2>
              {lang === "ru" ? "Все факты просмотрены!" : "All facts viewed!"}
            </h2>

            <p>
              {lang === "ru"
                ? `Вы посмотрели ${didYouKnowFacts.length} удивительных фактов.`
                : `You viewed ${didYouKnowFacts.length} amazing facts.`}
            </p>

            <div className={styles.modalButtons}>
              <button className={styles.modalAction} onClick={handleRestart}>
                {lang === "ru" ? "Смотреть снова" : "View Again"}
              </button>

              <Link to="/quiz" className={styles.modalAction}>
                {lang === "ru" ? "В игровую комнату" : "Game Room"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
