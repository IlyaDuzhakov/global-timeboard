import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { currencyQuizData } from "../../data/currencyQuizData";
import styles from "./CurrencyQuiz.module.css";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function CurrencyQuiz({ lang = "ru" }) {
    const STORAGE_KEY = "global-timeboard-currency-quiz-progress";
    const savedProgress = JSON.parse(localStorage.getItem(STORAGE_KEY));
  let questions;

if (savedProgress?.questions) {
  questions = savedProgress.questions;
} else {
  questions = shuffleArray(currencyQuizData);
}

  const [questionIndex, setQuestionIndex] = useState(
    savedProgress?.questionIndex || 0,
  );

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [score, setScore] = useState(savedProgress?.score || 0);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        questionIndex,
        score,
        questions,
      }),
    );
  }, [questionIndex, score, questions]);
  const currentQuestion = questions[questionIndex];

  if (!currentQuestion) {
    return <h1>Нет вопросов для Junior Quiz</h1>;
  }

  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer[lang];
  const isLastQuestion = questionIndex === questions.length - 1;

  function handleAnswer(answer) {
    if (isAnswered) return;

    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAnswer[lang]) {
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

  return (
    <main
      className={styles.currencyQuiz}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.panel}>
        <h1 className={styles.title}>
          {lang === "ru" ? "Валюты мира" : "World Currencies"}
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
                isAnswered && option === currentQuestion.correctAnswer[lang]
                  ? styles.correctOption
                  : ""
              } ${
                isAnswered &&
                option === selectedAnswer &&
                option !== currentQuestion.correctAnswer[lang]
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
                  ? `❌ Неверно. Правильный ответ: ${currentQuestion.correctAnswer[lang]}`
                  : `❌ Wrong. Correct answer: ${currentQuestion.correctAnswer[lang]}`}
            </p>

            {currentQuestion.fact && (
              <div className={styles.factBox}>
                <h3>
                  {lang === "ru" ? "Интересный факт:" : "Interesting fact:"}
                </h3>
                <p>{currentQuestion.fact[lang]}</p>
              </div>
            )}

            {!isLastQuestion ? (
              <button
                className={styles.nextButton}
                onClick={handleNextQuestion}
              >
                {lang === "ru" ? "Следующий вопрос →" : "Next question →"}
              </button>
            ) : (
              <div className={styles.finishBox}>
                <h2>{lang === "ru" ? "Квиз завершён!" : "Quiz completed!"}</h2>

                <p>
                  {lang === "ru"
                    ? `Результат: ${score} из ${questions.length}`
                    : `Result: ${score} out of ${questions.length}`}
                </p>

                <button
                  className={styles.nextButton}
                  onClick={handleRestartQuiz}
                >
                  {lang === "ru" ? "Сыграть ещё раз" : "Play again"}
                </button>
              </div>
            )}
          </div>
        )}
        <Link to="/quiz" className={styles.backButton}>
          {lang === "ru" ? "← Назад" : "← Back"}
        </Link>
      </section>
    </main>
  );
}
