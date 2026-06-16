import { useEffect, useState } from "react";
import styles from "./OfflineNotice.module.css";

export default function OfflineNotice({ lang = "ru" }) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    // const [isOnline] = useState(false);
    console.log("navigator.onLine =", navigator.onLine);

    

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

//   const handleOffline = () => {
//   console.log("OFFLINE EVENT");
//   setIsOnline(false);
// };

// const handleOnline = () => {
//   console.log("ONLINE EVENT");
//   setIsOnline(true);
// };

  return (
    <div className={styles.offlineBanner}>
      <strong>📡 {lang === "ru" ? "Нет подключения к интернету." : "No internet connection."}</strong>

      <span>
        {lang === "ru"
          ? " Некоторые функции могут быть недоступны"
          : " Some features may be unavailable"}
      </span>
    </div>
  );
}