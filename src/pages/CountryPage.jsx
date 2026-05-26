import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { countryInfo } from "../utils/countryData";
import { countryDetails } from "../utils/countryDetails";
import styles from "./CountryPage.module.css";

export default function CountryPage({ lang }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const [activeSection, setActiveSection] = useState("government");
  const [flippedCards, setFlippedCards] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const toggleFlipCard = (index) => {
    setFlippedCards((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  const country = Object.values(countryInfo).find((item) => item.id === id);
  const details = countryDetails[id];

  if (!country) {
    return (
      <main className={styles.countryPage}>
        <div className={styles.sectionContent}>
          {lang === "ru" ? "Страна не найдена" : "Country not found"}
        </div>
      </main>
    );
  }

  return (
    <main className={styles.countryPage}>
      <div className={styles.countryCard}>
        <h1>{country.name[lang]}</h1>
        <p>{country.capital[lang]}</p>

        <img src={country.flag} alt={country.name.en} width="300" />

        <section className={styles.countryInfo}>
          <div>
            <strong>{lang === "ru" ? "Территория:" : "Area:"}</strong>
            <p>{country.area} km²</p>
          </div>

          <div>
            <strong>{lang === "ru" ? "Население:" : "Population:"}</strong>
            <p>{country.population[lang]}</p>
          </div>

          <div>
            <strong>{lang === "ru" ? "Часовой пояс:" : "Timezone:"}</strong>
            <p>{country.timezone}</p>
          </div>

          <div>
            <strong>{lang === "ru" ? "Валюта:" : "Currency:"}</strong>
            <p>{country.currency[lang]}</p>
          </div>

          <div>
            <strong>
              {lang === "ru" ? "Форма правления:" : "Government:"}
            </strong>
            <p>{country.government[lang]}</p>
          </div>

          <div>
            <strong>{lang === "ru" ? "Язык:" : "Language:"}</strong>
            <p>{country.language[lang]}</p>
          </div>
        </section>
      </div>

      <section className={styles.countrySections}>
        <button
          onClick={() => setActiveSection("government")}
          className={activeSection === "government" ? styles.activeButton : ""}
        >
          {lang === "ru" ? "Государство" : "Government"}
        </button>

        <button
          onClick={() => setActiveSection("landmarks")}
          className={activeSection === "landmarks" ? styles.activeButton : ""}
        >
          {lang === "ru" ? "Достопримечательности" : "Landmarks"}
        </button>

        <button
          onClick={() => setActiveSection("resources")}
          className={activeSection === "resources" ? styles.activeButton : ""}
        >
          {lang === "ru" ? "Ресурсы" : "Resources"}
        </button>

        <button
          onClick={() => setActiveSection("nature")}
          className={activeSection === "nature" ? styles.activeButton : ""}
        >
          {lang === "ru" ? "Природа / Климат" : "Nature / Climate"}
        </button>

        <button
          onClick={() => setActiveSection("economy")}
          className={activeSection === "economy" ? styles.activeButton : ""}
        >
          {lang === "ru" ? "Экономика / Торговля" : "Economy / Trade"}
        </button>

        <button
          onClick={() => setActiveSection("culture")}
          className={activeSection === "culture" ? styles.activeButton : ""}
        >
          {lang === "ru" ? "Культура / Религия" : "Culture / Religion"}
        </button>

        <button
          onClick={() => setActiveSection("sport")}
          className={activeSection === "sport" ? styles.activeButton : ""}
        >
          {lang === "ru" ? "Спорт" : "Sport"}
        </button>

        <button
          onClick={() => setActiveSection("strengths")}
          className={activeSection === "strengths" ? styles.activeButton : ""}
        >
          {lang === "ru"
            ? "Сильные / Слабые стороны"
            : "Strengths / Challenges"}
        </button>
        <button
          onClick={() => setActiveSection("facts")}
          className={activeSection === "facts" ? styles.activeButton : ""}
        >
          {lang === "ru" ? "Интересные факты" : "Interesting Facts"}
        </button>
        <button
          onClick={() => setActiveSection("quiz")}
          className={activeSection === "quiz" ? styles.activeButton : ""}
        >
          {lang === "ru" ? "Квиз" : "Quiz"}
        </button>
      </section>

      <div className={styles.sectionContent}>
        {activeSection === "government" && (
          <div className={styles.contentBlock}>
            <h2>{lang === "ru" ? "Государство" : "Government"}</h2>

            <p
              dangerouslySetInnerHTML={{
                __html:
                  details?.government?.[lang] ||
                  (lang === "ru"
                    ? "Информация пока не добавлена"
                    : "Information not added yet"),
              }}
            />
          </div>
        )}
        {activeSection === "resources" && (
          <div className={styles.contentBlock}>
            <h2>{lang === "ru" ? "Ресурсы" : "Resources"}</h2>

            <p
              dangerouslySetInnerHTML={{
                __html:
                  details?.resources?.[lang] ||
                  (lang === "ru"
                    ? "Информация пока не добавлена"
                    : "Information not added yet"),
              }}
            />
          </div>
        )}

        {activeSection === "landmarks" && (
          <div className={styles.landmarkGrid}>
            {details?.landmarks?.map((place, index) => (
              <div
                className={styles.landmarkCard}
                key={place.title.en}
                onClick={() => toggleFlipCard(index)}
              >
                <div
                  className={`${styles.landmarkInner} ${
                    flippedCards.includes(index) ? styles.flipped : ""
                  }`}
                >
                  <div className={styles.landmarkFront}>
                    <img src={place.image} alt={place.title.en} />

                    <h3>{place.title[lang]}</h3>
                    <div className={styles.flipHint}>↻</div>
                  </div>

                  <div className={styles.landmarkBack}>
                    <h3>{place.title[lang]}</h3>

                    <p>{place.description[lang]}</p>
                    <div className={styles.flipHint}>↻</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === "nature" && (
          <div className={styles.contentBlock}>
            <h2>{lang === "ru" ? "Природа / Климат" : "Nature / Climate"}</h2>

            <p
              dangerouslySetInnerHTML={{
                __html:
                  details?.nature?.[lang] ||
                  (lang === "ru"
                    ? "Информация пока не добавлена"
                    : "Information not added yet"),
              }}
            />
          </div>
        )}
        {activeSection === "economy" && (
          <div className={styles.contentBlock}>
            <h2>
              {lang === "ru" ? "Экономика и торговля" : "Economy and Trade"}
            </h2>

            <ul className={styles.factsList}>
              {details?.economyFacts?.map((fact, index) => (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: fact[lang],
                  }}
                />
              ))}
            </ul>
          </div>
        )}
        {activeSection === "culture" && (
          <div className={styles.contentBlock}>
            <h2>
              {lang === "ru" ? "Культура / Религия" : "Culture / Religion"}
            </h2>

            <p
              dangerouslySetInnerHTML={{
                __html:
                  details?.culture?.[lang] ||
                  (lang === "ru"
                    ? "Информация пока не добавлена"
                    : "Information not added yet"),
              }}
            />
          </div>
        )}
        {activeSection === "sport" && (
          <div className={styles.contentBlock}>
            <h2>{lang === "ru" ? "Спорт" : "Sport"}</h2>

            <p
              dangerouslySetInnerHTML={{
                __html:
                  details?.sport?.[lang] ||
                  (lang === "ru"
                    ? "Информация пока не добавлена"
                    : "Information not added yet"),
              }}
            />
          </div>
        )}
        {activeSection === "strengths" && (
          <div className={styles.contentBlock}>
            <h2>
              {lang === "ru"
                ? "Сильные / Слабые стороны"
                : "Strengths / Challenges"}
            </h2>

            <p
              dangerouslySetInnerHTML={{
                __html:
                  details?.strengths?.[lang] ||
                  (lang === "ru"
                    ? "Информация пока не добавлена"
                    : "Information not added yet"),
              }}
            />
          </div>
        )}
        {activeSection === "facts" && (
          <div className={styles.contentBlock}>
            <h2>{lang === "ru" ? "Интересные факты" : "Interesting Facts"}</h2>

            <ul className={styles.factsList}>
              {details?.facts?.map((fact, index) => (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: fact[lang],
                  }}
                />
              ))}
            </ul>
          </div>
        )}
        {activeSection === "quiz" && (
          <div className={styles.contentBlock}>
            <h2>{lang === "ru" ? "Квиз" : "Quiz"}</h2>

            <div className={styles.quizContainer}>
              <h3>{details?.quiz?.[currentQuestion]?.question?.[lang]}</h3>

              <div className={styles.answers}>
                {details?.quiz?.[currentQuestion]?.options?.[lang]?.map(
                  (option, index) => (
                    <button
                      key={index}
                      className={`
  ${styles.answerButton}

  ${
    selectedAnswer !== null &&
    index === details?.quiz?.[currentQuestion]?.correct
      ? styles.correctAnswer
      : ""
  }

  ${
    selectedAnswer === index &&
    index !== details?.quiz?.[currentQuestion]?.correct
      ? styles.wrongAnswer
      : ""
  }
`}
                      onClick={() => {
                        if (selectedAnswer !== null) return;

                        setSelectedAnswer(index);

                        if (
                          index === details?.quiz?.[currentQuestion]?.correct
                        ) {
                          setScore((prev) => prev + 1);
                        }
                      }}
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
              {selectedAnswer === details?.quiz?.[currentQuestion]?.correct && (
                <button
                  className={styles.nextButton}
                  onClick={() => {
                    setCurrentQuestion((prev) => prev + 1);
                    setSelectedAnswer(null);
                  }}
                >
                  {lang === "ru" ? "Следующий вопрос →" : "Next Question →"}
                </button>
              )}
            </div>
          </div>
        )}
        {activeSection !== "government" &&
          activeSection !== "landmarks" &&
          activeSection !== "nature" &&
          activeSection !== "economy" &&
          activeSection !== "resources" &&
          activeSection !== "facts" &&
          activeSection !== "culture" &&
          activeSection !== "sport" &&
          activeSection !== "strengths" &&
          activeSection !== "quiz" && (
            <div className={styles.contentBlock}>
              <h2>{activeSection}</h2>

              <p>
                {lang === "ru"
                  ? "Информация пока не добавлена"
                  : "Information not added yet"}
              </p>
            </div>
          )}
      </div>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← {lang === "ru" ? "Назад" : "Back"}
      </button>
    </main>
  );
}
