import styles from "./Header.module.css";

const Header = ({ lang, setLang }) => {
  return (
    <div className={styles.header}>
      <img
        src={`${process.env.PUBLIC_URL}/img/globus.svg`}
        alt="Globe"
        className={styles.globe}
      />

      <div>
        <h1 className={styles.title}>Global Timeboard</h1>

        <h3 className={styles.subtitle}>
          Your interactive world clock & map
        </h3>
      </div>

      <div className={styles.langSwitcher}>
        <button onClick={() => setLang("ru")}>RU</button>

        <button onClick={() => setLang("en")}>EN</button>
      </div>
    </div>
  );
};

export default Header;