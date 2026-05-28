import { useState } from "react";
import classes from "./Form.module.css";
import { timezoneOptions } from "../timezone/timezoneOptions";
import Select from "react-select";

const Form = ({ setTimes, times, openModal }) => {
  const [selected, setSelected] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!selected) {
      openModal("Выберите город");
      return;
    }

    const alreadyExists = times.some((t) => t.zone === selected.value);

    if (alreadyExists) {
      openModal("Этот город уже добавлен");
      return;
    }

    if (times.length >= 6) {
      openModal("Можно добавить максимум 6 часов. Удалите один.");
      return;
    }

    const newTimeZone = {
      title: selected.capital,
      zone: selected.value,
      country: selected.country,
    };

    setTimes([...times, newTimeZone]);
    setSelected(null);
  };

  return (
    <form className={classes.containerForm} onSubmit={handleAdd}>
      <label className={classes.sity}>Выберите город</label>

      <div className={classes.selectRow}>
        <div className={classes.selectBox}>
          <Select
            className={classes.select}
            options={timezoneOptions}
            value={selected}
            onChange={setSelected}
            placeholder="Город"
            isSearchable
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </div>

        <button className={classes.btnAdd} type="submit">
          Добавить
        </button>
      </div>
    </form>
  );
};

export default Form;
