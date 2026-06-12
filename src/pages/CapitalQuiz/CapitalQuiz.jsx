import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { flagsQuizData } from "../../data/flagsQuizData";
import { flagLearnInfo } from "../../data/flagLearnInfo";
import styles from "./CapitalQuiz.module.css";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createQuestion(currentCountry, allCountries, lang) {
  const correctCapital = flagLearnInfo[currentCountry.slug]?.capital?.[lang];

  const wrongOptions = allCountries
    .filter((country) => country.slug !== currentCountry.slug)
    .map((country) => flagLearnInfo[country.slug]?.capital?.[lang])
    .filter(Boolean)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const options = shuffleArray([correctCapital, ...wrongOptions]);

  return {
    countryName: currentCountry.name[lang],
    correctAnswer: correctCapital,
    options,
  };
}

function getSavedProgress(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey));
  } catch {
    return null;
  }
}

export function CapitalQuiz({ lang = "ru" }) {
  const { region } = useParams();

  const storageKey = `global-timeboard-capital-${region}-${lang}-progress`;

  const availableCountries = useMemo(() => {
    const countries =
      region === "world"
        ? flagsQuizData
        : flagsQuizData.filter((country) => country.region === region);

    return countries.filter(
      (country) => flagLearnInfo[country.slug]?.capital?.[lang],
    );
  }, [region, lang]);

  const savedProgress = getSavedProgress(storageKey);

  const [questions, setQuestions] = useState(() => {
    return savedProgress?.questions || shuffleArray(availableCountries);
  });

  const [questionIndex, setQuestionIndex] = useState(() => {
    return savedProgress?.questionIndex || 0;
  });

  const [selectedAnswer, setSelectedAnswer] = useState(() => {
    return savedProgress?.selectedAnswer || null;
  });

  const [score, setScore] = useState(() => {
    return savedProgress?.score || 0;
  });

  const currentCountry = questions[questionIndex];

  const currentQuestion = useMemo(() => {
    if (!currentCountry) return null;

    return createQuestion(currentCountry, availableCountries, lang);
  }, [currentCountry, availableCountries, lang]);

  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        questions,
        questionIndex,
        selectedAnswer,
        score,
      }),
    );
  }, [storageKey, questions, questionIndex, selectedAnswer, score]);

  if (!currentQuestion) {
    return <h1>Нет стран для квиза по столицам</h1>;
  }

  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const isLastQuestion = questionIndex === questions.length - 1;
  const isQuizFinished = isAnswered && isLastQuestion;
  const resultPercent = Math.round((score / questions.length) * 100);

  function handleAnswer(answer) {
    if (isAnswered) return;

    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  function handleNextQuestion() {
    setSelectedAnswer(null);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  }

  function handleRestartQuiz() {
    localStorage.removeItem(storageKey);

    setQuestions(shuffleArray(availableCountries));
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
  }

  return (
    <main
      className={styles.capitalQuiz}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.panel}>
        <h1 className={styles.title}>
          {lang === "ru" ? "Квиз по столицам" : "Capital Quiz"}
        </h1>

        <p className={styles.progress}>
          {lang === "ru" ? "Вопрос" : "Question"} {questionIndex + 1} /{" "}
          {questions.length}
        </p>

        <p className={styles.score}>
          {lang === "ru" ? "Счёт" : "Score"}: {score}
        </p>

        <h2 className={styles.question}>
          {lang === "ru"
            ? `Столица страны: ${currentQuestion.countryName}?`
            : `Capital of ${currentQuestion.countryName}?`}
        </h2>

        <div className={styles.optionsGrid}>
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              className={`${styles.optionButton} ${
                isAnswered && option === currentQuestion.correctAnswer
                  ? styles.correctOption
                  : ""
              } ${
                isAnswered &&
                option === selectedAnswer &&
                option !== currentQuestion.correctAnswer
                  ? styles.wrongOption
                  : ""
              }`}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className={styles.result}>
            <p>
              {isCorrect
                ? lang === "ru"
                  ? "✅ Верно!"
                  : "✅ Correct!"
                : lang === "ru"
                ? `❌ Неверно. Правильный ответ: ${currentQuestion.correctAnswer}`
                : `❌ Wrong. Correct answer: ${currentQuestion.correctAnswer}`}
            </p>

            {!isLastQuestion && (
              <button
                className={styles.nextButton}
                onClick={handleNextQuestion}
              >
                {lang === "ru" ? "Следующий вопрос →" : "Next question →"}
              </button>
            )}
          </div>
        )}

        <Link to="/quiz" className={styles.backButton}>
          {lang === "ru" ? "← Назад" : "← Back"}
        </Link>
      </section>

      {isQuizFinished && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalIcon}>🏆</div>

            <h2>{lang === "ru" ? "Квиз завершён!" : "Quiz completed!"}</h2>

            <p>
              {lang === "ru"
                ? `Результат: ${score} из ${questions.length}`
                : `Result: ${score} out of ${questions.length}`}
            </p>

            <div className={styles.modalPercent}>{resultPercent}%</div>

            <div className={styles.modalButtons}>
              <button
                className={styles.modalAction}
                onClick={handleRestartQuiz}
              >
                {lang === "ru" ? "Сыграть ещё раз" : "Play again"}
              </button>

              <Link to="/quiz" className={styles.modalAction}>
                {lang === "ru" ? "В игровую комнату" : "Back to Quiz Room"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}