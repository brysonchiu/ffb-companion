import { IconHamburger } from './icons/hamburger.jsx';
import { PlayerSearch } from './PlayerSearch.jsx';
import { CurrentPick } from './picks/CurrentPick.jsx';
import { UserPicks } from './picks/UserPicks.jsx';

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
