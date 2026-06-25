import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { worldRecords } from "../../data/worldRecords/worldRecords.js";
import styles from "./worldRecords.module.css";

export default function WorldRecords({ lang = "ru" }) {
  const STORAGE_KEY = "global-timeboard-world-records-progress";

  const savedProgress = (() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  })();

  const [recordIndex, setRecordIndex] = useState(savedProgress?.recordIndex || 0);
  const [isFinished, setIsFinished] = useState(savedProgress?.isFinished || false);

  const currentRecord = worldRecords[recordIndex];
  const isLastRecord = recordIndex === worldRecords.length - 1;

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ recordIndex, isFinished }),
    );
  }, [recordIndex, isFinished]);

  function handleNextRecord() {
    if (isLastRecord) {
      setIsFinished(true);
      return;
    }

    setRecordIndex((prevIndex) => prevIndex + 1);
  }

  function handleRestart() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }

  if (!currentRecord) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <h1 className={styles.title}>
            {lang === "ru" ? "Рекордов пока нет" : "No records yet"}
          </h1>

          <Link to="/quiz" className={styles.backButton}>
            {lang === "ru" ? "← Назад" : "← Back"}
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main
      className={styles.page}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.card}>
        <p className={styles.progress}>
          {lang === "ru"
            ? `Рекорд ${recordIndex + 1} / ${worldRecords.length}`
            : `Record ${recordIndex + 1} / ${worldRecords.length}`}
        </p>

        <picture>
          <source media="(max-width: 768px)" srcSet={currentRecord.mobileImage} />
          <img
            className={styles.image}
            src={currentRecord.desktopImage}
            alt={currentRecord.title?.[lang] || ""}
          />
        </picture>

        <button className={styles.nextButton} onClick={handleNextRecord}>
          {isLastRecord
            ? lang === "ru"
              ? "Завершить"
              : "Finish"
            : lang === "ru"
              ? "Следующий рекорд →"
              : "Next record →"}
        </button>
      </section>

      <Link to="/quiz" className={styles.backButton}>
        {lang === "ru" ? "← Назад" : "← Back"}
      </Link>

      {isFinished && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalIcon}>🏆</div>

            <h2>
              {lang === "ru"
                ? "Все рекорды просмотрены!"
                : "All records viewed!"}
            </h2>

            <p>
              {lang === "ru"
                ? `Вы посмотрели ${worldRecords.length} великих рекордов.`
                : `You viewed ${worldRecords.length} great records.`}
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