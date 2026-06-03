import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { moneyMarathon } from "../../data/moneyMarathon.js";
import styles from "./MoneyMarathon.module.css";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function MoneyMarathon({ lang = "ru" }) {
  const STORAGE_KEY = "global-timeboard-money-marathon-progress";
  const savedProgress = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const [questions] = useState(() => {
    if (savedProgress?.questions) {
      return savedProgress.questions;
    }

    return shuffleArray(moneyMarathon).map((question) => ({
      ...question,
      shuffledOptions: {
        ru: shuffleArray(question.options.ru),
        en: shuffleArray(question.options.en),
      },
    }));
  });

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

  const shuffledOptions =
    currentQuestion?.shuffledOptions?.[lang] ||
    currentQuestion?.options?.[lang];
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

  const percent = Math.round((score / questions.length) * 100);
  const rank = getCurrencyRank(score, questions.length);

  function getCurrencyRank(score, total) {
    const percent = Math.round((score / total) * 100);

    if (percent >= 95) return "🌍 Легенда мировых валют";
    if (percent >= 85) return "💰 Валютный эксперт";
    if (percent >= 70) return "🧭 Знаток стран и валют";
    if (percent >= 50) return "🎒 Путешественник";
    return "📚 Новичок в мире валют";
  }

  return (
    <main
      className={styles.moneyMarathon}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.panel}>
        <h1 className={styles.title}>
          {lang === "ru" ? "💰 Денежный марафон" : "💰 Money Marathon"}
        </h1>

        <p className={styles.progress}>
          {lang === "ru" ? "Вопрос" : "Question"} {questionIndex + 1} /{" "}
          {questions.length}
        </p>

        <p className={styles.score}>
          {lang === "ru" ? "Счёт" : "Score"}: {score}
        </p>

        {currentQuestion.title && (
          <h2 className={styles.storyTitle}>{currentQuestion.title[lang]}</h2>
        )}

        {currentQuestion.description && (
          <p className={styles.description}>
            {currentQuestion.description[lang]}
          </p>
        )}

        <h3 className={styles.question}>{currentQuestion.question[lang]}</h3>
        <div className={styles.optionsGrid}>
          {shuffledOptions.map((option) => (
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
                <h3>{currentQuestion.factTitle?.[lang]}</h3>

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
              <div className={styles.finishModalOverlay}>
                <div className={styles.finishModal}>
                  <div className={styles.trophy}>🏆</div>

                  <h2>
                    {lang === "ru" ? "Квиз завершён!" : "Quiz completed!"}
                  </h2>

                  <p className={styles.finalScore}>
                    {lang === "ru"
                      ? `Результат: ${score} из ${questions.length}`
                      : `Result: ${score} out of ${questions.length}`}
                  </p>

                  <p className={styles.finalPercent}>{percent}%</p>

                  <p className={styles.rank}>{rank}</p>

                  <div className={styles.modalButtons}>
                    <button
                      className={styles.modalAction}
                      onClick={handleRestartQuiz}
                    >
                      {lang === "ru" ? "Пройти снова" : "Play again"}
                    </button>

                    <Link to="/money" className={styles.modalAction}>
                      {lang === "ru" ? "В меню" : "Menu"}
                    </Link>
                  </div>
                </div>
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
