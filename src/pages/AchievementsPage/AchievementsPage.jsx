import { Link } from "react-router-dom";
import styles from "./AchievementsPage.module.css";

const achievements = [
  {
    title: "Флаги мира",
    key: "flagQuizBestScore-world-ru",
    total: 198,
    icon: "🚩",
    type: "number",
  },
  {
  title: "Флаги Европы",
  key: "flagQuizBestScore-europe-ru",
  total: 46,
  icon: "🇪🇺",
  type: "number",
},
{
  title: "Флаги Азии",
  key: "flagQuizBestScore-asia-ru",
  total: 49,
  icon: "🏯",
  type: "number",
},
{
  title: "Флаги Африки",
  key: "flagQuizBestScore-africa-ru",
  total: 54,
  icon: "🦁",
  type: "number",
},
{
  title: "Флаги Северной Америки",
  key: "flagQuizBestScore-north-america-ru",
  total: 23,
  icon: "🗽",
  type: "number",
},
{
  title: "Флаги Южной Америки",
  key: "flagQuizBestScore-south-america-ru",
  total: 12,
  icon: "🦙",
  type: "number",
},
{
  title: "Флаги Океании",
  key: "flagQuizBestScore-oceania-ru",
  total: 14,
  icon: "🦘",
  type: "number",
},
  {
    title: "Столицы мира",
    key: "global-timeboard-capital-world-ru-progress",
    total: 198,
    icon: "🏛️",
    type: "progress",
  },
  {
    title: "Валюты мира",
    key: "global-timeboard-currency-world-ru-progress",
    total: 189,
    icon: "💰",
    type: "progress",
  },
  {
    title: "Мир денег",
    key: "global-timeboard-money-world-ru-progress",
    total: 100,
    icon: "🤑",
    type: "progress",
  },
  {
    title: "Европа",
    key: "global-timeboard-landmarks-europe-progress",
    total: 40,
    icon: "🏰",
    type: "progress",
  },
  {
    title: "Азия",
    key: "global-timeboard-landmarks-asia-progress",
    total: 40,
    icon: "🛕",
    type: "progress",
  },
  {
    title: "Африка",
    key: "global-timeboard-landmarks-africa-progress",
    total: 40,
    icon: "🦁",
    type: "progress",
  },
  {
    title: "Северная Америка",
    key: "global-timeboard-landmarks-north-america-progress",
    total: 40,
    icon: "🗽",
    type: "progress",
  },
  {
    title: "Южная Америка",
    key: "global-timeboard-landmarks-south-america-progress",
    total: 40,
    icon: "🦙",
    type: "progress",
  },
  {
    title: "Океания",
    key: "global-timeboard-landmarks-oceania-progress",
    total: 40,
    icon: "🦘",
    type: "progress",
  },
  {
    title: "Junior",
    key: "global-timeboard-junior-progress",
    total: 40,
    icon: "🥉",
    type: "progress",
  },
  {
    title: "Middle",
    key: "global-timeboard-middle-progress",
    total: 40,
    icon: "🥈",
    type: "progress",
  },
  {
    title: "Expert",
    key: "global-timeboard-expert-progress",
    total: 40,
    icon: "🥇",
    type: "progress",
  },
  {
    title: "Marathon 100",
    key: "global-timeboard-marathon-progress",
    total: 100,
    icon: "🏆",
    type: "progress",
  },
  
];

function getScore(item) {
  const saved = localStorage.getItem(item.key);

  if (!saved) return 0;

  if (item.type === "number") {
    return Number(saved) || 0;
  }

  try {
    const parsed = JSON.parse(saved);
    return parsed.score || 0;
  } catch {
    return 0;
  }
}

function getMedal(percent) {
  if (percent >= 90) return "🥇";
  if (percent >= 70) return "🥈";
  if (percent >= 50) return "🥉";
  return "🔒";
}

export function AchievementsPage({ lang = "ru" }) {
  return (
    <main
      className={styles.achievementsPage}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/tropical-bg.jpg)`,
      }}
    >
      <section className={styles.panel}>
        <h1 className={styles.title}>
          {lang === "ru" ? "Зал достижений" : "Achievements Hall"}
        </h1>

        <div className={styles.grid}>
          {achievements.map((item) => {
            const score = getScore(item);
            const percent = Math.round((score / item.total) * 100);
            const medal = getMedal(percent);

            return (
              <article key={item.key} className={styles.card}>
                <div className={styles.icon}>{item.icon}</div>

                <h2>{item.title}</h2>

                <div className={styles.medal}>{medal}</div>

                <p>
                  {lang === "ru" ? "Результат" : "Result"}: {score} /{" "}
                  {item.total}
                </p>

                <p className={styles.percent}>{percent}%</p>
              </article>
            );
          })}
        </div>

        <Link to="/quiz" className={styles.backButton}>
          ← {lang === "ru" ? "В игровую комнату" : "Back to Quiz Room"}
        </Link>
      </section>
    </main>
  );
}