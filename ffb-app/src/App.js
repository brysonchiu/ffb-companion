import { useState, useEffect } from "react";
import { Header } from "./components/Header.js";
import { OverallList } from "./components/player/OverallList.js";
import { PositionalLists } from "./components/player/PositionalLists.js";

function App() {
  const [players, setPlayers] = useState({});
  const [ranks, setRanks] = useState([]);
  const [playerStatus, setPlayerStatus] = useState([]);
  const [filter, setFilter] = useState("");

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

    //Set filter default value of "Search Player"
    setFilter("Search Player");
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
      <Header filter={filter} setFilter={setFilter} />
      <OverallList players={players} ranks={ranks} playerStatus={playerStatus} updatePlayerStatus={updatePlayerStatus} filter={filter} />
      <PositionalLists players={players} ranks={ranks} playerStatus={playerStatus} updatePlayerStatus={updatePlayerStatus} filter={filter} />
    </div>
  );
}

export default App;
