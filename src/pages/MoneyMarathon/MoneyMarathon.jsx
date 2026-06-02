export function MoneyMarathon({ lang }) {
  return (
    <main>
      <h1>
        {lang === "ru"
          ? "Мир денег"
          : "Money Quiz"}
      </h1>

      <p>
        {lang === "ru"
          ? "История денег, интересные факты, рекорды и необычные валюты."
          : "Money history, interesting facts, records and unusual currencies."}
      </p>
    </main>
  );
}