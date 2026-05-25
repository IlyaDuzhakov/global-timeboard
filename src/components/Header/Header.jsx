import styles from "./Header.module.css";


const Header = () => {
  return (
    <div className={styles.header}>
      <img
  src={`${process.env.PUBLIC_URL}/img/globus.svg`}
  alt="Globe"
  className={styles.globe}
/>
      <div>
        <h1 className={styles.title}>Global Timeboard</h1>
        <h3 className={styles.subtitle}>Your interactive world clock & map</h3>
      </div>
    </div>
  );
};

export default Header;