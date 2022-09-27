import { useState } from "react";
import "./customDatalist.css";

export default function CustomDatalist({ name, list, onSelect, selectedList }) {
  const [input, setInput] = useState("");
  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit() {
    if (list.includes(input)) {
      onSelect(input);
      console.log(input);
    }
    setInput("");
  }

  const filter = list.filter((e) => !selectedList.find((g) => g === e));

  return (
    <div className="customDatalist">
      <input
        list={name}
        name={name}
        placeholder={`Type here to filter ${name}`}
        value={input}
        onChange={(e) => handleInput(e)}
        className="inputSelect"
        autoComplete="off"
      />
      <datalist id={name}>
        {filter.map((e) => {
          return (
            <option key={e} value={e}>
              {e}
            </option>
          );
        })}
      </datalist>
      <button type="button" onClick={handleSubmit} className="datalistButton">
        +
      </button>
    </div>
  );
}
