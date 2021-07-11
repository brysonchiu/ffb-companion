import { useState, useEffect } from "react";
import { Header } from "./components/Header.js";
import { OverallList } from "./components/player/OverallList.js";
import { PositionalLists } from "./components/player/PositionalLists.js";
import { Settings } from "./components/Settings.js";

function App() {
  const [players, setPlayers] = useState({});
  const [ranks, setRanks] = useState([]);
  const [playerStatus, setPlayerStatus] = useState([]);
  const [filter, setFilter] = useState("Search Player");
  const [settings, setSettings] = useState({});
  const [currentPick, setCurrentPick] = useState(1);

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
          rankPlayers(json);
          playStatusInit(json);
        });
    };
    getStats();

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
  }, []);

  // Rank players and return an array of ranked players and players with ranking attribute
  const rankPlayers = (playersObject) => {
    const rankedPlayers = [];
    const rankedIds = [];
    for (var playerId in playersObject) {
      rankedPlayers.push([playerId, playersObject[playerId]["MISC FPTS"]]);
    }
    rankedPlayers.sort((a, b) => {
      return b[1] - a[1];
    });
    rankedPlayers.forEach((player, index) => {
      playersObject[player[0]]["RANK"] = index + 1;
      rankedIds.push(player[0]);
    });
    setPlayers(playersObject);
    setRanks(rankedIds);
  };

  //Return an object with player status set to unpicked and no sentiment
  const playStatusInit = (playersObject) => {
    const playerStatus = {};
    Object.keys(playersObject).map((playerId) => {
      return (playerStatus[playerId] = {
        drafted: false,
        sentiment: null,
      });
    });
    setPlayerStatus(playerStatus);
  };

  //Update Player Status
  const updatePlayerStatus = (playerId, statusCat, status = null) => {
    const updateStatus = { ...playerStatus };
    if (statusCat === "drafted") {
      updateStatus[playerId][statusCat] ? (updateStatus[playerId][statusCat] = false) : (updateStatus[playerId][statusCat] = true);
    } else if (statusCat === "sentiment") {
      updateStatus[playerId][statusCat] !== status ? (updateStatus[playerId][statusCat] = status) : (updateStatus[playerId][statusCat] = null);
    }
    setPlayerStatus(updateStatus);
  };

  return (
    <div className="app app--light">
      <Header filter={filter} setFilter={setFilter} settings={settings} setSettings={setSettings} currentPick={currentPick} setCurrentPick={setCurrentPick} />
      <OverallList
        players={players}
        ranks={ranks}
        playerStatus={playerStatus}
        updatePlayerStatus={updatePlayerStatus}
        filter={filter}
        settings={settings}
        currentPick={currentPick}
        setCurrentPick={setCurrentPick}
      />
      <PositionalLists
        players={players}
        ranks={ranks}
        playerStatus={playerStatus}
        updatePlayerStatus={updatePlayerStatus}
        filter={filter}
        settings={settings}
        currentPick={currentPick}
        setCurrentPick={setCurrentPick}
      />
      <Settings settings={settings} setSettings={setSettings} />
    </div>
  );
}

export default App;
