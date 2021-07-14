import { useState, useEffect } from "react";
import { Header } from "./components/Header.js";
import { OverallList } from "./components/player/OverallList.js";
import { PositionalLists } from "./components/player/PositionalLists.js";
import { Settings } from "./components/Settings.js";

function App() {
  const [players, setPlayers] = useState({});
  const [ranks, setRanks] = useState([]);
  const [playerStatus, setPlayerStatus] = useState({});
  const [filter, setFilter] = useState("");
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
  }, [setSettings]);

  useEffect(() => {
    // Calculate player's total points and update ranks
    const updateTotalPoints = () => {
      const updatePlayers = { ...players };
      Object.keys(updatePlayers).map((playerId) => {
        let totalPoints = 0;
        updatePlayers[playerId]["MISC FL"] &&
          updatePlayers[playerId]["MISC FL"] !== "" &&
          (totalPoints += parseFloat(settings.scoring.misc_fum) * parseFloat(updatePlayers[playerId]["MISC FL"]));
        updatePlayers[playerId]["PASSING CMP"] &&
          updatePlayers[playerId]["PASSING CMP"] !== "" &&
          (totalPoints += parseFloat(settings.scoring.pass_comp) * parseFloat(updatePlayers[playerId]["PASSING CMP"]));
        updatePlayers[playerId]["PASSING INTS"] &&
          updatePlayers[playerId]["PASSING INTS"] !== "" &&
          (totalPoints += parseFloat(settings.scoring.pass_int) * parseFloat(updatePlayers[playerId]["PASSING INTS"]));
        updatePlayers[playerId]["PASSING TDS"] &&
          updatePlayers[playerId]["PASSING TDS"] !== "" &&
          (totalPoints += parseFloat(settings.scoring.pass_td) * parseFloat(updatePlayers[playerId]["PASSING TDS"]));
        updatePlayers[playerId]["PASSING YDS"] &&
          updatePlayers[playerId]["PASSING YDS"] !== "" &&
          (totalPoints += parseFloat(settings.scoring.pass_yrds) * parseFloat(updatePlayers[playerId]["PASSING YDS"]));
        updatePlayers[playerId]["RECEIVING REC"] &&
          updatePlayers[playerId]["RECEIVING REC"] !== "" &&
          (totalPoints += parseFloat(settings.scoring.rec_rec) * parseFloat(updatePlayers[playerId]["RECEIVING REC"]));
        updatePlayers[playerId]["RECEIVING TDS"] &&
          updatePlayers[playerId]["RECEIVING TDS"] !== "" &&
          (totalPoints += parseFloat(settings.scoring.rec_td) * parseFloat(updatePlayers[playerId]["RECEIVING TDS"]));
        updatePlayers[playerId]["RECEIVING YDS"] &&
          updatePlayers[playerId]["RECEIVING YDS"] !== "" &&
          (totalPoints += parseFloat(settings.scoring.rec_yrds) * parseFloat(updatePlayers[playerId]["RECEIVING YDS"]));
        updatePlayers[playerId]["RUSHING TDS"] &&
          updatePlayers[playerId]["RUSHING TDS"] !== "" &&
          (totalPoints += parseFloat(settings.scoring.rush_td) * parseFloat(updatePlayers[playerId]["RUSHING TDS"]));
        updatePlayers[playerId]["RUSHING YDS"] &&
          updatePlayers[playerId]["RUSHING YDS"] !== "" &&
          (totalPoints += parseFloat(settings.scoring.rush_yrds) * parseFloat(updatePlayers[playerId]["RUSHING YDS"]));
        return (updatePlayers[playerId]["MISC FPTS"] = totalPoints);
      });
      rankPlayers(updatePlayers);
    };
    updateTotalPoints();
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
  ]);

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

  //Update Player Status
  const updatePlayerStatus = (playerId, statusCat, status = null) => {
    if (statusCat === "drafted") {
      if (playerStatus[playerId]?.[statusCat]) {
        setPlayerStatus({
          ...playerStatus,
          [playerId]: {
            ...playerStatus[playerId],
            [statusCat]: false,
          },
        });
      } else {
        setPlayerStatus({
          ...playerStatus,
          [playerId]: {
            ...playerStatus[playerId],
            [statusCat]: true,
          },
        });
      }
    } else if (statusCat === "sentiment") {
      if (playerStatus[playerId]?.[statusCat] !== status) {
        setPlayerStatus({
          ...playerStatus,
          [playerId]: {
            ...playerStatus[playerId],
            [statusCat]: status,
          },
        });
      } else {
        setPlayerStatus({
          ...playerStatus,
          [playerId]: {
            ...playerStatus[playerId],
            [statusCat]: null,
          },
        });
      }
    }
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
