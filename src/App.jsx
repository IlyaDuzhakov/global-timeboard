import "./App.css";
import ClockList from "./components/clocklist/ClockList";
import Form from "./components/form/Form";
import { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import WorldMap from "./components/map/WorldMap";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";
import OfflineNotice from "./components/OfflineNotice/OfflineNotice.jsx";
import PageLoader from "./components/PageLoader/PageLoader.jsx";
import MobileCountries from "./components/mobileCountries/MobileCountries";
import FoodQuiz from "./pages/FoodQuiz/FoodQuiz.jsx";
const CountryPage = lazy(() => import("./pages/CountryPage"));

const FlagQuizMenu = lazy(() =>
  import("./pages/FlagQuizMenu/FlagQuizMenu.jsx").then((module) => ({
    default: module.FlagQuizMenu,
  })),
);

const QuizRoom = lazy(() =>
  import("./pages/QuizRoom/QuizRoom.jsx").then((module) => ({
    default: module.QuizRoom,
  })),
);

const FlagQuiz = lazy(() =>
  import("./pages/FlagQuiz/FlagQuiz.jsx").then((module) => ({
    default: module.FlagQuiz,
  })),
);

const FlagRegionSelect = lazy(() =>
  import("./pages/FlagRegionSelect/FlagRegionSelect").then((module) => ({
    default: module.FlagRegionSelect,
  })),
);

const FlagLearn = lazy(() =>
  import("./pages/FlagLearn/FlagLearn").then((module) => ({
    default: module.FlagLearn,
  })),
);

const CapitalQuiz = lazy(() =>
  import("./pages/CapitalQuiz/CapitalQuiz.jsx").then((module) => ({
    default: module.CapitalQuiz,
  })),
);

const JuniorQuiz = lazy(() =>
  import("./pages/JuniorQuiz/JuniorQuiz.jsx").then((module) => ({
    default: module.JuniorQuiz,
  })),
);

const MiddleQuiz = lazy(() =>
  import("./pages/MiddleQuiz/MiddleQuiz.jsx").then((module) => ({
    default: module.MiddleQuiz,
  })),
);

const ExpertQuiz = lazy(() =>
  import("./pages/ExpertQuiz/ExpertQuiz.jsx").then((module) => ({
    default: module.ExpertQuiz,
  })),
);

const MarathonQuiz = lazy(() =>
  import("./pages/MarathonQuiz/MarathonQuiz.jsx").then((module) => ({
    default: module.MarathonQuiz,
  })),
);

const MoneyPage = lazy(() =>
  import("./pages/MoneyPage/MoneyPage.jsx").then((module) => ({
    default: module.MoneyPage,
  })),
);

const MoneyMarathon = lazy(() =>
  import("./pages/MoneyMarathon/MoneyMarathon.jsx").then((module) => ({
    default: module.MoneyMarathon,
  })),
);

const CurrencyQuiz = lazy(() =>
  import("./pages/CurrencyQuiz/CurrencyQuiz.jsx").then((module) => ({
    default: module.CurrencyQuiz,
  })),
);

const LandmarksPage = lazy(() =>
  import("./pages/Landmarks/LandmarksPage.jsx").then((module) => ({
    default: module.LandmarksPage,
  })),
);

const LandmarksQuiz = lazy(() =>
  import("./pages/Landmarks/LandmarksQuiz/LandmarksQuiz.jsx").then(
    (module) => ({
      default: module.LandmarksQuiz,
    }),
  ),
);

const AchievementsPage = lazy(() =>
  import("./pages/AchievementsPage/AchievementsPage").then((module) => ({
    default: module.AchievementsPage,
  })),
);

function App() {
  const [lang, setLang] = useState("ru");

  const [times, setTimes] = useState(() => {
    const saved = localStorage.getItem("savedTimes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedTimes", JSON.stringify(times));
  }, [times]);

  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  return (
    <>
      <OfflineNotice lang={lang} />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="App">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Header lang={lang} setLang={setLang} />

                  <div className="timePanel">
                    <Form
                      setTimes={setTimes}
                      times={times}
                      openModal={openModal}
                    />

                    <ClockList times={times} setTimes={setTimes} lang={lang} />
                  </div>
                  <div className="desktopMap">
                    <WorldMap
                      activeCountries={times.map((t) => t.country)}
                      lang={lang}
                      setLang={setLang}
                    />
                  </div>

                  <div className="mobileCountries">
                    <MobileCountries lang={lang} />
                  </div>
                  <Footer lang={lang} />
                  <Modal
                    isOpen={isModalOpen}
                    message={modalMessage}
                    onClose={closeModal}
                  />
                </div>
              </div>
            }
          />
          <Route path="/country/:id" element={<CountryPage lang={lang} />} />
          <Route path="/quiz" element={<QuizRoom lang={lang} />} />
          <Route path="/quiz/flags" element={<FlagQuizMenu lang={lang} />} />
          <Route
            path="/quiz/flags/play/:region"
            element={<FlagQuiz lang={lang} />}
          />
          <Route
            path="/quiz/flags/play"
            element={<FlagRegionSelect lang={lang} />}
          />
          <Route
            path="/quiz/flags/play"
            element={<FlagRegionSelect lang={lang} mode="play" />}
          />

          <Route
            path="/quiz/flags/learn"
            element={<FlagRegionSelect lang={lang} mode="learn" />}
          />
          <Route
            path="/quiz/flags/learn/:region"
            element={<FlagLearn lang={lang} />}
          />
          <Route
            path="/quiz/capitals/play/:region"
            element={<CapitalQuiz lang={lang} />}
          />
          <Route path="/quiz/food" element={<FoodQuiz lang={lang} />} />
          <Route path="/quiz/junior" element={<JuniorQuiz lang={lang} />} />
          <Route path="/quiz/middle" element={<MiddleQuiz lang={lang} />} />
          <Route path="/quiz/expert" element={<ExpertQuiz lang={lang} />} />
          <Route path="/quiz/marathon" element={<MarathonQuiz lang={lang} />} />
          <Route path="/money" element={<MoneyPage lang={lang} />} />
          <Route
            path="/money/marathon"
            element={<MoneyMarathon lang={lang} />}
          />
          <Route
            path="/money/currencies"
            element={<CurrencyQuiz lang={lang} />}
          />
          <Route
            path="/quiz/landmarks"
            element={<LandmarksPage lang={lang} />}
          />
          <Route
            path="/quiz/landmarks/play/:region"
            element={<LandmarksQuiz lang={lang} />}
          />

          <Route
            path="/quiz/achievements"
            element={<AchievementsPage lang={lang} />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
