import { IconSearch } from "./icons/search.js";
import { IconClose } from "./icons/close.js";

export function PlayerSearch({ playerSearch, setPlayerSearch }) {
  return (
    <div className="player-search__container">
      <input className="player-search" value={playerSearch} onChange={(e) => setPlayerSearch(e.target.value)} placeholder="Search Player" />
      <IconSearch active={playerSearch === "Search Player" || playerSearch === "" ? true : false} />
      <button
        className={`icon-close-search${playerSearch !== "Search Player" && playerSearch !== "" ? " icon-close-search--active" : ""}`}
        onClick={() => setPlayerSearch("")}
      >
        <IconClose />
      </button>
    </div>
  );
}
