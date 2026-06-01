import "./App.css";
import ClockList from "./components/clocklist/ClockList";
import Form from "./components/form/Form";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import WorldMap from "./components/map/WorldMap";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";
import MobileCountries from "./components/mobileCountries/MobileCountries";
import CountryPage from "./pages/CountryPage";
import { FlagQuizMenu } from "./pages/FlagQuizMenu/FlagQuizMenu.jsx";
import { QuizRoom } from "./pages/QuizRoom/QuizRoom.jsx";
import { FlagQuiz } from "./pages/FlagQuiz/FlagQuiz.jsx";
import { FlagRegionSelect } from "./pages/FlagRegionSelect/FlagRegionSelect";
import { FlagLearn } from "./pages/FlagLearn/FlagLearn";
import { CapitalQuiz } from "./pages/CapitalQuiz/CapitalQuiz.jsx";
import { JuniorQuiz } from "./pages/JuniorQuiz/JuniorQuiz.jsx";

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
                <Form setTimes={setTimes} times={times} openModal={openModal} />

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
      <Route path="/quiz/junior" element={<JuniorQuiz lang={lang} />} />
    </Routes>
  );
}

export default App;
