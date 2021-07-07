import { Settings } from "./Settings.js";
import { PlayerSearch } from "./PlayerSearch.js";
import { CurrentPick } from "./picks/CurrentPick.js";
import { PlayerPicks } from "./picks/PlayerPicks.js";

export function Header() {
  return (
    <header className="header">
      <h1 className="visually-hidden">Fantasy Football Draft Kit</h1>
      <div className="header__settings">
        <Settings />
      </div>
      <div className="header__picks">
        <PlayerSearch />
        <PlayerPicks />
        <CurrentPick pick="1" />
      </div>
    </header>
  );
}
