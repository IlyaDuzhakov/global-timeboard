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

  useEffect(() => {
    function handleClick(event) {
      if (navigator.onLine) return;

      const link = event.target.closest("a");

      if (!link) return;

      event.preventDefault();

      window.location.href = `${process.env.PUBLIC_URL}/offline.html`;
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className={styles.offlineBanner}>
      <strong>
        📡{" "}
        {lang === "ru"
          ? "Нет подключения к интернету."
          : "No internet connection."}
      </strong>

      <span>
        {lang === "ru"
          ? " Некоторые функции могут быть недоступны"
          : " Some features may be unavailable"}
      </span>
    </div>
  );
}