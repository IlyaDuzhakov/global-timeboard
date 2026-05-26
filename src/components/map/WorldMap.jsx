import React, { useState, useEffect, useRef } from "react";
import { geoPath, geoEqualEarth } from "d3-geo";
import { feature } from "topojson-client";
import world from "../../utils/world.json";
import { countryInfo } from "../../utils/countryData";
import styles from "./WorldMap.module.css";
import { useNavigate } from "react-router-dom";

export default function WorldMap({ activeCountries = [], lang, setLang }) {
  const [tooltip, setTooltip] = useState(null);
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(null);

  const projection = geoEqualEarth().scale(195).translate([480, 250]);

  const pathGenerator = geoPath().projection(projection);
  const countries = feature(world, world.objects.countries).features;

  const svgRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (svgRef.current && !svgRef.current.contains(e.target)) {
        setTooltip(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const getText = (value) => {
    if (!value) return "—";

    if (typeof value === "string" || typeof value === "number") {
      return value;
    }

    return value[lang] || "—";
  };

  const labeledCountries = [
    "Russia",
    "China",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Japan",
    "India",
    "Brazil",
    "Canada",
    "Australia",
    "Mexico",
    "Argentina",
    "Kazakhstan",
    "Mongolia",
    "Turkey",
    "Egypt",
    "Iran",
    "Iraq",
    "Greenland",
    "Madagascar",
    "South Africa",
    "Antarctica",

    // Europe
    "United Kingdom",
    "Poland",
    "Ukraine",
    "Norway",
    "Sweden",
    "Finland",
    "Greece",
    "Portugal",
    "Romania",
    "Iceland",

    // Asia
    "Saudi Arabia",
    "Pakistan",
    "Afghanistan",
    "Thailand",
    "Vietnam",
    "Indonesia",
    "Malaysia",
    "Philippines",
    "South Korea",
    "North Korea",
    "Sri Lanka",

    // Africa
    "Algeria",
    "Libya",
    "Sudan",
    "Chad",
    "Mali",
    "Nigeria",
    "Ethiopia",
    "Morocco",
    "Angola",
    "Kenya",
    "Somalia",
    "Democratic Republic of the Congo",

    // North America
    "United States of America",
    "Cuba",
    "Guatemala",
    "Panama",

    // South America
    "Chile",
    "Peru",
    "Colombia",
    "Bolivia",
    "Venezuela",
    "Paraguay",
    "Uruguay",
    "Ecuador",

    // Oceania
    "New Zealand",
    "Papua New Guinea",
    "Fiji",
  ];

  const countryLabels = {
    // Eurasia
    Russia: "Россия",
    China: "Китай",
    India: "Индия",
    Kazakhstan: "Казахстан",
    Mongolia: "Монголия",
    Japan: "Япония",
    "South Korea": "Южная Корея",
    "North Korea": "Северная Корея",
    Turkey: "Турция",
    Iran: "Иран",
    Iraq: "Ирак",
    "Saudi Arabia": "Саудовская Аравия",
    Pakistan: "Пакистан",
    Afghanistan: "Афганистан",
    Thailand: "Таиланд",
    Vietnam: "Вьетнам",
    Indonesia: "Индонезия",
    Malaysia: "Малайзия",
    Philippines: "Филиппины",
    "Sri Lanka": "Шри-Ланка",

    // Europe
    "United Kingdom": "Великобритания",
    Germany: "Германия",
    France: "Франция",
    Italy: "Италия",
    Spain: "Испания",
    Poland: "Польша",
    Ukraine: "Украина",
    Norway: "Норвегия",
    Sweden: "Швеция",
    Finland: "Финляндия",
    Greece: "Греция",
    Portugal: "Португалия",
    Romania: "Румыния",
    Iceland: "Исландия",

    // Africa
    Egypt: "Египет",
    Algeria: "Алжир",
    Libya: "Ливия",
    Sudan: "Судан",
    Chad: "Чад",
    Mali: "Мали",
    Nigeria: "Нигерия",
    Ethiopia: "Эфиопия",
    Morocco: "Марокко",
    Angola: "Ангола",
    Kenya: "Кения",
    Somalia: "Сомали",
    Madagascar: "Мадагаскар",
    "South Africa": "ЮАР",
    "Democratic Republic of the Congo": "ДР Конго",

    // North America
    "United States of America": "США",
    Canada: "Канада",
    Mexico: "Мексика",
    Cuba: "Куба",
    Greenland: "Гренландия",
    Guatemala: "Гватемала",
    Panama: "Панама",

    // South America
    Brazil: "Бразилия",
    Argentina: "Аргентина",
    Chile: "Чили",
    Peru: "Перу",
    Colombia: "Колумбия",
    Bolivia: "Боливия",
    Venezuela: "Венесуэла",
    Paraguay: "Парагвай",
    Uruguay: "Уругвай",
    Ecuador: "Эквадор",

    // Oceania
    Australia: "Австралия",
    "New Zealand": "Новая Зеландия",
    "Papua New Guinea": "Папуа — Новая Гвинея",
    Fiji: "Фиджи",

    // Other
    Antarctica: "Антарктида",
  };

  const handleClick = (geo) => {
    const name = geo.properties.name || "Неизвестная страна";
    // console.log("activeCountries:", activeCountries);
    // console.log("map country name:", name);
    const info = countryInfo[name];
    // console.log("INFO:", info);
    setTooltip({
      id: info?.id,
      name: info?.name || name,
      flag: info?.flag || "🌍",
      capital: info?.capital || "N/A",
      area: info?.area || "N/A",
      population: info?.population || "N/A",
      timezone: info?.timezone || "N/A",
      currency: info?.currency || "N/A",
      government: info?.government || "—",
      language: info?.language || "—",
    });
  };
  function getColorByArea(area, countryName) {
    if (countryName === "Antarctica") return "#ffffff";
    if (!area || isNaN(area)) return "#ccc";
    if (area < 450000) return "#25C31A";
    if (area < 900000) return "#0C8603";
    if (area < 1500000) return "#F8D134";
    if (area < 2500000) return "#B67616";
    if (area < 5000000) return "#E964A2";
    return "#FD3C3C";
  }

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <div className={styles.oceanLabels}>
        <span className={styles.pacificOcean}>Pacific Ocean</span>
        <span className={styles.atlanticOcean}>Atlantic Ocean</span>
        <span className={styles.indianOcean}>Indian Ocean</span>
        <span className={styles.arcticOcean}>Arctic Ocean</span>
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 960 500"
        width="100%"
        height="700px"
        style={{
          maxWidth: "100%",
          display: "block",
          margin: "0 auto",
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        {countries.map((geo, index) => {
          const name = geo.properties.name || "Unknown";
          const info = countryInfo[name];
          const area = Number(info?.area); // area как число
          const fillColor = getColorByArea(area, name);
          const isHovered = hovered === index;
          const centroid = pathGenerator.centroid(geo);
          const isActive = activeCountries.includes(name); // текущая страна активна?

          return (
            <g key={index}>
              <path
                d={pathGenerator(geo)}
                fill={isHovered ? "#FF5722" : fillColor}
                stroke="#fff"
                style={{ cursor: "pointer", transition: "fill 0.2s" }}
                onClick={() => handleClick(geo)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              />
              {isActive && (
                <circle
                  cx={centroid[0]}
                  cy={centroid[1]}
                  r={4}
                  fill="#000DFF"
                  stroke="#fff"
                  strokeWidth={1.5}
                  pointerEvents="none"
                />
              )}
              {labeledCountries.includes(name) && (
                <text
                  x={centroid[0]}
                  y={centroid[1]}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#000"
                  style={{ pointerEvents: "none", fontWeight: "bold" }}
                >
                  {lang === "ru" ? countryLabels[name] || name : name}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {tooltip && (
        <div className={styles.countryModalOverlay}>
          <div className={styles.countryModal}>
            <button
              className={styles.countryModalClose}
              onClick={() => setTooltip(null)}
            >
              ×
            </button>

            <div className={styles.countryModalHeader}>
              <div>
                <h2>{getText(tooltip.name)}</h2>
                <p>{getText(tooltip.capital)}</p>
              </div>

              <img
                className={styles.flagImage}
                src={tooltip.flag}
                alt={`${getText(tooltip.name)} flag`}
              />
            </div>

            <div className={styles.countryInfoGrid}>
              <div>
                <b>{lang === "ru" ? "Территория:" : "Area:"}</b>{" "}
                {getText(tooltip.area)} km²
              </div>

              <div>
                <b>{lang === "ru" ? "Население:" : "Population:"}</b>{" "}
                {getText(tooltip.population)}
              </div>

              <div>
                <b>{lang === "ru" ? "Часовой пояс:" : "Timezone:"}</b>{" "}
                {getText(tooltip.timezone)}
              </div>

              <div>
                <b>{lang === "ru" ? "Валюта:" : "Currency:"}</b>{" "}
                {getText(tooltip.currency)}
              </div>

              <div>
                <b>{lang === "ru" ? "Форма правления:" : "Government:"}</b>{" "}
                {getText(tooltip.government)}
              </div>

              <div>
                <b>{lang === "ru" ? "Язык:" : "Language:"}</b>{" "}
                {getText(tooltip.language)}
              </div>
            </div>

            <div className={styles.countryActions}>
              <button onClick={() => navigate(`/country/${tooltip.id}`)}>
                {lang === "ru" ? "Государство" : "Government"}
              </button>

              <button onClick={() => navigate(`/country/${tooltip.id}`)}>
                {lang === "ru" ? "Достопримечательности" : "Landmarks"}
              </button>

              <button onClick={() => navigate(`/country/${tooltip.id}`)}>
                {lang === "ru" ? "Ресурсы" : "Resources"}
              </button>

              <button onClick={() => navigate(`/country/${tooltip.id}`)}>
                {lang === "ru" ? "Природа / Климат" : "Nature / Climate"}
              </button>

              <button onClick={() => navigate(`/country/${tooltip.id}`)}>
                {lang === "ru" ? "Экономика / Торговля" : "Economy / Trade"}
              </button>

              <button onClick={() => navigate(`/country/${tooltip.id}`)}>
                {lang === "ru" ? "Культура / Религия" : "Culture / Religion"}
              </button>

              <button onClick={() => navigate(`/country/${tooltip.id}`)}>
                {lang === "ru" ? "Спорт" : "Sport"}
              </button>

              <button onClick={() => navigate(`/country/${tooltip.id}`)}>
                {lang === "ru"
                  ? "Сильные / Слабые стороны"
                  : "Strengths / Challenges"}
              </button>

              <button onClick={() => navigate(`/country/${tooltip.id}`)}>
                {lang === "ru" ? "Квиз" : "Quiz"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
