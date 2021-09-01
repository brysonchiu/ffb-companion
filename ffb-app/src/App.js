import { useState, useEffect } from "react";
import { Header } from "./components/Header.js";
import { OverallList } from "./components/player/OverallList.js";
import { PositionalLists } from "./components/player/PositionalLists.js";
import { Settings } from "./components/Settings.js";
import { MobileMessage } from "./components/MobileMessage.js";
import { parseStringToFloat, calculateTotalPoints } from "./helpers.js";
import { vbdPointRankings } from "./rostersAndRanks.js";

function App() {
  const [players, setPlayers] = useState({});
  const [draftStatus, setDraftStatus] = useState({});
  const [sentimentStatus, setSentimentStatus] = useState({});
  const [playerSearch, setPlayerSearch] = useState("");
  const [settings, setSettings] = useState({
    general: {
      teams: 12,
      user_pick: 1,
      flex_te: true,
      flex_qb: false,
    },
    roster: {
      qb: 1,
      rb: 2,
      wr: 2,
      te: 1,
      k: 1,
      dst: 1,
      flex: 1,
      bench: 7,
    },
    scoring: {
      pass_yrds: 0.04,
      pass_td: 6,
      pass_comp: 0,
      pass_int: -2,
      rush_yrds: 0.1,
      rush_td: 6,
      rec_yrds: 0.1,
      rec_td: 6,
      rec_rec: 1,
      k_fg: 4,
      k_mfg: -1,
      k_xpt: 1,
      dst_sk: 1,
      dst_int: 2,
      dst_fr: 2,
      dst_ff: 0,
      dst_td: 6,
      dst_sf: 2,
      dst_pa_0: 5,
      dst_pa_1_5: 4,
      dst_pa_6_10: 3,
      dst_pa_11_15: 1,
      dst_pa_16_20: 0,
      dst_pa_21_25: 0,
      dst_pa_26_30: -1,
      dst_pa_31_35: -1,
      dst_pa_36_40: -3,
      dst_pa_40_plus: -5,
      dst_ya_49: 0,
      dst_ya_50_99: 0,
      dst_ya_100_149: 0,
      dst_ya_150_199: 0,
      dst_ya_200_249: 0,
      dst_ya_250_299: 0,
      dst_ya_300_349: 0,
      dst_ya_350_399: 0,
      dst_ya_400_449: 0,
      dst_ya_450_499: 0,
      dst_ya_500_plus: 0,
      misc_fum: -2,
    },
    misc: {
      menu_open: false,
      menu_transition: false,
      color_mode: "light",
    },
  });
  const [playerStatusFilters, setPlayerStatusFilters] = useState({
    undrafted: true,
    drafted: true,
    starred: true,
    favorited: true,
    hated: true,
  });
  const [currentPick, setCurrentPick] = useState(1);
  const [playersTotalPoints, setPlayersTotalPoints] = useState([]);
  const [vbdRanks, setVbdRanks] = useState({});

  //init player stats and set default settings
  useEffect(() => {
    // Fetch for the stats json file
    const getStats = () => {
      fetch("stats.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          setPlayers(json);
        });
    };
    getStats();

    //Get sentimet status from local storage
    if (localStorage.getItem("sentimentStatus")) setSentimentStatus(JSON.parse(localStorage.getItem("sentimentStatus")));

    //Get draft status from local storage
    if (localStorage.getItem("draftStatus")) setDraftStatus(JSON.parse(localStorage.getItem("draftStatus")));

    //Get current pick from local storage
    if (localStorage.getItem("currentPick")) setCurrentPick(parseStringToFloat(localStorage.getItem("currentPick")));

    //Set default settings
    if (localStorage.getItem("settings")) setSettings(JSON.parse(localStorage.getItem("settings")));
  }, []);

  // Calculate players' total points and rank (sort)
  useEffect(() => {
    const updateTotalPoints = (players, scoring) => {
      const fantasyPoints = Object.keys(players).map((playerId) => {
        const totalPoints = calculateTotalPoints(scoring, players, parseInt(playerId));
        return [parseInt(playerId), totalPoints];
      });
      //Rank, aka sort players by points
      fantasyPoints.sort((playerA, playerB) => {
        return playerB[1] - playerA[1];
      });
      setPlayersTotalPoints(fantasyPoints);
    };
    updateTotalPoints(players, settings.scoring);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    settings.scoring?.misc_fum,
    settings.scoring?.pass_comp,
    settings.scoring?.pass_int,
    settings.scoring?.pass_td,
    settings.scoring?.pass_yrds,
    settings.scoring?.rec_rec,
    settings.scoring?.rec_td,
    settings.scoring?.rec_yrds,
    settings.scoring?.rush_td,
    settings.scoring?.rush_yrds,
    settings.scoring?.k_fg,
    settings.scoring?.k_mfg,
    settings.scoring?.k_xpt,
    settings.scoring?.dst_sk,
    settings.scoring?.dst_int,
    settings.scoring?.dst_fr,
    settings.scoring?.dst_ff,
    settings.scoring?.dst_td,
    settings.scoring?.dst_sf,
    settings.scoring?.dst_pa_0,
    settings.scoring?.dst_pa_1_5,
    settings.scoring?.dst_pa_6_10,
    settings.scoring?.dst_pa_11_15,
    settings.scoring?.dst_pa_16_20,
    settings.scoring?.dst_pa_21_25,
    settings.scoring?.dst_pa_26_30,
    settings.scoring?.dst_pa_31_35,
    settings.scoring?.dst_pa_36_40,
    settings.scoring?.dst_pa_41_plus,
    settings.scoring?.dst_ya_49,
    settings.scoring?.dst_ya_50_99,
    settings.scoring?.dst_ya_100_149,
    settings.scoring?.dst_ya_150_199,
    settings.scoring?.dst_ya_200_249,
    settings.scoring?.dst_ya_250_299,
    settings.scoring?.dst_ya_300_349,
    settings.scoring?.dst_ya_350_399,
    settings.scoring?.dst_ya_400_449,
    settings.scoring?.dst_ya_450_499,
    settings.scoring?.dst_ya_500_plus,
    players,
  ]);

  // Set active, bench, and undrafted players
  useEffect(() => {
    if (
      Object.keys(players).length > 0 &&
      playersTotalPoints.length > 0 &&
      settings.general.teams !== undefined &&
      settings.general.flex_te !== undefined &&
      settings.general.flex_qb !== undefined &&
      settings.roster.qb !== undefined &&
      settings.roster.rb !== undefined &&
      settings.roster.wr !== undefined &&
      settings.roster.te !== undefined &&
      settings.roster.k !== undefined &&
      settings.roster.dst !== undefined &&
      settings.roster.flex !== undefined &&
      settings.roster.bench !== undefined
    )
      setVbdRanks(vbdPointRankings(settings, players, playersTotalPoints));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    players,
    playersTotalPoints,
    settings.general?.teams,
    settings.general?.flex_te,
    settings.general?.flex_qb,
    settings.roster?.qb,
    settings.roster?.rb,
    settings.roster?.wr,
    settings.roster?.te,
    settings.roster?.k,
    settings.roster?.dst,
    settings.roster?.flex,
    settings.roster?.bench,
  ]);

  //Update Draft Status
  const updateDraftStatus = (playerId) => {
    if (draftStatus[playerId]) {
      delete draftStatus[playerId];
      setDraftStatus({
        ...draftStatus,
      });
    } else {
      setDraftStatus({
        ...draftStatus,
        [playerId]: true,
      });
    }
  };
  useEffect(() => {
    localStorage.setItem("draftStatus", JSON.stringify(draftStatus));
  }, [draftStatus]);

  //Update Sentiment Status
  const updateSentimentStatus = (playerId, status = null) => {
    if (sentimentStatus[playerId] !== status) {
      setSentimentStatus({
        ...sentimentStatus,
        [playerId]: status,
      });
    } else {
      delete sentimentStatus[playerId];
      setSentimentStatus({
        ...sentimentStatus,
      });
    }
  };
  useEffect(() => {
    localStorage.setItem("sentimentStatus", JSON.stringify(sentimentStatus));
  }, [sentimentStatus]);

  //Set current pick to local storage
  useEffect(() => {
    localStorage.setItem("currentPick", currentPick);
  }, [currentPick]);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <div className={`app app--${settings.misc?.color_mode}`}>
      <h1 className="visually-hidden">Fantasy Football Draft Kit</h1>
      <Header
        playerSearch={playerSearch}
        setPlayerSearch={setPlayerSearch}
        settings={settings}
        setSettings={setSettings}
        currentPick={currentPick}
        setCurrentPick={setCurrentPick}
      />
      {vbdRanks?.all && (
        <OverallList
          players={players}
          playersTotalPoints={playersTotalPoints}
          vbdRanks={vbdRanks.all}
          sentimentStatus={sentimentStatus}
          updateSentimentStatus={updateSentimentStatus}
          draftStatus={draftStatus}
          updateDraftStatus={updateDraftStatus}
          playerSearch={playerSearch}
          settings={settings}
          currentPick={currentPick}
          setCurrentPick={setCurrentPick}
          playerStatusFilters={playerStatusFilters}
          setPlayerStatusFilters={setPlayerStatusFilters}
        />
      )}
      <PositionalLists
        players={players}
        playersTotalPoints={playersTotalPoints}
        vbdRanks={vbdRanks}
        sentimentStatus={sentimentStatus}
        draftStatus={draftStatus}
        updateDraftStatus={updateDraftStatus}
        playerSearch={playerSearch}
        currentPick={currentPick}
        setCurrentPick={setCurrentPick}
        playerStatusFilters={playerStatusFilters}
      />
      <Settings
        settings={settings}
        setSettings={setSettings}
        setDraftStatus={setDraftStatus}
        setSentimentStatus={setSentimentStatus}
        setCurrentPick={setCurrentPick}
      />
      <MobileMessage />
    </div>
  );
}

export default App;
