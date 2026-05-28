import styles from "./Footer.module.css";
import { FaGithub, FaTelegramPlane, FaLinkedin } from "react-icons/fa";

import { SiThreads } from "react-icons/si";

const Footer = ({ lang }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.mainText}>
          {lang === "ru" ? "Создано" : "Created by"}{" "}
          <strong>Ilya Duzhakov</strong> — Global Timeboard
        </p>

        <p className={styles.date}>
          © {new Date().getFullYear()} •{" "}
          {lang === "ru" ? "Все права защищены" : "All rights reserved"}
        </p>

        <div className={styles.socials}>
          <a
            href="https://github.com/IlyaDuzhakov"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
          >
            <FaGithub />
          </a>

          <a
            href="https://t.me/Ilya_Duzhakov"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
          >
            <FaTelegramPlane />
          </a>

          <a
            href="https://www.threads.com/@ilyaduzhakov"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
          >
            <SiThreads />
          </a>

          <a
            href="https://www.linkedin.com/in/ilya-duzhakov-72a1b3409/"
            target="_blank"
            rel="noreferrer"
            className={styles.socialLink}
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
