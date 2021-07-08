import { IconSearch } from "./icons/search.js";
import { IconClose } from "./icons/close.js";

export function PlayerSearch({ filter, setFilter }) {
  const handleFilterFocus = (e) => {
    if (e.target.value === "Search Player") {
      setFilter("");
    }
  };

  const handleFilterBlur = (e) => {
    if (e.target.value === "") {
      setFilter("Search Player");
    }
  };

  return (
    <div className="player-search__container">
      <input
        className="player-search"
        value={filter}
        onFocus={(e) => handleFilterFocus(e)}
        onBlur={(e) => handleFilterBlur(e)}
        onChange={(e) => setFilter(e.target.value)}
      />
      <IconSearch active={filter === "Search Player" || filter === "" ? true : false} />
      <IconClose active={filter !== "Search Player" && filter !== "" ? true : false} setFilter={setFilter} />
    </div>
  );
}
