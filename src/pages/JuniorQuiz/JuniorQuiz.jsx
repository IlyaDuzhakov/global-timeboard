import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { juniorQuizData } from "../../data/juniorQuizData";
import styles from "./JuniorQuiz.module.css";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function JuniorQuiz({ lang = "ru" }) {
  const questions = useMemo(() => {
    return shuffleArray(juniorQuizData);
  }, []);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

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
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
  }

  return (
    <main
      className={styles.juniorQuiz}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.panel}>
        <h1 className={styles.title}>
          {lang === "ru" ? "Junior Geography" : "Junior Geography"}
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
                <h1>Интереcный факт:
                <p className={styles.factBox}>{currentQuestion.fact?.[lang]}</p>
                </h1>
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
