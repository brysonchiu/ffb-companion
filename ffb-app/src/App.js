import { useState, useEffect } from "react";
import { Header } from "./components/Header.js";
import { OverallList } from "./components/player/OverallList.js";
import { PositionalLists } from "./components/player/PositionalLists.js";
import { Settings } from "./components/Settings.js";
import { parseStringToFloat } from "./helpers.js";

function App() {
  const [players, setPlayers] = useState({});
  const [draftStatus, setDraftStatus] = useState({});
  const [sentimentStatus, setSentimentStatus] = useState({});
  const [filter, setFilter] = useState("");
  const [settings, setSettings] = useState({});
  const [currentPick, setCurrentPick] = useState(1);
  const [playersTotalPoints, setPlayersTotalPoints] = useState([]);

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
    if (localStorage.getItem("currentPick")) setCurrentPick(localStorage.getItem("currentPick"));

    //Set default settings
    setSettings({
      general: {
        teams: 12,
        user_pick: 1,
      },
      roster: {
        qb: 1,
        rb: 2,
        wr: 2,
        te: 1,
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
        misc_fum: -2,
      },
      misc: {
        menu_open: false,
        color_mode: "light",
      },
    });
  }, [setSettings, setPlayers]);

  // Calculate players' total points and rank (sort)
  useEffect(() => {
    const updateTotalPoints = (players) => {
      const fantasyPoints = [];
      Object.keys(players).map((playerId) => {
        let totalPoints = 0;
        totalPoints += parseStringToFloat(settings.scoring.misc_fum) * parseStringToFloat(players[playerId]["MISC FL"]);
        totalPoints += parseStringToFloat(settings.scoring.pass_comp) * parseStringToFloat(players[playerId]["PASSING CMP"]);
        totalPoints += parseStringToFloat(settings.scoring.pass_int) * parseStringToFloat(players[playerId]["PASSING INTS"]);
        totalPoints += parseStringToFloat(settings.scoring.pass_td) * parseStringToFloat(players[playerId]["PASSING TDS"]);
        totalPoints += parseStringToFloat(settings.scoring.pass_yrds) * parseStringToFloat(players[playerId]["PASSING YDS"]);
        totalPoints += parseStringToFloat(settings.scoring.rec_rec) * parseStringToFloat(players[playerId]["RECEIVING REC"]);
        totalPoints += parseStringToFloat(settings.scoring.rec_td) * parseStringToFloat(players[playerId]["RECEIVING TDS"]);
        totalPoints += parseStringToFloat(settings.scoring.rec_yrds) * parseStringToFloat(players[playerId]["RECEIVING YDS"]);
        totalPoints += parseStringToFloat(settings.scoring.rush_td) * parseStringToFloat(players[playerId]["RUSHING TDS"]);
        totalPoints += parseStringToFloat(settings.scoring.rush_yrds) * parseStringToFloat(players[playerId]["RUSHING YDS"]);
        return fantasyPoints.push([playerId, totalPoints]);
      });
      //Rank, aka sort players by points
      fantasyPoints.sort((playerA, playerB) => {
        return playerB[1] - playerA[1];
      });
      setPlayersTotalPoints(fantasyPoints);
    };
    updateTotalPoints(players);
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
    players,
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

  return (
    <div className={`app app--${settings.misc?.color_mode}`}>
      <Header filter={filter} setFilter={setFilter} settings={settings} setSettings={setSettings} currentPick={currentPick} setCurrentPick={setCurrentPick} />
      <OverallList
        players={players}
        playersTotalPoints={playersTotalPoints}
        sentimentStatus={sentimentStatus}
        updateSentimentStatus={updateSentimentStatus}
        draftStatus={draftStatus}
        updateDraftStatus={updateDraftStatus}
        filter={filter}
        settings={settings}
        currentPick={currentPick}
        setCurrentPick={setCurrentPick}
      />
      <PositionalLists
        players={players}
        playersTotalPoints={playersTotalPoints}
        sentimentStatus={sentimentStatus}
        draftStatus={draftStatus}
        updateDraftStatus={updateDraftStatus}
        filter={filter}
        currentPick={currentPick}
        setCurrentPick={setCurrentPick}
      />
      <Settings
        settings={settings}
        setSettings={setSettings}
        setDraftStatus={setDraftStatus}
        setSentimentStatus={setSentimentStatus}
        setCurrentPick={setCurrentPick}
      />
    </div>
  );
}

export default App;
