import { IconHamburger } from "./icons/hamburger.js";
import { PlayerSearch } from "./PlayerSearch.js";
import { CurrentPick } from "./picks/CurrentPick.js";
import { UserPicks } from "./picks/UserPicks.js";

export function Header({ filter, setFilter, settings, setSettings, currentPick, setCurrentPick }) {
  return (
    <header className="header">
      <h1 className="visually-hidden">Fantasy Football Draft Kit</h1>
      <div className="header__settings">
        <IconHamburger settings={settings} setSettings={setSettings} />
      </div>
      <div className="header__widgets">
        <PlayerSearch filter={filter} setFilter={setFilter} />
        <UserPicks settings={settings} currentPick={currentPick} />
        <CurrentPick currentPick={currentPick} setCurrentPick={setCurrentPick} />
      </div>
    </header>
  );
}
