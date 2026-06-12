import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { middleQuizData } from "../../data/middleQuizData.js";
import styles from "./MiddleQuiz.module.css";

const STORAGE_KEY = "global-timeboard-middle-progress";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getSavedProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function MiddleQuiz({ lang = "ru" }) {
  const savedProgress = getSavedProgress();

  const [questions, setQuestions] = useState(() => {
    return savedProgress?.questions || shuffleArray(middleQuizData);
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

  const currentQuestion = questions[questionIndex];

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        questions,
        questionIndex,
        selectedAnswer,
        score,
      })
    );
  }, [questions, questionIndex, selectedAnswer, score]);

  if (!currentQuestion) {
    return (
      <h1
        className={styles.middleQuiz}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
        }}
      >
        Нет вопросов для Middle Quiz
      </h1>
    );
  }

  const isAnswered = selectedAnswer !== null;
  const correctAnswer = currentQuestion.correctAnswer[lang];
  const isCorrect = selectedAnswer === correctAnswer;
  const isLastQuestion = questionIndex === questions.length - 1;
  const isQuizFinished = isAnswered && isLastQuestion;
  const resultPercent = Math.round((score / questions.length) * 100);

  function handleAnswer(answer) {
    if (isAnswered) return;

    setSelectedAnswer(answer);

    if (answer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  function handleNextQuestion() {
    setSelectedAnswer(null);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  }

  function handleRestartQuiz() {
    localStorage.removeItem(STORAGE_KEY);

    setQuestions(shuffleArray(middleQuizData));
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
  }

  return (
    <main
      className={styles.middleQuiz}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.panel}>
        <h1 className={styles.title}>
          {lang === "ru" ? "Опытный Географ" : "Middle Geography"}
        </h1>

        <p className={styles.progress}>
          {lang === "ru" ? "Вопрос" : "Question"} {questionIndex + 1} /{" "}
          {questions.length}
        </p>

        <p className={styles.score}>
          {lang === "ru" ? "Счёт" : "Score"}: {score}
        </p>

        <h2 className={styles.question}>{currentQuestion.question[lang]}</h2>

        <div className={styles.optionsGrid}>
          {currentQuestion.options[lang].map((option) => (
            <button
              key={option}
              className={`${styles.optionButton} ${
                isAnswered && option === correctAnswer
                  ? styles.correctOption
                  : ""
              } ${
                isAnswered && option === selectedAnswer && option !== correctAnswer
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
                ? `❌ Неверно. Правильный ответ: ${correctAnswer}`
                : `❌ Wrong. Correct answer: ${correctAnswer}`}
            </p>

            {currentQuestion.fact && (
              <div className={styles.factBox}>
                <h3>
                  {lang === "ru" ? "Интересный факт:" : "Interesting fact:"}
                </h3>
                <p>{currentQuestion.fact[lang]}</p>
              </div>
            )}

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