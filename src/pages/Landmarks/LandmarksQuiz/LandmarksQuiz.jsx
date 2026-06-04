// import { useParams } from "react-router-dom";
import { europeLandmarks } from "../../../data/landmarks/europeLandmarks.js";
import styles from "./LandmarksQuiz.module.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
export function LandmarksQuiz({ lang }) {
  const { region } = useParams();

  const landmarksByRegion = {
    europe: europeLandmarks,
  };

  const regionLandmarks = landmarksByRegion[region] || europeLandmarks;

  const STORAGE_KEY = `global-timeboard-landmarks-${region}-progress`;
  const savedProgress = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const [questions] = useState(() => {
    if (savedProgress?.questions) {
      return savedProgress.questions;
    }

    return regionLandmarks.map((question) => ({
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

  const [score, setScore] = useState(savedProgress?.score || 0);

  const [selectedAnswer, setSelectedAnswer] = useState(
    savedProgress?.selectedAnswer || null,
  );
  const currentQuestion = questions[questionIndex];

  const shuffledOptions =
    currentQuestion.shuffledOptions?.[lang] || currentQuestion.options[lang];

  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer[lang];

  const isLastQuestion = questionIndex === questions.length - 1;
  const isQuizFinished = isLastQuestion && isAnswered;
  const percent = Math.round((score / questions.length) * 100);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        questionIndex,
        score,
        selectedAnswer,
        questions,
      }),
    );
  }, [questionIndex, score, selectedAnswer, questions]);

  function handleAnswer(option) {
    if (isAnswered) return;

    setSelectedAnswer(option);

    if (option === currentQuestion.correctAnswer[lang]) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  function handleNextQuestion() {
    setSelectedAnswer(null);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  }

 function handleRestartQuiz() {
  localStorage.removeItem(STORAGE_KEY);

  setQuestionIndex(0);
  setScore(0);
  setSelectedAnswer(null);
}
  return (
    <main
      className={styles.quizPage}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.quizCard}>
        {/* <h1 className={styles.title}>{currentQuestion.title[lang]}</h1> */}

        <div className={styles.quizInfo}>
          <p className={styles.progress}>
            {lang === "ru"
              ? `Вопрос ${questionIndex + 1} / ${europeLandmarks.length}`
              : `Question ${questionIndex + 1} / ${europeLandmarks.length}`}
          </p>

          <p className={styles.score}>
            {lang === "ru" ? `Счёт: ${score}` : `Score: ${score}`}
          </p>
        </div>

        <img className={styles.image} src={currentQuestion.image} alt="" />

        <p className={styles.description}>
          {currentQuestion.description[lang]}
        </p>

        <h2 className={styles.question}>{currentQuestion.question[lang]}</h2>

        <div className={styles.options}>
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
          <div className={styles.resultBox}>
            <p className={styles.resultText}>
              {isCorrect
                ? lang === "ru"
                  ? "✅ Верно!"
                  : "✅ Correct!"
                : lang === "ru"
                  ? `❌ Неверно. Правильный ответ: ${currentQuestion.correctAnswer[lang]}`
                  : `❌ Wrong. Correct answer: ${currentQuestion.correctAnswer[lang]}`}
            </p>

            <div className={styles.factBox}>
              <h3>{currentQuestion.factTitle[lang]}</h3>
              <p>{currentQuestion.fact[lang]}</p>
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
            <div className={styles.modalIcon}>🏆</div>

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
                {lang === "ru" ? " Пройти снова" : " Play Again"}
              </button>

              <Link to="/quiz/landmarks" className={styles.modalAction}>
                {lang === "ru" ? "К континентам" : "Continents"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
