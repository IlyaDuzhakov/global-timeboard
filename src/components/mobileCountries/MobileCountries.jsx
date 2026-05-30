import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MobileCountries.module.css";

const continents = [
  { key: "asia", icon: "🌏", ru: "Азия", en: "Asia" },
  { key: "europe", icon: "🏰", ru: "Европа", en: "Europe" },
  { key: "africa", icon: "🦁", ru: "Африка", en: "Africa" },
  {
    key: "north-america",
    icon: "🗽",
    ru: "Северная Америка",
    en: "North America",
  },
  {
    key: "south-america",
    icon: "🌴",
    ru: "Южная Америка",
    en: "South America",
  },
  { key: "oceania", icon: "🌊", ru: "Океания", en: "Oceania" },
  { key: "antarctica", icon: "❄️", ru: "Антарктида", en: "Antarctica" },
];

const countriesByContinent = {
  asia: [
    { ru: "Китай", en: "China", slug: "china" },
    { ru: "Япония", en: "Japan", slug: "japan" },
    { ru: "Южная Корея", en: "South Korea", slug: "south-korea" },
    { ru: "Северная Корея", en: "North Korea", slug: "north-korea" },
    { ru: "Индия", en: "India", slug: "india" },
    { ru: "Пакистан", en: "Pakistan", slug: "pakistan" },
    { ru: "Бангладеш", en: "Bangladesh", slug: "bangladesh" },
    { ru: "Непал", en: "Nepal", slug: "nepal" },
    { ru: "Бутан", en: "Bhutan", slug: "bhutan" },
    { ru: "Шри-Ланка", en: "Sri Lanka", slug: "sri-lanka" },
    { ru: "Мальдивы", en: "Maldives", slug: "maldives" },
    { ru: "Афганистан", en: "Afghanistan", slug: "afghanistan" },
    { ru: "Казахстан", en: "Kazakhstan", slug: "kazakhstan" },
    { ru: "Узбекистан", en: "Uzbekistan", slug: "uzbekistan" },
    { ru: "Туркменистан", en: "Turkmenistan", slug: "turkmenistan" },
    { ru: "Кыргызстан", en: "Kyrgyzstan", slug: "kyrgyzstan" },
    { ru: "Таджикистан", en: "Tajikistan", slug: "tajikistan" },
    { ru: "Монголия", en: "Mongolia", slug: "mongolia" },
    { ru: "Таиланд", en: "Thailand", slug: "thailand" },
    { ru: "Вьетнам", en: "Vietnam", slug: "vietnam" },
    { ru: "Лаос", en: "Laos", slug: "laos" },
    { ru: "Камбоджа", en: "Cambodia", slug: "cambodia" },
    { ru: "Мьянма", en: "Myanmar", slug: "myanmar" },
    { ru: "Малайзия", en: "Malaysia", slug: "malaysia" },
    { ru: "Сингапур", en: "Singapore", slug: "singapore" },
    { ru: "Индонезия", en: "Indonesia", slug: "indonesia" },
    { ru: "Филиппины", en: "Philippines", slug: "philippines" },
    { ru: "Бруней", en: "Brunei", slug: "brunei" },
    { ru: "Восточный Тимор", en: "Timor-Leste", slug: "timor-leste" },
    { ru: "Тайвань", en: "Taiwan", slug: "taiwan" },
    { ru: "Турция", en: "Turkey", slug: "turkey" },
    { ru: "Иран", en: "Iran", slug: "iran" },
    { ru: "Ирак", en: "Iraq", slug: "iraq" },
    { ru: "Сирия", en: "Syria", slug: "syria" },
    { ru: "Ливан", en: "Lebanon", slug: "lebanon" },
    { ru: "Иордания", en: "Jordan", slug: "jordan" },
    { ru: "Израиль", en: "Israel", slug: "israel" },
    { ru: "Палестина", en: "Palestine", slug: "palestine" },
    { ru: "Саудовская Аравия", en: "Saudi Arabia", slug: "saudi-arabia" },
    {
      ru: "Объединённые Арабские Эмираты",
      en: "United Arab Emirates",
      slug: "united-arab-emirates",
    },
    { ru: "Катар", en: "Qatar", slug: "qatar" },
    { ru: "Кувейт", en: "Kuwait", slug: "kuwait" },
    { ru: "Бахрейн", en: "Bahrain", slug: "bahrain" },
    { ru: "Оман", en: "Oman", slug: "oman" },
    { ru: "Йемен", en: "Yemen", slug: "yemen" },
    { ru: "Армения", en: "Armenia", slug: "armenia" },
    { ru: "Азербайджан", en: "Azerbaijan", slug: "azerbaijan" },
    { ru: "Грузия", en: "Georgia", slug: "georgia" },
  ],
  europe: [
    { ru: "Франция", en: "France", slug: "france" },
    { ru: "Германия", en: "Germany", slug: "germany" },
    { ru: "Италия", en: "Italy", slug: "italy" },
    { ru: "Испания", en: "Spain", slug: "spain" },
    { ru: "Португалия", en: "Portugal", slug: "portugal" },
    { ru: "Великобритания", en: "United Kingdom", slug: "united-kingdom" },
    { ru: "Ирландия", en: "Ireland", slug: "ireland" },
    { ru: "Нидерланды", en: "Netherlands", slug: "netherlands" },
    { ru: "Бельгия", en: "Belgium", slug: "belgium" },
    { ru: "Швейцария", en: "Switzerland", slug: "switzerland" },
    { ru: "Австрия", en: "Austria", slug: "austria" },
    { ru: "Польша", en: "Poland", slug: "poland" },
    { ru: "Чехия", en: "Czech Republic", slug: "czech-republic" },
    { ru: "Словакия", en: "Slovakia", slug: "slovakia" },
    { ru: "Венгрия", en: "Hungary", slug: "hungary" },
    { ru: "Румыния", en: "Romania", slug: "romania" },
    { ru: "Болгария", en: "Bulgaria", slug: "bulgaria" },
    { ru: "Греция", en: "Greece", slug: "greece" },
    { ru: "Сербия", en: "Serbia", slug: "serbia" },
    { ru: "Хорватия", en: "Croatia", slug: "croatia" },
    { ru: "Словения", en: "Slovenia", slug: "slovenia" },
    {
      ru: "Босния и Герцеговина",
      en: "Bosnia and Herzegovina",
      slug: "bosnia-and-herzegovina",
    },
    { ru: "Черногория", en: "Montenegro", slug: "montenegro" },
    {
      ru: "Северная Македония",
      en: "North Macedonia",
      slug: "north-macedonia",
    },
    { ru: "Албания", en: "Albania", slug: "albania" },
    { ru: "Норвегия", en: "Norway", slug: "norway" },
    { ru: "Швеция", en: "Sweden", slug: "sweden" },
    { ru: "Финляндия", en: "Finland", slug: "finland" },
    { ru: "Дания", en: "Denmark", slug: "denmark" },
    { ru: "Исландия", en: "Iceland", slug: "iceland" },
    { ru: "Эстония", en: "Estonia", slug: "estonia" },
    { ru: "Латвия", en: "Latvia", slug: "latvia" },
    { ru: "Литва", en: "Lithuania", slug: "lithuania" },
    { ru: "Беларусь", en: "Belarus", slug: "belarus" },
    { ru: "Украина", en: "Ukraine", slug: "ukraine" },
    { ru: "Молдова", en: "Moldova", slug: "moldova" },
    { ru: "Россия", en: "Russia", slug: "russia" },
    { ru: "Люксембург", en: "Luxembourg", slug: "luxembourg" },
    { ru: "Монако", en: "Monaco", slug: "monaco" },
    { ru: "Лихтенштейн", en: "Liechtenstein", slug: "liechtenstein" },
    { ru: "Андорра", en: "Andorra", slug: "andorra" },
    { ru: "Сан-Марино", en: "San Marino", slug: "san-marino" },
    { ru: "Ватикан", en: "Vatican City", slug: "vatican-city" },
    { ru: "Мальта", en: "Malta", slug: "malta" },
    { ru: "Кипр", en: "Cyprus", slug: "cyprus" },
  ],
  africa: [
    { ru: "Алжир", en: "Algeria", slug: "algeria" },
    { ru: "Ангола", en: "Angola", slug: "angola" },
    { ru: "Бенин", en: "Benin", slug: "benin" },
    { ru: "Ботсвана", en: "Botswana", slug: "botswana" },
    { ru: "Буркина-Фасо", en: "Burkina Faso", slug: "burkina-faso" },
    { ru: "Бурунди", en: "Burundi", slug: "burundi" },
    { ru: "Кабо-Верде", en: "Cape Verde", slug: "cape-verde" },
    { ru: "Камерун", en: "Cameroon", slug: "cameroon" },
    {
      ru: "Центральноафриканская Республика",
      en: "Central African Republic",
      slug: "central-african-republic",
    },
    { ru: "Чад", en: "Chad", slug: "chad" },
    { ru: "Коморы", en: "Comoros", slug: "comoros" },
    {
      ru: "Демократическая Республика Конго",
      en: "Democratic Republic of the Congo",
      slug: "democratic-republic-of-the-congo",
    },
    {
      ru: "Республика Конго",
      en: "Republic of the Congo",
      slug: "republic-of-the-congo",
    },
    { ru: "Джибути", en: "Djibouti", slug: "djibouti" },
    { ru: "Египет", en: "Egypt", slug: "egypt" },
    {
      ru: "Экваториальная Гвинея",
      en: "Equatorial Guinea",
      slug: "equatorial-guinea",
    },
    { ru: "Эритрея", en: "Eritrea", slug: "eritrea" },
    { ru: "Эсватини", en: "Eswatini", slug: "eswatini" },
    { ru: "Эфиопия", en: "Ethiopia", slug: "ethiopia" },
    { ru: "Габон", en: "Gabon", slug: "gabon" },
    { ru: "Гамбия", en: "Gambia", slug: "gambia" },
    { ru: "Гана", en: "Ghana", slug: "ghana" },
    { ru: "Гвинея", en: "Guinea", slug: "guinea" },
    { ru: "Гвинея-Бисау", en: "Guinea-Bissau", slug: "guinea-bissau" },
    { ru: "Кот-д’Ивуар", en: "Ivory Coast", slug: "ivory-coast" },
    { ru: "Кения", en: "Kenya", slug: "kenya" },
    { ru: "Лесото", en: "Lesotho", slug: "lesotho" },
    { ru: "Либерия", en: "Liberia", slug: "liberia" },
    { ru: "Ливия", en: "Libya", slug: "libya" },
    { ru: "Мадагаскар", en: "Madagascar", slug: "madagascar" },
    { ru: "Малави", en: "Malawi", slug: "malawi" },
    { ru: "Мали", en: "Mali", slug: "mali" },
    { ru: "Мавритания", en: "Mauritania", slug: "mauritania" },
    { ru: "Маврикий", en: "Mauritius", slug: "mauritius" },
    { ru: "Марокко", en: "Morocco", slug: "morocco" },
    { ru: "Мозамбик", en: "Mozambique", slug: "mozambique" },
    { ru: "Намибия", en: "Namibia", slug: "namibia" },
    { ru: "Нигер", en: "Niger", slug: "niger" },
    { ru: "Нигерия", en: "Nigeria", slug: "nigeria" },
    { ru: "Руанда", en: "Rwanda", slug: "rwanda" },
    {
      ru: "Сан-Томе и Принсипи",
      en: "Sao Tome and Principe",
      slug: "sao-tome-and-principe",
    },
    { ru: "Сенегал", en: "Senegal", slug: "senegal" },
    { ru: "Сейшелы", en: "Seychelles", slug: "seychelles" },
    { ru: "Сьерра-Леоне", en: "Sierra Leone", slug: "sierra-leone" },
    { ru: "Сомали", en: "Somalia", slug: "somalia" },
    {
      ru: "Южно-Африканская Республика",
      en: "South Africa",
      slug: "south-africa",
    },
    { ru: "Южный Судан", en: "South Sudan", slug: "south-sudan" },
    { ru: "Судан", en: "Sudan", slug: "sudan" },
    { ru: "Танзания", en: "Tanzania", slug: "tanzania" },
    { ru: "Того", en: "Togo", slug: "togo" },
    { ru: "Тунис", en: "Tunisia", slug: "tunisia" },
    { ru: "Уганда", en: "Uganda", slug: "uganda" },
    { ru: "Замбия", en: "Zambia", slug: "zambia" },
    { ru: "Зимбабве", en: "Zimbabwe", slug: "zimbabwe" },
  ],
  "north-america": [
    { ru: "Канада", en: "Canada", slug: "canada" },
    { ru: "США", en: "United States", slug: "united-states" },
    { ru: "Мексика", en: "Mexico", slug: "mexico" },
    { ru: "Гватемала", en: "Guatemala", slug: "guatemala" },
    { ru: "Белиз", en: "Belize", slug: "belize" },
    { ru: "Сальвадор", en: "El Salvador", slug: "el-salvador" },
    { ru: "Гондурас", en: "Honduras", slug: "honduras" },
    { ru: "Никарагуа", en: "Nicaragua", slug: "nicaragua" },
    { ru: "Коста-Рика", en: "Costa Rica", slug: "costa-rica" },
    { ru: "Панама", en: "Panama", slug: "panama" },
    { ru: "Куба", en: "Cuba", slug: "cuba" },
    { ru: "Ямайка", en: "Jamaica", slug: "jamaica" },
    { ru: "Гаити", en: "Haiti", slug: "haiti" },
    {
      ru: "Доминиканская Республика",
      en: "Dominican Republic",
      slug: "dominican-republic",
    },
    { ru: "Багамы", en: "Bahamas", slug: "bahamas" },
    { ru: "Барбадос", en: "Barbados", slug: "barbados" },
    {
      ru: "Тринидад и Тобаго",
      en: "Trinidad and Tobago",
      slug: "trinidad-and-tobago",
    },
    {
      ru: "Антигуа и Барбуда",
      en: "Antigua and Barbuda",
      slug: "antigua-and-barbuda",
    },
    {
      ru: "Сент-Китс и Невис",
      en: "Saint Kitts and Nevis",
      slug: "saint-kitts-and-nevis",
    },
    { ru: "Доминика", en: "Dominica", slug: "dominica" },
    { ru: "Сент-Люсия", en: "Saint Lucia", slug: "saint-lucia" },
    {
      ru: "Сент-Винсент и Гренадины",
      en: "Saint Vincent and the Grenadines",
      slug: "saint-vincent-and-the-grenadines",
    },
    { ru: "Гренада", en: "Grenada", slug: "grenada" },
  ],
  "south-america": [
    { ru: "Аргентина", en: "Argentina", slug: "argentina" },
    { ru: "Боливия", en: "Bolivia", slug: "bolivia" },
    { ru: "Бразилия", en: "Brazil", slug: "brazil" },
    { ru: "Чили", en: "Chile", slug: "chile" },
    { ru: "Колумбия", en: "Colombia", slug: "colombia" },
    { ru: "Эквадор", en: "Ecuador", slug: "ecuador" },
    { ru: "Гайана", en: "Guyana", slug: "guyana" },
    { ru: "Парагвай", en: "Paraguay", slug: "paraguay" },
    { ru: "Перу", en: "Peru", slug: "peru" },
    { ru: "Суринам", en: "Suriname", slug: "suriname" },
    { ru: "Уругвай", en: "Uruguay", slug: "uruguay" },
    { ru: "Венесуэла", en: "Venezuela", slug: "venezuela" },
  ],
  oceania: [
    { ru: "Австралия", en: "Australia", slug: "australia" },
    { ru: "Новая Зеландия", en: "New Zealand", slug: "new-zealand" },
    { ru: "Фиджи", en: "Fiji", slug: "fiji" },
    {
      ru: "Папуа — Новая Гвинея",
      en: "Papua New Guinea",
      slug: "papua-new-guinea",
    },
    { ru: "Самоа", en: "Samoa", slug: "samoa" },
    { ru: "Тонга", en: "Tonga", slug: "tonga" },
    { ru: "Вануату", en: "Vanuatu", slug: "vanuatu" },
    {
      ru: "Соломоновы Острова",
      en: "Solomon Islands",
      slug: "solomon-islands",
    },
    { ru: "Кирибати", en: "Kiribati", slug: "kiribati" },
    { ru: "Тувалу", en: "Tuvalu", slug: "tuvalu" },
    { ru: "Науру", en: "Nauru", slug: "nauru" },
    { ru: "Палау", en: "Palau", slug: "palau" },
    {
      ru: "Маршалловы Острова",
      en: "Marshall Islands",
      slug: "marshall-islands",
    },
    {
      ru: "Федеративные Штаты Микронезии",
      en: "Micronesia",
      slug: "micronesia",
    },
  ],
  antarctica: [{ ru: "Антарктида", en: "Antarctica", slug: "antarctica" }],
};

