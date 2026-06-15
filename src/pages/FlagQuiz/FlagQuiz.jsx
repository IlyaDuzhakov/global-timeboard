import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { flagsQuizData } from "../../data/flagsQuizData";
import styles from "./FlagQuiz.module.css";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createQuestion(currentCountry, allCountries, lang) {
  const wrongOptions = allCountries
    .filter((country) => country.slug !== currentCountry.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const options = shuffleArray([currentCountry, ...wrongOptions]);

  return {
    flag: currentCountry.flag,
    correctAnswer: currentCountry.name[lang],
    options: options.map((country) => country.name[lang]),
  };
}

function getSavedProgress(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey));
  } catch {
    return null;
  }
}
export function FlagQuiz({ lang = "ru" }) {
  const { region } = useParams();

  const bestScoreKey = `flagQuizBestScore-${region}-${lang}`;
  const storageKey = `global-timeboard-flags-${region}-${lang}-progress`;

  const availableCountries = useMemo(() => {
    if (region === "world") {
      return flagsQuizData;
    }

    return flagsQuizData.filter((country) => country.region === region);
  }, [region]);

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

  const [bestScore, setBestScore] = useState(() => {
    return Number(localStorage.getItem(bestScoreKey)) || 0;
  });

  const currentCountry = questions[questionIndex];

  const currentQuestion = useMemo(() => {
    if (!currentCountry) {
      return null;
    }

    return createQuestion(currentCountry, flagsQuizData, lang);
  }, [currentCountry, lang]);

  const isAnswered = selectedAnswer !== null;

  const isCorrect = currentQuestion
    ? selectedAnswer === currentQuestion.correctAnswer
    : false;

  const isLastQuestion = questionIndex === questions.length - 1;

  const isQuizFinished = isLastQuestion && isAnswered;

  const percent =
    questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const resultMessage =
    percent >= 90
      ? lang === "ru"
        ? "Отлично!"
        : "Excellent!"
      : percent >= 70
        ? lang === "ru"
          ? "Хорошо!"
          : "Good!"
        : percent >= 50
          ? lang === "ru"
            ? "Неплохо!"
            : "Not bad!"
          : lang === "ru"
            ? "Стоит повторить материал"
            : "Keep practicing";

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

  useEffect(() => {
    if (!isQuizFinished) return;

    if (score > bestScore) {
      localStorage.setItem(bestScoreKey, String(score));
      setBestScore(score);
    }
  }, [isQuizFinished, score, bestScore, bestScoreKey]);

  if (!currentQuestion) {
    return (
      <main
        className={styles.flagQuiz}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
        }}
      >
        <section className={styles.panel}>
          <h1 className={styles.title}>
            {lang === "ru"
              ? "Пока нет стран для этого региона"
              : "No countries for this region yet"}
          </h1>

          <Link to="/quiz/flags/play" className={styles.backButton}>
            {lang === "ru" ? "← Назад к регионам" : "← Back to regions"}
          </Link>
        </section>
      </main>
    );
  }
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
      className={styles.flagQuiz}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.panel}>
        <h1 className={styles.title}>
          {lang === "ru" ? "Квиз по флагам" : "Flag Quiz"}
        </h1>

        <p className={styles.progress}>
          {lang === "ru" ? "Вопрос" : "Question"} {questionIndex + 1} /{" "}
          {questions.length}
        </p>

        <p className={styles.score}>
          {lang === "ru" ? "Счёт" : "Score"}: {score}
        </p>

        <img className={styles.flagImage} src={currentQuestion.flag} alt="" />

        <h2 className={styles.question}>
          {lang === "ru" ? "Какая это страна?" : "Which country is this?"}
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
                className={styles.backButton}
                onClick={handleNextQuestion}
              >
                {lang === "ru" ? "Следующий вопрос →" : "Next question →"}
              </button>
            )}
          </div>
        )}

        {!isQuizFinished && (
          <Link to="/quiz/flags" className={styles.backButton}>
            ← Назад к режимам
          </Link>
        )}
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

            <div className={styles.modalPercent}>{percent}%</div>

            <p className={styles.modalText}>{resultMessage}</p>

            <p className={styles.modalText}>
              {lang === "ru"
                ? `Лучший результат: ${Math.max(score, bestScore)} из ${questions.length}`
                : `Best score: ${Math.max(score, bestScore)} out of ${questions.length}`}
            </p>

            <div className={styles.modalButtons}>
              <button
                className={styles.modalAction}
                onClick={handleRestartQuiz}
              >
                {lang === "ru" ? "Сыграть ещё раз" : "Play again"}
              </button>

              <Link to="/quiz/flags/play" className={styles.modalAction}>
                {lang === "ru" ? "Выбрать регион" : "Choose region"}
              </Link>

              <Link to="/quiz" className={styles.modalAction}>
                {lang === "ru" ? "Игровая комната" : "Quiz Room"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
