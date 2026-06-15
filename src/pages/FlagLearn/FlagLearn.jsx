import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { flagsQuizData } from "../../data/flagsQuizData";
import styles from "./FlagLearn.module.css";
import { flagLearnInfo } from "../../data/flagLearnInfo";

const ITEMS_PER_PAGE = 20;

export function FlagLearn({ lang = "ru" }) {
  const { region } = useParams();
  const [flippedCards, setFlippedCards] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const cards = useMemo(() => {
    if (region === "world") {
      return flagsQuizData;
    }

    return flagsQuizData.filter((country) => country.region === region);
  }, [region]);

  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);

  const currentCards = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return cards.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [cards, currentPage]);

  function toggleCard(slug) {
    setFlippedCards((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  }

  function goToPreviousPage() {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function goToNextPage() {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }

  if (cards.length === 0) {
    return <h1>Нет карточек для этого региона</h1>;
  }

  return (
    <main
      className={styles.learnPage}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.panel}>
        <h1 className={styles.title}>
          {lang === "ru" ? "Учить флаги" : "Learn Flags"}
        </h1>

        <p className={styles.progress}>
          {lang === "ru" ? "Карточек" : "Cards"}: {cards.length}
          <img
            src="/global-timeboard/icons/flip-card.svg"
            alt="flip-icon"
            className={styles.flipIcon}
          />
        </p>

        <p className={styles.pageInfo}>
          {lang === "ru" ? "Страница" : "Page"} {currentPage} / {totalPages}
        </p>

        <div className={styles.cardsGrid}>
          {currentCards.map((country) => {
            const isFlipped = flippedCards[country.slug];
            const info = flagLearnInfo[country.slug];

            return (
              <button
                key={country.slug}
                className={`${styles.learnCard} ${
                  isFlipped ? styles.flipped : ""
                }`}
                onClick={() => toggleCard(country.slug)}
              >
                {!isFlipped ? (
                  <div className={styles.cardFront}>
                    <img
                      className={styles.flagImage}
                      src={country.flag}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className={styles.cardBack}>
                    <h2>{country.name[lang]}</h2>

                    <p>
                      {lang === "ru" ? "Столица" : "Capital"}:{" "}
                      {info?.capital?.[lang] || "—"}
                    </p>
                    <p>
                      {lang === "ru" ? "Население" : "Population"}:{" "}
                      {info?.population?.[lang] || "—"}
                    </p>
                    <p>
                      {lang === "ru" ? "Территория" : "Area"}:{" "}
                      {info?.area?.[lang] || "—"}
                    </p>
                    <p>
                      {lang === "ru" ? "Язык" : "Language"}:{" "}
                      {info?.language?.[lang] || "—"}
                    </p>
                    <p>
                      {lang === "ru" ? "Валюта" : "Currency"}:{" "}
                      {info?.currency?.[lang] || "—"}
                    </p>
                    <p>
                      {lang === "ru" ? "Правление" : "Government"}:{" "}
                      {info?.government?.[lang] || "—"}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              ← {lang === "ru" ? "Назад" : "Previous"}
            </button>

            <span className={styles.paginationText}>
              {currentPage} / {totalPages}
            </span>

            <button
              className={styles.paginationButton}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              {lang === "ru" ? "Вперёд" : "Next"} →
            </button>
          </div>
        )}

        <Link to="/quiz/flags/learn" className={styles.backButton}>
          ← {lang === "ru" ? "К регионам" : "To regions"}
        </Link>
      </section>
    </main>
  );
}