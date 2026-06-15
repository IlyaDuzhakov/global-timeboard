import styles from "./PageLoader.module.css";

export default function PageLoader() {
  return (
    <div className={styles.loader}>
      <img
        src={`${process.env.PUBLIC_URL}/img/plane.svg`}
        alt="loading"
        className={styles.plane}
      />

      <h2>Global Timeboard</h2>

      <p>Loading...</p>
    </div>
  );
}