export default function MobileCountries({ lang }) {
  const [selectedContinent, setSelectedContinent] = useState(null);

  return (
    <section className={styles.mobileCountries}>
      <h2>{lang === "ru" ? "Страны мира" : "World Countries"}</h2>

      <p>
        {lang === "ru"
          ? "Выберите континент, чтобы открыть список стран"
          : "Choose a continent to open the country list"}
      </p>

      <div className={styles.continentGrid}>
        {continents.map((continent) => (
          <button
            key={continent.key}
            onClick={() => setSelectedContinent(continent.key)}
          >
            {continent.icon} {lang === "ru" ? continent.ru : continent.en}
          </button>
        ))}
      </div>
      <Link to="/quiz" className={styles.quizRoomButton}>
        <img
          src="/global-timeboard/icons/quiz-room.svg"
          alt="Quiz Room"
          className={styles.quizRoomIcon}
        />
        <h1 className={styles.quizTitle}>
          {lang === "ru" ? "Игровая комната" : "Quiz Room"}
        </h1>
      </Link>

      {selectedContinent && (
        <div className={styles.countryList}>
          <h3>{lang === "ru" ? "Страны" : "Countries"}</h3>

          <div className={styles.countryGrid}>
            {countriesByContinent[selectedContinent]?.map((country) => (
              <Link
                key={country.slug}
                to={`/country/${country.slug}`}
                className={styles.countryLink}
              >
                {country[lang]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
