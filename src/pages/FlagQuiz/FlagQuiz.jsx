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

export function FlagQuiz({ lang = "ru" }) {
  const { region } = useParams();
  const bestScoreKey = `flagQuizBestScore-${region}`;

  const availableCountries = useMemo(() => {
    if (region === "world") {
      return flagsQuizData;
    }

    return flagsQuizData.filter((country) => country.region === region);
  }, [region]);

  const questions = useMemo(() => {
    return shuffleArray(availableCountries);
  }, [availableCountries]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

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
    if (!isQuizFinished) return;

    if (score > bestScore) {
      localStorage.setItem(bestScoreKey, String(score));
      setBestScore(score);
    }
  }, [isQuizFinished, score, bestScore, bestScoreKey]);

  if (!currentQuestion) {
    return (
      <main className={styles.flagQuiz}>
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
              className={styles.optionButton}
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

            {!isLastQuestion ? (
              <button
                className={styles.backButton}
                onClick={handleNextQuestion}
              >
                {lang === "ru" ? "Следующий вопрос →" : "Next question →"}
              </button>
            ) : (
              <div className={styles.finishBox}>
                <h2 className={styles.finishTitle}>
                  <img
                    src="/global-timeboard/icons/quiz-finish.png"
                    alt=""
                    className={styles.finishIcon}
                  />
                  {lang === "ru" ? "Квиз завершён!" : "Quiz completed!"}
                </h2>

                <p className={styles.finishResult}>
                  {lang === "ru"
                    ? `Результат: ${score} из ${questions.length}`
                    : `Result: ${score} out of ${questions.length}`}
                </p>
                <p className={styles.finishPercent}>
                  {lang === "ru"
                    ? `Точность: ${percent}%`
                    : `Accuracy: ${percent}%`}
                </p>

                <p className={styles.finishGrade}>{resultMessage}</p>
                <p className={styles.finishResult}>
                  {lang === "ru"
                    ? `Лучший результат: ${Math.max(score, bestScore)} из ${questions.length}`
                    : `Best score: ${Math.max(score, bestScore)} out of ${questions.length}`}
                </p>
                <div className={styles.finishActions}>
                  <button
                    className={styles.finishButton}
                    onClick={handleRestartQuiz}
                  >
                    {lang === "ru" ? "Сыграть ещё раз" : "Play again"}
                  </button>

                  <Link to="/quiz/flags/play" className={styles.finishButton}>
                    {lang === "ru" ? "Выбрать регион" : "Choose region"}
                  </Link>

                  <Link to="/quiz" className={styles.finishButton}>
                    {lang === "ru" ? "Игровая комната" : "Quiz Room"}
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {!(isLastQuestion && isAnswered) && (
          <Link to="/quiz/flags" className={styles.backButton}>
            ← Назад к режимам
          </Link>
        )}
      </section>
    </main>
  );
}
