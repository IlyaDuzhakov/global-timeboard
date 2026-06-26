import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { worldDrinks } from "../../data/drinks/worldDrinks.js";
import styles from "./DrinksQuiz.module.css";

function shuffleArray(array = []) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function FoodQuiz({ lang = "ru" }) {
  const STORAGE_KEY = "global-timeboard-drinks-progress";

  const savedProgress = (() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  })();

  const [questions] = useState(() => {
    if (savedProgress?.questions?.length > 0) {
      return savedProgress.questions;
    }

    return worldDrinks.map((question) => ({
      ...question,
      shuffledOptions: {
        ru: shuffleArray(question.options?.ru),
        en: shuffleArray(question.options?.en),
      },
    }));
  });

  const [questionIndex, setQuestionIndex] = useState(
    savedProgress?.questionIndex || 0,
  );

  const [score, setScore] = useState(savedProgress?.score || 0);

  const [selectedAnswer, setSelectedAnswer] = useState(
    savedProgress?.selectedAnswer || null,
  );

  const currentQuestion = questions[questionIndex];

  const options =
    currentQuestion?.shuffledOptions?.[lang] ||
    currentQuestion?.options?.[lang] ||
    [];

  const correctAnswer = currentQuestion?.correctAnswer?.[lang];

  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === correctAnswer;
  const isLastQuestion = questionIndex === questions.length - 1;
  const isQuizFinished = isLastQuestion && isAnswered;

  const percent =
    questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  useEffect(() => {
    if (!questions.length) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        questionIndex,
        score,
        selectedAnswer,
        questions,
      }),
    );
  }, [STORAGE_KEY, questionIndex, score, selectedAnswer, questions]);

  function handleAnswer(option) {
    if (isAnswered || !correctAnswer) return;

    setSelectedAnswer(option);

    if (option === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  function handleNextQuestion() {
    setSelectedAnswer(null);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  }

  function handleRestartQuiz() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }

  if (!currentQuestion) {
    return (
      <main
        className={styles.quizPage}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
        }}
      >
        <section className={styles.quizCard}>
          <h1 className={styles.title}>
            {lang === "ru"
              ? "Нет вопросов о напитках"
              : "No drink questions yet"}
          </h1>

          <Link to="/quiz" className={styles.backButton}>
            {lang === "ru" ? "← Назад в игровую комнату" : "← Back to quiz room"}
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main
      className={styles.quizPage}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.quizCard}>
        <div className={styles.quizInfo}>
          <p className={styles.progress}>
            {lang === "ru"
              ? `Вопрос ${questionIndex + 1} / ${questions.length}`
              : `Question ${questionIndex + 1} / ${questions.length}`}
          </p>

          <p className={styles.score}>
            {lang === "ru" ? `Счёт: ${score}` : `Score: ${score}`}
          </p>
        </div>

        <img
          className={styles.image}
          src={currentQuestion.image}
          alt={currentQuestion.title?.[lang] || ""}
        />

        <h2 className={styles.question}>
          {currentQuestion.question?.[lang]}
        </h2>

        <div className={styles.options}>
          {options.map((option) => (
            <button
              key={option}
              className={`${styles.optionButton} ${
                isAnswered && option === correctAnswer
                  ? styles.correctOption
                  : ""
              } ${
                isAnswered &&
                option === selectedAnswer &&
                option !== correctAnswer
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
          <div className={styles.resultBox}>
            <p className={styles.resultText}>
              {isCorrect
                ? lang === "ru"
                  ? "✅ Верно!"
                  : "✅ Correct!"
                : lang === "ru"
                  ? `❌ Неверно. Правильный ответ: ${correctAnswer}`
                  : `❌ Wrong. Correct answer: ${correctAnswer}`}
            </p>

            <div className={styles.factBox}>
              <h3>
                {currentQuestion.title?.[lang]}
                {currentQuestion.country?.[lang]
                  ? ` — ${currentQuestion.country[lang]}`
                  : ""}
              </h3>

              <div
                dangerouslySetInnerHTML={{
                  __html: currentQuestion.description?.[lang] || "",
                }}
              />
            </div>

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
      </section>

      <Link to="/quiz" className={styles.backButton}>
        {lang === "ru" ? "← Назад" : "← Back"}
      </Link>

      {isQuizFinished && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalIcon}>🍹</div>

            <h2>{lang === "ru" ? "Квиз завершён!" : "Quiz completed!"}</h2>

            <p>
              {lang === "ru"
                ? `Результат: ${score} из ${questions.length}`
                : `Result: ${score} out of ${questions.length}`}
            </p>

            <p className={styles.modalPercent}>{percent}%</p>

            <div className={styles.modalButtons}>
              <button
                className={styles.modalAction}
                onClick={handleRestartQuiz}
              >
                {lang === "ru" ? "Пройти снова" : "Play Again"}
              </button>

              <Link to="/quiz" className={styles.modalAction}>
                {lang === "ru" ? "В игровую комнату" : "Quiz Room"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}