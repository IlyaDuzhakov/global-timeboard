import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { extremeFood } from "../../data/extremeFood/extremeFood.js";
import styles from "./ExtremeFood.module.css";

export default function ExtremeFood({ lang = "ru" }) {
  const STORAGE_KEY = "global-timeboard-extreme-food-progress";

  const savedProgress = (() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  })();

  const [cardIndex, setCardIndex] = useState(savedProgress?.cardIndex || 0);

  const currentCard = extremeFood[cardIndex];

  const isLastCard = cardIndex === extremeFood.length - 1;
  const [isFinished, setIsFinished] = useState(
    savedProgress?.isFinished || false,
  );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cardIndex,
        isFinished,
      }),
    );
  }, [cardIndex, isFinished]);

  function handleNextCard() {
    if (isLastCard) {
      setIsFinished(true);
      return;
    }

    setCardIndex((prevIndex) => prevIndex + 1);
  }

  function handleRestart() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }

  if (!currentCard) {
    return (
      <main
        className={styles.page}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
        }}
      >
        <section className={styles.card}>
          <h1 className={styles.title}>
            {lang === "ru" ? "Карточек пока нет" : "No cards yet"}
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
        <div className={styles.info}>
          <p className={styles.progress}>
            {lang === "ru"
              ? `Карточка ${cardIndex + 1} / ${extremeFood.length}`
              : `Card ${cardIndex + 1} / ${extremeFood.length}`}
          </p>

          <p className={styles.country}>{currentCard.country?.[lang]}</p>
        </div>

        <img className={styles.image} src={currentCard.image} alt="" />

        <h1 className={styles.title}>{currentCard.title?.[lang]}</h1>

        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: currentCard.description?.[lang],
          }}
        />

        <button className={styles.nextButton} onClick={handleNextCard}>
          {isLastCard
            ? lang === "ru"
              ? "Завершить"
              : "Finish"
            : lang === "ru"
              ? "Следующая карточка →"
              : "Next card →"}
        </button>
      </section>

      <Link to="/quiz" className={styles.backButton}>
        {lang === "ru" ? "← Назад" : "← Back"}
      </Link>

      {isFinished && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalIcon}>😱</div>

            <h2>
              {lang === "ru"
                ? "Все карточки просмотрены!"
                : "All cards viewed!"}
            </h2>

            <p>
              {lang === "ru"
                ? `Вы посмотрели ${extremeFood.length} необычных блюд мира.`
                : `You viewed ${extremeFood.length} unusual dishes from around the world.`}
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
