import { IconHamburger } from "./icons/hamburger.js";
import { PlayerSearch } from "./PlayerSearch.js";
import { CurrentPick } from "./picks/CurrentPick.js";
import { UserPicks } from "./picks/UserPicks.js";

export function Header({ playerSearch, setPlayerSearch, settings, setSettings, currentPick, setCurrentPick }) {
  return (
    <header className="header">
      <div className="header__settings">
        <IconHamburger settings={settings} setSettings={setSettings} />
      </div>
      <div className="header__widgets">
        <PlayerSearch playerSearch={playerSearch} setPlayerSearch={setPlayerSearch} />
        <UserPicks settings={settings} currentPick={currentPick} />
        <CurrentPick currentPick={currentPick} setCurrentPick={setCurrentPick} />
      </div>
    </header>
  );
}
