import { IconClose } from "./icons/close.js";

export function Settings({ settings, setSettings }) {
  const handleSettingsMenu = () => {
    const updatedSettings = { ...settings };
    updatedSettings["misc"]["menu_open"] = false;
    setSettings(updatedSettings);
  };
  const updateSettings = (property, cat, value) => {
    let test;
    cat === "scoring" ? (test = new RegExp(/^(?:-?[\d]*(?:\.?[\d]{1,2})||-?[\d]*\.||-)$/, "i")) : (test = new RegExp(/^\d+$/, "i"));
    if (value === "" || test.test(value)) {
      const updatedSettings = { ...settings };
      updatedSettings[cat][property] = value;
      setSettings(updatedSettings);
    }
  };
  return (
    <div className={`settings${settings["misc"] && settings["misc"]["menu_open"] ? " settings--open" : ""}`}>
      <div className="settings__container">
        <button className="close-settings" onClick={() => handleSettingsMenu()}>
          <IconClose />
        </button>
        <h2 className="settings__title">League Settings</h2>
        <div className="settings__category-container">
          <h3 className="settings__category-title">General Settings</h3>
          {settings.general?.teams !== undefined && (
            <div className="input-containter">
              <label htmlFor="teams">Teams</label>
              <input
                id="teams"
                name="teams"
                type="text"
                value={settings.general.teams}
                onChange={(e) => updateSettings(e.target.name, "general", e.target.value)}
              />
            </div>
          )}
          {settings.general?.user_pick !== undefined && (
            <div className="input-containter">
              <label htmlFor="user-pick">Your Pick</label>
              <input
                id="user-pick"
                name="user_pick"
                type="text"
                value={settings.general.user_pick}
                onChange={(e) => updateSettings(e.target.name, "general", e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="settings__category-container">
          <h3 className="settings__category-title">Roster</h3>
          {settings.roster?.qb !== undefined && (
            <div className="input-containter">
              <label htmlFor="qb">QB</label>
              <input id="qb" name="qb" type="text" value={settings.roster.qb} onChange={(e) => updateSettings(e.target.name, "roster", e.target.value)} />
            </div>
          )}
          {settings.roster?.rb !== undefined && (
            <div className="input-containter">
              <label htmlFor="rb">RB</label>
              <input id="rb" name="rb" type="text" value={settings.roster.rb} onChange={(e) => updateSettings(e.target.name, "roster", e.target.value)} />
            </div>
          )}
          {settings.roster?.wr !== undefined && (
            <div className="input-containter">
              <label htmlFor="wr">WR</label>
              <input id="wr" name="wr" type="text" value={settings.roster.wr} onChange={(e) => updateSettings(e.target.name, "roster", e.target.value)} />
            </div>
          )}
          {settings.roster?.te !== undefined && (
            <div className="input-containter">
              <label htmlFor="te">TE</label>
              <input id="te" name="te" type="text" value={settings.roster.te} onChange={(e) => updateSettings(e.target.name, "roster", e.target.value)} />
            </div>
          )}
          {settings.roster?.flex !== undefined && (
            <div className="input-containter">
              <label htmlFor="flex">FLEX</label>
              <input id="flex" name="flex" type="text" value={settings.roster.flex} onChange={(e) => updateSettings(e.target.name, "roster", e.target.value)} />
            </div>
          )}
          {settings.roster?.bench !== undefined && (
            <div className="input-containter">
              <label htmlFor="bench">BENCH</label>
              <input
                id="bench"
                name="bench"
                type="text"
                value={settings.roster.bench}
                onChange={(e) => updateSettings(e.target.name, "roster", e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="settings__category-container">
          <h3 className="settings__category-title">Scoring</h3>
          <h4 className="settings__scoring-title">Passing</h4>
          {settings.scoring?.pass_yrds !== undefined && (
            <div className="input-containter">
              <label htmlFor="pass_yrds">YRDS</label>
              <input
                id="pass_yrds"
                name="pass_yrds"
                type="text"
                value={settings.scoring.pass_yrds}
                onChange={(e) => updateSettings(e.target.name, "scoring", e.target.value)}
              />
            </div>
          )}
          {settings.scoring?.pass_td !== undefined && (
            <div className="input-containter">
              <label htmlFor="pass_td">TD</label>
              <input
                id="pass_td"
                name="pass_td"
                type="text"
                value={settings.scoring.pass_td}
                onChange={(e) => updateSettings(e.target.name, "scoring", e.target.value)}
              />
            </div>
          )}
          {settings.scoring?.pass_comp !== undefined && (
            <div className="input-containter">
              <label htmlFor="pass_comp">COMP</label>
              <input
                id="pass_comp"
                name="pass_comp"
                type="text"
                value={settings.scoring.pass_comp}
                onChange={(e) => updateSettings(e.target.name, "scoring", e.target.value)}
              />
            </div>
          )}
          {settings.scoring?.pass_int !== undefined && (
            <div className="input-containter">
              <label htmlFor="pass_int">INT</label>
              <input
                id="pass_int"
                name="pass_int"
                type="text"
                value={settings.scoring.pass_int}
                onChange={(e) => updateSettings(e.target.name, "scoring", e.target.value)}
              />
            </div>
          )}
          <h4 className="settings__scoring-title">Rushing</h4>
          {settings.scoring?.rush_yrds !== undefined && (
            <div className="input-containter">
              <label htmlFor="rush_yrds">YRDS</label>
              <input
                id="rush_yrds"
                name="rush_yrds"
                type="text"
                value={settings.scoring.rush_yrds}
                onChange={(e) => updateSettings(e.target.name, "scoring", e.target.value)}
              />
            </div>
          )}
          {settings.scoring?.rush_td !== undefined && (
            <div className="input-containter">
              <label htmlFor="rush_td">TD</label>
              <input
                id="rush_td"
                name="rush_td"
                type="text"
                value={settings.scoring.rush_td}
                onChange={(e) => updateSettings(e.target.name, "scoring", e.target.value)}
              />
            </div>
          )}
          <h4 className="settings__scoring-title">Receiving</h4>
          {settings.scoring?.rec_yrds !== undefined && (
            <div className="input-containter">
              <label htmlFor="rec_yrds">YRDS</label>
              <input
                id="rec_yrds"
                name="rec_yrds"
                type="text"
                value={settings.scoring.rec_yrds}
                onChange={(e) => updateSettings(e.target.name, "scoring", e.target.value)}
              />
            </div>
          )}
          {settings.scoring?.rec_td !== undefined && (
            <div className="input-containter">
              <label htmlFor="rec_td">TD</label>
              <input
                id="rec_td"
                name="rec_td"
                type="text"
                value={settings.scoring.rec_td}
                onChange={(e) => updateSettings(e.target.name, "scoring", e.target.value)}
              />
            </div>
          )}
          {settings.scoring?.rec_rec !== undefined && (
            <div className="input-containter">
              <label htmlFor="rec_rec">REC</label>
              <input
                id="rec_rec"
                name="rec_rec"
                type="text"
                value={settings.scoring.rec_rec}
                onChange={(e) => updateSettings(e.target.name, "scoring", e.target.value)}
              />
            </div>
          )}
          <h4 className="settings__scoring-title">Misc</h4>
          {settings.scoring?.misc_fum !== undefined && (
            <div className="input-containter">
              <label htmlFor="misc_fum">FUM</label>
              <input
                id="misc_fum"
                name="misc_fum"
                type="text"
                value={settings.scoring.misc_fum}
                onChange={(e) => updateSettings(e.target.name, "scoring", e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="settings__overlay" onClick={() => handleSettingsMenu()}></div>
    </div>
  );
}
