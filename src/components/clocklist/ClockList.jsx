import AnalogClock from "../analogclock/AnalogClock";
import { useState, useEffect } from "react";
import { getTimeForZone } from "../../utils/getTimeForZone";
import styles from "./ClockList.module.css";

const ClockList = ({ times, setTimes, lang }) => {
  
  const [, setTick] = useState(0); // так можно делать в реакт

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1); // просто триггер ререндера
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (times.length === 0) {
    return (
      <>
    <h2 className={styles.listClock}>
      {lang === "ru" ? "Часы не добавлены" : "No clocks added"}
    </h2>

    <p className={styles.emptySubtitle}>
      {lang === "ru"
        ? "Добавьте до 10 мировых часов"
        : "Add up to 10 world clocks"}
    </p>
  </>
    );
  }

  const handleDelete = (indexToDelete) => {
    setTimes((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  return (
    <div className={styles.clockWrapper}>
      <div className={styles.clockBoard}>
        {times.map((el, index) => {
          const time = getTimeForZone(el.zone);
          if (!time) return null;

          const clockAngles = {
            hour: (time.hours % 12) * 30 + time.minutes * 0.5,
            minute: time.minutes * 6,
            second: time.seconds * 6,
          };

          return (
            <AnalogClock
              key={index}
              time={clockAngles}
              title={el.title}
              onDelete={() => handleDelete(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClockList;
