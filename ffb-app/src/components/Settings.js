import { useEffect, useState } from 'react';
import { IconClose } from './icons/close.js';
import { defaultSettings } from '../helpers/defaultSettings.js';

export function Settings({ settings, setSettings, setSentimentStatus, setDraftStatus, setCurrentPick }) {
  const [statsTimestamp, setStatsTimestamp] = useState('');

  //get player stats timestamp
  useEffect(() => {
    (() => {
      fetch('stats-timestamp.json', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then((time) => {
          setStatsTimestamp(
            new Date(time).toLocaleString([], {
              dateStyle: 'short',
              timeStyle: 'short',
            })
          );
        });
    })();
  }, [setStatsTimestamp]);

  //closing the menu
  const handleSettingsMenu = () => {
    setSettings({
      ...settings,
      misc: {
        ...settings.misc,
        menu_open: false,
        menu_transition: true,
      },
    });
  };
  const handleSettingsMenuTransition = () => {
    setSettings({
      ...settings,
      misc: {
        ...settings.misc,
        menu_transition: false,
      },
    });
  };

  //set state for updating settings
  const updateSettings = (property, cat, value) => {
    let test;
    cat === 'scoring' ? (test = new RegExp(/^(?:-?[\d]*(?:\.?[\d]{1,2})||-?[\d]*\.||-)$/, 'i')) : (test = new RegExp(/^\d+$/, 'i'));
    if (value === '' || test.test(value)) {
      const updatedSettings = { ...settings };
      updatedSettings[cat][property] = value;
      setSettings(updatedSettings);
    }
  };
  //toggling the color mode
  const handleColorMode = () => {
    const targetMode = settings.misc?.color_mode === 'light' ? 'dark' : 'light';
    setSettings({
      ...settings,
      misc: {
        ...settings.misc,
        color_mode: targetMode,
      },
    });
  };
  //toggle slider setting
  const handleToggle = (property, cat) => {
    setSettings({
      ...settings,
      [cat]: {
        ...settings[cat],
        [property]: !settings[cat][property],
      },
    });
  };
  return (
    <div
      className={`settings${settings['misc']?.['menu_open'] ? ' settings--open' : ''}${
        settings['misc']?.['menu_transition'] ? ' settings--transitioning' : ''
      }`}
    >
      <div className="settings__container">
        <button className="close-settings" onClick={() => handleSettingsMenu()}>
          <IconClose />
        </button>
        <div className="league-settings">
          <h2 className="settings__title">League Settings</h2>
          <div className="settings__category-container settings__category-container--third">
            <h3 className="settings__category-title">General Settings</h3>
            {settings.general?.teams !== undefined && (
              <div className="input-containter">
                <label htmlFor="teams">Teams</label>
                <input
                  className="text--number"
                  id="teams"
                  name="teams"
                  type="text"
                  value={settings.general.teams}
                  onChange={(e) => updateSettings(e.target.name, 'general', e.target.value)}
                />
              </div>
            )}
            {settings.general?.user_pick !== undefined && (
              <div className="input-containter">
                <label htmlFor="user-pick">Your Pick</label>
                <input
                  className="text--number"
                  id="user-pick"
                  name="user_pick"
                  type="text"
                  value={settings.general.user_pick}
                  onChange={(e) => updateSettings(e.target.name, 'general', e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="settings__category-container settings__category-container--full">
            {settings.general?.flex_te !== undefined && (
              <div className="switch__container">
                <label className="switch">
                  <input type="checkbox" name="flex_te" checked={settings.general?.flex_te} onChange={(e) => handleToggle(e.target.name, 'general')} />
                  <span className="slider slider--round"></span>
                </label>
                <p className="switch__text">TE included in flex</p>
              </div>
            )}
            {settings.general?.flex_qb !== undefined && (
              <div className="switch__container">
                <label className="switch">
                  <input type="checkbox" name="flex_qb" checked={settings.general?.flex_qb} onChange={(e) => handleToggle(e.target.name, 'general')} />
                  <span className="slider slider--round"></span>
                </label>
                <p className="switch__text">QB included in flex</p>
              </div>
            )}
          </div>
          <div className="settings__category-container settings__category-container--third">
            <h3 className="settings__category-title">Roster</h3>
            {settings.roster?.qb !== undefined && (
              <div className="input-containter">
                <label htmlFor="qb">QB</label>
                <input
                  className="text--number"
                  id="qb"
                  name="qb"
                  type="text"
                  value={settings.roster.qb}
                  onChange={(e) => updateSettings(e.target.name, 'roster', e.target.value)}
                />
              </div>
            )}
            {settings.roster?.rb !== undefined && (
              <div className="input-containter">
                <label htmlFor="rb">RB</label>
                <input
                  className="text--number"
                  id="rb"
                  name="rb"
                  type="text"
                  value={settings.roster.rb}
                  onChange={(e) => updateSettings(e.target.name, 'roster', e.target.value)}
                />
              </div>
            )}
            {settings.roster?.wr !== undefined && (
              <div className="input-containter">
                <label htmlFor="wr">WR</label>
                <input
                  className="text--number"
                  id="wr"
                  name="wr"
                  type="text"
                  value={settings.roster.wr}
                  onChange={(e) => updateSettings(e.target.name, 'roster', e.target.value)}
                />
              </div>
            )}
            {settings.roster?.te !== undefined && (
              <div className="input-containter">
                <label htmlFor="te">TE</label>
                <input
                  className="text--number"
                  id="te"
                  name="te"
                  type="text"
                  value={settings.roster.te}
                  onChange={(e) => updateSettings(e.target.name, 'roster', e.target.value)}
                />
              </div>
            )}
            {settings.roster?.flex !== undefined && (
              <div className="input-containter">
                <label htmlFor="flex">FLEX</label>
                <input
                  className="text--number"
                  id="flex"
                  name="flex"
                  type="text"
                  value={settings.roster.flex}
                  onChange={(e) => updateSettings(e.target.name, 'roster', e.target.value)}
                />
              </div>
            )}
            {settings.roster?.k !== undefined && (
              <div className="input-containter">
                <label htmlFor="k">K</label>
                <input
                  className="text--number"
                  id="k"
                  name="k"
                  type="text"
                  value={settings.roster.k}
                  onChange={(e) => updateSettings(e.target.name, 'roster', e.target.value)}
                />
              </div>
            )}
            {settings.roster?.dst !== undefined && (
              <div className="input-containter">
                <label htmlFor="dst">DST</label>
                <input
                  className="text--number"
                  id="dst"
                  name="dst"
                  type="text"
                  value={settings.roster.dst}
                  onChange={(e) => updateSettings(e.target.name, 'roster', e.target.value)}
                />
              </div>
            )}
            {settings.roster?.bench !== undefined && (
              <div className="input-containter">
                <label htmlFor="bench">BENCH</label>
                <input
                  className="text--number"
                  id="bench"
                  name="bench"
                  type="text"
                  value={settings.roster.bench}
                  onChange={(e) => updateSettings(e.target.name, 'roster', e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="settings__category-container settings__category-container--third">
            <h3 className="settings__category-title">Scoring</h3>
          </div>
          <div className="settings__category-container settings__category-container--full">
            {settings.scoring?.independent_positional_scoring !== undefined && (
              <div className="switch__container">
                <label className="switch">
                  <input
                    type="checkbox"
                    name="independent_positional_scoring"
                    checked={settings.scoring?.independent_positional_scoring}
                    onChange={(e) => handleToggle(e.target.name, 'scoring')}
                  />
                  <span className="slider slider--round"></span>
                </label>
                <p className="switch__text">Independent Positional Scoring</p>
              </div>
            )}
          </div>
          <div className="settings__category-container settings__category-container--third">
            <h4 className="settings__scoring-title">
              <b>Passing</b>
            </h4>
            {settings.scoring?.pass_yrds !== undefined && (
              <div className="input-containter">
                <label htmlFor="pass_yrds">YRDS</label>
                <input
                  className="text--number"
                  id="pass_yrds"
                  name="pass_yrds"
                  type="text"
                  value={settings.scoring.pass_yrds}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.pass_td !== undefined && (
              <div className="input-containter">
                <label htmlFor="pass_td">TD</label>
                <input
                  className="text--number"
                  id="pass_td"
                  name="pass_td"
                  type="text"
                  value={settings.scoring.pass_td}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.pass_comp !== undefined && (
              <div className="input-containter">
                <label htmlFor="pass_comp">COMP</label>
                <input
                  className="text--number"
                  id="pass_comp"
                  name="pass_comp"
                  type="text"
                  value={settings.scoring.pass_comp}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.pass_int !== undefined && (
              <div className="input-containter">
                <label htmlFor="pass_int">INT</label>
                <input
                  className="text--number"
                  id="pass_int"
                  name="pass_int"
                  type="text"
                  value={settings.scoring.pass_int}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {!settings.scoring?.independent_positional_scoring ? (
              <>
                <h4 className="settings__scoring-title">
                  <b>Rushing</b>
                </h4>
                {settings.scoring?.rush_yrds !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="rush_yrds">YRDS</label>
                    <input
                      className="text--number"
                      id="rush_yrds"
                      name="rush_yrds"
                      type="text"
                      value={settings.scoring.rush_yrds}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                {settings.scoring?.rush_td !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="rush_td">TD</label>
                    <input
                      className="text--number"
                      id="rush_td"
                      name="rush_td"
                      type="text"
                      value={settings.scoring.rush_td}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                <h4 className="settings__scoring-title">
                  <b>Receiving</b>
                </h4>
                {settings.scoring?.rec_yrds !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="rec_yrds">YRDS</label>
                    <input
                      className="text--number"
                      id="rec_yrds"
                      name="rec_yrds"
                      type="text"
                      value={settings.scoring.rec_yrds}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                {settings.scoring?.rec_td !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="rec_td">TD</label>
                    <input
                      className="text--number"
                      id="rec_td"
                      name="rec_td"
                      type="text"
                      value={settings.scoring.rec_td}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                {settings.scoring?.rec_rec !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="rec_rec">REC</label>
                    <input
                      className="text--number"
                      id="rec_rec"
                      name="rec_rec"
                      type="text"
                      value={settings.scoring.rec_rec}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <h4 className="settings__scoring-title">
                  <b>Rushing</b> | Quarterback
                </h4>
                {settings.scoring?.qb_rush_yrds !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="qb_rush_yrds">YRDS</label>
                    <input
                      className="text--number"
                      id="qb_rush_yrds"
                      name="qb_rush_yrds"
                      type="text"
                      value={settings.scoring.qb_rush_yrds}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                {settings.scoring?.qb_rush_td !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="qb_rush_td">TD</label>
                    <input
                      className="text--number"
                      id="qb_rush_td"
                      name="qb_rush_td"
                      type="text"
                      value={settings.scoring.qb_rush_td}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                <h4 className="settings__scoring-title">
                  <b>Rushing</b> | Running Back
                </h4>
                {settings.scoring?.rb_rush_yrds !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="rb_rush_yrds">YRDS</label>
                    <input
                      className="text--number"
                      id="rb_rush_yrds"
                      name="rb_rush_yrds"
                      type="text"
                      value={settings.scoring.rb_rush_yrds}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                {settings.scoring?.rb_rush_td !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="rb_rush_td">TD</label>
                    <input
                      className="text--number"
                      id="rb_rush_td"
                      name="rb_rush_td"
                      type="text"
                      value={settings.scoring.rb_rush_td}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                <h4 className="settings__scoring-title">
                  <b>Rushing</b> | Wide Receiver
                </h4>
                {settings.scoring?.wr_rush_yrds !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="wr_rush_yrds">YRDS</label>
                    <input
                      className="text--number"
                      id="wr_rush_yrds"
                      name="wr_rush_yrds"
                      type="text"
                      value={settings.scoring.wr_rush_yrds}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                {settings.scoring?.wr_rush_td !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="wr_rush_td">TD</label>
                    <input
                      className="text--number"
                      id="wr_rush_td"
                      name="wr_rush_td"
                      type="text"
                      value={settings.scoring.wr_rush_td}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                <h4 className="settings__scoring-title">
                  <b>Receiving</b> | Running Back
                </h4>
                {settings.scoring?.rb_rec_yrds !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="rb_rec_yrds">YRDS</label>
                    <input
                      className="text--number"
                      id="rb_rec_yrds"
                      name="rb_rec_yrds"
                      type="text"
                      value={settings.scoring.rb_rec_yrds}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                {settings.scoring?.rb_rec_td !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="rb_rec_td">TD</label>
                    <input
                      className="text--number"
                      id="rb_rec_td"
                      name="rb_rec_td"
                      type="text"
                      value={settings.scoring.rb_rec_td}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                {settings.scoring?.rb_rec_rec !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="rb_rec_rec">REC</label>
                    <input
                      className="text--number"
                      id="rb_rec_rec"
                      name="rb_rec_rec"
                      type="text"
                      value={settings.scoring.rb_rec_rec}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                <h4 className="settings__scoring-title">
                  <b>Receiving</b> | Wide Receiver
                </h4>
                {settings.scoring?.wr_rec_yrds !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="wr_rec_yrds">YRDS</label>
                    <input
                      className="text--number"
                      id="wr_rec_yrds"
                      name="wr_rec_yrds"
                      type="text"
                      value={settings.scoring.wr_rec_yrds}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                {settings.scoring?.wr_rec_td !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="wr_rec_td">TD</label>
                    <input
                      className="text--number"
                      id="wr_rec_td"
                      name="wr_rec_td"
                      type="text"
                      value={settings.scoring.wr_rec_td}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                {settings.scoring?.wr_rec_rec !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="wr_rec_rec">REC</label>
                    <input
                      className="text--number"
                      id="wr_rec_rec"
                      name="wr_rec_rec"
                      type="text"
                      value={settings.scoring.wr_rec_rec}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                <h4 className="settings__scoring-title">
                  <b>Receiving</b> | Tight End
                </h4>
                {settings.scoring?.te_rec_yrds !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="te_rec_yrds">YRDS</label>
                    <input
                      className="text--number"
                      id="te_rec_yrds"
                      name="te_rec_yrds"
                      type="text"
                      value={settings.scoring.te_rec_yrds}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                {settings.scoring?.te_rec_td !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="te_rec_td">TD</label>
                    <input
                      className="text--number"
                      id="te_rec_td"
                      name="te_rec_td"
                      type="text"
                      value={settings.scoring.te_rec_td}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
                {settings.scoring?.te_rec_rec !== undefined && (
                  <div className="input-containter">
                    <label htmlFor="te_rec_rec">REC</label>
                    <input
                      className="text--number"
                      id="te_rec_rec"
                      name="te_rec_rec"
                      type="text"
                      value={settings.scoring.te_rec_rec}
                      onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                    />
                  </div>
                )}
              </>
            )}
            <h4 className="settings__scoring-title">
              <b>Kicking</b>
            </h4>
            {settings.scoring?.k_fg !== undefined && (
              <div className="input-containter">
                <label htmlFor="k_fg">FG</label>
                <input
                  className="text--number"
                  id="k_fg"
                  name="k_fg"
                  type="text"
                  value={settings.scoring.k_fg}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.k_mfg !== undefined && (
              <div className="input-containter">
                <label htmlFor="k_mfg">MFG</label>
                <input
                  className="text--number"
                  id="k_mfg"
                  name="k_mfg"
                  type="text"
                  value={settings.scoring.k_mfg}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.k_xpt !== undefined && (
              <div className="input-containter">
                <label htmlFor="k_xpt">XPT</label>
                <input
                  className="text--number"
                  id="k_xpt"
                  name="k_xpt"
                  type="text"
                  value={settings.scoring.k_xpt}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            <h4 className="settings__scoring-title">
              <b>Defense</b> | Sacks, Turnovers, & Scoring
            </h4>
            {settings.scoring?.dst_sk !== undefined && (
              <div className="input-containter">
                <label htmlFor="dst_sk">SACK</label>
                <input
                  className="text--number"
                  id="dst_sk"
                  name="dst_sk"
                  type="text"
                  value={settings.scoring.dst_sk}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_int !== undefined && (
              <div className="input-containter">
                <label htmlFor="dst_int">INT</label>
                <input
                  className="text--number"
                  id="dst_int"
                  name="dst_int"
                  type="text"
                  value={settings.scoring.dst_int}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_fr !== undefined && (
              <div className="input-containter">
                <label htmlFor="dst_fr">FR</label>
                <input
                  className="text--number"
                  id="dst_fr"
                  name="dst_fr"
                  type="text"
                  value={settings.scoring.dst_fr}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_ff !== undefined && (
              <div className="input-containter">
                <label htmlFor="dst_ff">FF</label>
                <input
                  className="text--number"
                  id="dst_ff"
                  name="dst_ff"
                  type="text"
                  value={settings.scoring.dst_ff}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_td !== undefined && (
              <div className="input-containter">
                <label htmlFor="dst_td">TD</label>
                <input
                  className="text--number"
                  id="dst_td"
                  name="dst_td"
                  type="text"
                  value={settings.scoring.dst_td}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_sf !== undefined && (
              <div className="input-containter">
                <label htmlFor="dst_sf">SAFE</label>
                <input
                  className="text--number"
                  id="dst_sf"
                  name="dst_sf"
                  type="text"
                  value={settings.scoring.dst_sf}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            <h4 className="settings__scoring-title">
              <b>Defense</b> | Points Allowed
            </h4>
            {settings.scoring?.dst_pa_0 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_pa_0">
                  0
                </label>
                <input
                  className="text--number"
                  id="dst_pa_0"
                  name="dst_pa_0"
                  type="text"
                  value={settings.scoring?.dst_pa_0}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_pa_1_5 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_pa_1_5">
                  1-5
                </label>
                <input
                  className="text--number"
                  id="dst_pa_1_5"
                  name="dst_pa_1_5"
                  type="text"
                  value={settings.scoring?.dst_pa_1_5}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_pa_6_10 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_pa_6_10">
                  6-10
                </label>
                <input
                  className="text--number"
                  id="dst_pa_6_10"
                  name="dst_pa_6_10"
                  type="text"
                  value={settings.scoring?.dst_pa_6_10}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_pa_11_15 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_pa_11_15">
                  11-15
                </label>
                <input
                  className="text--number"
                  id="dst_pa_11_15"
                  name="dst_pa_11_15"
                  type="text"
                  value={settings.scoring?.dst_pa_11_15}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_pa_16_20 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_pa_16_20">
                  16-20
                </label>
                <input
                  className="text--number"
                  id="dst_pa_16_20"
                  name="dst_pa_16_20"
                  type="text"
                  value={settings.scoring?.dst_pa_16_20}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_pa_21_25 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_pa_21_25">
                  21-25
                </label>
                <input
                  className="text--number"
                  id="dst_pa_21_25"
                  name="dst_pa_21_25"
                  type="text"
                  value={settings.scoring?.dst_pa_21_25}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_pa_26_30 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_pa_26_30">
                  26-30
                </label>
                <input
                  className="text--number"
                  id="dst_pa_26_30"
                  name="dst_pa_26_30"
                  type="text"
                  value={settings.scoring?.dst_pa_26_30}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_pa_31_35 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_pa_31_35">
                  31-35
                </label>
                <input
                  className="text--number"
                  id="dst_pa_31_35"
                  name="dst_pa_31_35"
                  type="text"
                  value={settings.scoring?.dst_pa_31_35}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_pa_36_40 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_pa_36_40">
                  36-40
                </label>
                <input
                  className="text--number"
                  id="dst_pa_36_40"
                  name="dst_pa_36_40"
                  type="text"
                  value={settings.scoring?.dst_pa_36_40}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_pa_41_plus !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_pa_41_plus">
                  40+
                </label>
                <input
                  className="text--number"
                  id="dst_pa_41_plus"
                  name="dst_pa_41_plus"
                  type="text"
                  value={settings.scoring?.dst_pa_41_plus}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            <h4 className="settings__scoring-title">
              <b>Defense</b> | Yards Allowed
            </h4>
            {settings.scoring?.dst_ya_49 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_ya_49">
                  &lt;49
                </label>
                <input
                  className="text--number"
                  id="dst_ya_49"
                  name="dst_ya_49"
                  type="text"
                  value={settings.scoring?.dst_ya_49}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_ya_50_99 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_ya_50_99">
                  50-99
                </label>
                <input
                  className="text--number"
                  id="dst_ya_50_99"
                  name="dst_ya_50_99"
                  type="text"
                  value={settings.scoring?.dst_ya_50_99}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_ya_100_149 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_ya_100_149">
                  100-149
                </label>
                <input
                  className="text--number"
                  id="dst_ya_100_149"
                  name="dst_ya_100_149"
                  type="text"
                  value={settings.scoring?.dst_ya_100_149}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_ya_150_199 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_ya_150_199">
                  150-199
                </label>
                <input
                  className="text--number"
                  id="dst_ya_150_199"
                  name="dst_ya_150_199"
                  type="text"
                  value={settings.scoring?.dst_ya_150_199}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_ya_200_249 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_ya_200_249">
                  200-249
                </label>
                <input
                  className="text--number"
                  id="dst_ya_200_249"
                  name="dst_ya_200_249"
                  type="text"
                  value={settings.scoring?.dst_ya_200_249}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_ya_250_299 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_ya_250_299">
                  250-299
                </label>
                <input
                  className="text--number"
                  id="dst_ya_250_299"
                  name="dst_ya_250_299"
                  type="text"
                  value={settings.scoring?.dst_ya_250_299}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_ya_300_349 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_ya_300_349">
                  300-349
                </label>
                <input
                  className="text--number"
                  id="dst_ya_300_349"
                  name="dst_ya_300_349"
                  type="text"
                  value={settings.scoring?.dst_ya_300_349}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_ya_350_399 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_ya_350_399">
                  350-399
                </label>
                <input
                  className="text--number"
                  id="dst_ya_350_399"
                  name="dst_ya_350_399"
                  type="text"
                  value={settings.scoring?.dst_ya_350_399}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_ya_400_449 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_ya_400_449">
                  400-449
                </label>
                <input
                  className="text--number"
                  id="dst_ya_400_449"
                  name="dst_ya_400_449"
                  type="text"
                  value={settings.scoring?.dst_ya_400_449}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_ya_450_499 !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_ya_450_499">
                  450-499
                </label>
                <input
                  className="text--number"
                  id="dst_ya_450_499"
                  name="dst_ya_450_499"
                  type="text"
                  value={settings.scoring?.dst_ya_450_499}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            {settings.scoring?.dst_ya_500_plus !== undefined && (
              <div className="input-containter">
                <label className="text--number" htmlFor="dst_ya_500_plus">
                  500+
                </label>
                <input
                  className="text--number"
                  id="dst_ya_500_plus"
                  name="dst_ya_500_plus"
                  type="text"
                  value={settings.scoring?.dst_ya_500_plus}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
            <h4 className="settings__scoring-title">
              <b>Misc</b>
            </h4>
            {settings.scoring?.misc_fum !== undefined && (
              <div className="input-containter">
                <label htmlFor="misc_fum">FUM</label>
                <input
                  className="text--number"
                  id="misc_fum"
                  name="misc_fum"
                  type="text"
                  value={settings.scoring.misc_fum}
                  onChange={(e) => updateSettings(e.target.name, 'scoring', e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="app-settings">
          <h2 className="settings__title">App Settings</h2>
          <div className="settings__category-container settings__category-container--full">
            {settings.misc?.color_mode !== undefined && (
              <div className="switch__container switch__container--color-mode">
                <label className="switch">
                  <input type="checkbox" checked={settings.misc?.color_mode === 'dark' ? true : false} onChange={() => handleColorMode()} />
                  <span className="slider slider--round"></span>
                </label>
                <p className="switch__text switch__text--color-mode">{settings.misc?.color_mode} mode</p>
              </div>
            )}
          </div>
          <div className="settings__category-container settings__category-container--full">
            <button
              className="button"
              onClick={() => {
                setDraftStatus({});
                setCurrentPick(1);
              }}
            >
              Reset Draft Progress
            </button>
            <button className="button button--negative" onClick={() => setSettings(defaultSettings)}>
              Reset Settings
            </button>
            <button className="button button--negative" onClick={() => setSentimentStatus({})}>
              Reset Player Sentiment
            </button>
          </div>
        </div>
        <div className="stats-timestamp">
          Player stats last updated: <span className="text--number">{statsTimestamp}</span>
        </div>
      </div>
      <div className="settings__overlay" onClick={() => handleSettingsMenu()} onTransitionEnd={() => handleSettingsMenuTransition()}></div>
    </div>
  );
}
