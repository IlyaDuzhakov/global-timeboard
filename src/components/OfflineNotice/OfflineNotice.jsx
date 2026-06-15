import { useEffect, useState } from "react";
import styles from "./OfflineNotice.module.css";

export default function OfflineNotice({ lang = "ru" }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  return (
    <div className={styles.offlineBanner}>
      <strong>📡 {lang === "ru" ? "Нет подключения к интернету" : "No internet connection"}</strong>

      <span>
        {lang === "ru"
          ? " Некоторые функции могут быть недоступны"
          : " Some features may be unavailable"}
      </span>
    </div>
  );
}