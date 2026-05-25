import './App.css';
import ClockList from './components/clocklist/ClockList';
import Form from './components/form/Form';
import { useState, useEffect } from 'react'
import WorldMap from './components/map/WorldMap';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from "./components/Modal/Modal";


function App() {

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
    <div className="App">
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <Header />
        <Form setTimes={setTimes} times={times} openModal={openModal}/>
       <ClockList times={times} setTimes={setTimes}/>
       <WorldMap activeCountries={times.map(t => t.country)} />
       <Footer />
       <Modal
  isOpen={isModalOpen}
  message={modalMessage}
  onClose={closeModal}
/>
       </div>
    </div>
  );
}

export default App;
