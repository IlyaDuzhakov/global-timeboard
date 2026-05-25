import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>
          Created by <strong>Ilya Duzhakov</strong> — Global Timeboard
        </p>
        <p className={styles.date}>
          © {new Date().getFullYear()} • All rights reserved
        </p>
        <a className={styles.flaticon} href="https://www.flaticon.com/ru/free-icons/" title="глобус иконки">Глобус иконки от Creaticca Creative Agency - Flaticon</a> 
      </div>
    </footer>
  );
};

export default Footer;
