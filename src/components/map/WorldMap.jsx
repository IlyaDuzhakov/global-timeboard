import React, { useState, useEffect, useRef } from "react";
import { geoPath, geoEqualEarth } from "d3-geo";
import { feature } from "topojson-client";
import world from "../../utils/world.json";
import { countryInfo } from "../../utils/countryData";
import styles from "./WorldMap.module.css";

export default function WorldMap({ activeCountries = [] }) {
  const [tooltip, setTooltip] = useState(null);
  const [lang, setLang] = useState("ru");
  const [hovered, setHovered] = useState(null);

  const projection = geoEqualEarth().scale(190).translate([480, 250]);

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
    "United States of America",
    "Canada",
    "Brazil",
    "Australia",
    "India",
    "Kazakhstan",
    "Mexico",
    "Argentina",
    "Antarctica",
    "Greenland",
    "Algeria",
    "Japan",
    "Mongolia",
    "Turkey",
    "Cuba",
    "Indonesia",
    "Angola",
    "Iran",
    "Sudan",
    "Chad",
    "Spain",
    "Libya",
    "Mali",
    "Philippines",
    "Iceland",
    "United Kingdom",
    "Iraq",
    "Sri Lanka",
    "Bolivia",
    "Peru",
    "Venezuela",
    "New Zealand",
    "Fiji",
    "Madagascar",
    "South Africa",
  ];

  const handleClick = (geo) => {
    const name = geo.properties.name || "Неизвестная страна";
    console.log("activeCountries:", activeCountries);
    console.log("map country name:", name);
    const info = countryInfo[name];
    setTooltip({
      name,
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
      <div className={styles.langSwitcher}>
        <button onClick={() => setLang("ru")}>RU</button>
        <button onClick={() => setLang("en")}>EN</button>
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
                  {name}
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
              <button>{lang === "ru" ? "Государство" : "Government"}</button>

              <button>
                {lang === "ru" ? "Достопримечательности" : "Landmarks"}
              </button>

              <button>{lang === "ru" ? "Ресурсы" : "Resources"}</button>

              <button>
                {lang === "ru" ? "Природа / Климат" : "Nature / Climate"}
              </button>

              <button>
                {lang === "ru" ? "Экономика / Торговля" : "Economy / Trade"}
              </button>

              <button>
                {lang === "ru" ? "Культура / Религия" : "Culture / Religion"}
              </button>

              <button>{lang === "ru" ? "Спорт" : "Sport"}</button>

              <button>
                {lang === "ru"
                  ? "Сильные / Слабые стороны"
                  : "Strengths / Challenges"}
              </button>

              <button>{lang === "ru" ? "Квиз" : "Quiz"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
