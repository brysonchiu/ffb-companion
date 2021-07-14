import { IconSearch } from "./icons/search.js";
import { IconClose } from "./icons/close.js";

export function PlayerSearch({ filter, setFilter }) {
  return (
    <div className="player-search__container">
      <input className="player-search" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search Player" />
      <IconSearch active={filter === "Search Player" || filter === "" ? true : false} />
      <button
        className={`icon-close-search${filter !== "Search Player" && filter !== "" ? " icon-close-search--active" : ""}`}
        onClick={() => setFilter("Search Player")}
      >
        <IconClose />
      </button>
    </div>
  );
}
