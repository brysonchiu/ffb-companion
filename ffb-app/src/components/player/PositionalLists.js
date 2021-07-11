import { useState, useEffect } from "react";
import { PlayerCard } from "./PlayerCard";
import { IconDownCaret } from "../icons/down-caret.js";

export function PositionalLists({ players, ranks, playerStatus, updatePlayerStatus, filter, currentPick, setCurrentPick }) {
  const [displayedStats, setDisplayedStats] = useState({});

  // set default displayed stats
  useEffect(() => {
    setDisplayedStats({
      QB: "pass",
      RB: "rush",
      WR: "rec",
      TE: "rec",
    });
  }, []);

  //Handle Stats Dropdown
  const handleStatsDropdown = (e) => {
    const newDisplayedStats = { ...displayedStats, [e.target.name]: e.target.value };
    setDisplayedStats(newDisplayedStats);
  };

  return (
    <div className="positional-list__container">
      <div className="positional-list positional-list__qb">
        <div className="list-head">
          <h2 className="list-heading">QB</h2>
          <div className="stats-dropdrown__container">
            <label htmlFor="qb-select" className="visually-hidden">
              Select Quarterback Stats
            </label>
            <select className="stats-dropdrown" dir="rtl" name="QB" id="qb-select" value={displayedStats["qb"]} onChange={(e) => handleStatsDropdown(e)}>
              <option value="pass">Passing</option>
              <option value="rush">Rushing</option>
              <option value="misc">Misc</option>
            </select>
            <IconDownCaret />
          </div>
        </div>
        <ul className="player-list">
          {ranks
            .filter((playerId) => players[playerId]["POSITION"] === "QB")
            .filter((playerId) => {
              if (filter.toLowerCase() !== "search player" && filter !== "") {
                return players[playerId]["PLAYER"].toLowerCase().includes(filter.toLowerCase());
              } else {
                return true;
              }
            })
            .map((playerId, index) => (
              <PlayerCard
                key={playerId}
                playerId={playerId}
                rank={players[playerId]["RANK"]}
                player={players[playerId]["PLAYER"]}
                points={players[playerId]["MISC FPTS"]}
                stats={players[playerId]}
                playerStatus={playerStatus[playerId]}
                updatePlayerStatus={updatePlayerStatus}
                displayedStats={displayedStats["QB"]}
                currentPick={currentPick}
                setCurrentPick={setCurrentPick}
              />
            ))}
        </ul>
      </div>
      <div className="positional-list positional-list__rb">
        <div className="list-head">
          <h2 className="list-heading">RB</h2>
          <div className="stats-dropdrown__container">
            <label htmlFor="rb-select" className="visually-hidden">
              Select Runningback Stats
            </label>
            <select className="stats-dropdrown" dir="rtl" name="RB" id="rb-select" value={displayedStats["rb"]} onChange={(e) => handleStatsDropdown(e)}>
              <option value="rush">Rushing</option>
              <option value="rec">Receiving</option>
              <option value="misc">Misc</option>
            </select>
            <IconDownCaret />
          </div>
        </div>
        <ul className="player-list">
          {ranks
            .filter((playerId) => players[playerId]["POSITION"] === "RB")
            .filter((playerId) => {
              if (filter.toLowerCase() !== "search player" && filter !== "") {
                return players[playerId]["PLAYER"].toLowerCase().includes(filter.toLowerCase());
              } else {
                return true;
              }
            })
            .map((playerId, index) => (
              <PlayerCard
                key={playerId}
                playerId={playerId}
                rank={players[playerId]["RANK"]}
                player={players[playerId]["PLAYER"]}
                points={players[playerId]["MISC FPTS"]}
                stats={players[playerId]}
                playerStatus={playerStatus[playerId]}
                updatePlayerStatus={updatePlayerStatus}
                displayedStats={displayedStats["RB"]}
                currentPick={currentPick}
                setCurrentPick={setCurrentPick}
              />
            ))}
        </ul>
      </div>
      <div className="positional-list positional-list__wr">
        <div className="list-head">
          <h2 className="list-heading">WR</h2>
          <div className="stats-dropdrown__container">
            <label htmlFor="wr-select" className="visually-hidden">
              Select Wide Receiver Stats
            </label>
            <select className="stats-dropdrown" dir="rtl" name="WR" id="wr-select" value={displayedStats["wr"]} onChange={(e) => handleStatsDropdown(e)}>
              <option value="rec">Receiving</option>
              <option value="rush">Rushing</option>
              <option value="misc">Misc</option>
            </select>
            <IconDownCaret />
          </div>
        </div>
        <ul className="player-list">
          {ranks
            .filter((playerId) => players[playerId]["POSITION"] === "WR")
            .filter((playerId) => {
              if (filter.toLowerCase() !== "search player" && filter !== "") {
                return players[playerId]["PLAYER"].toLowerCase().includes(filter.toLowerCase());
              } else {
                return true;
              }
            })
            .map((playerId, index) => (
              <PlayerCard
                key={playerId}
                playerId={playerId}
                rank={players[playerId]["RANK"]}
                player={players[playerId]["PLAYER"]}
                points={players[playerId]["MISC FPTS"]}
                stats={players[playerId]}
                playerStatus={playerStatus[playerId]}
                updatePlayerStatus={updatePlayerStatus}
                displayedStats={displayedStats["WR"]}
                currentPick={currentPick}
                setCurrentPick={setCurrentPick}
              />
            ))}
        </ul>
      </div>
      <div className="positional-list positional-list__te">
        <div className="list-head">
          <h2 className="list-heading">TE</h2>
          <div className="stats-dropdrown__container">
            <label htmlFor="te-select" className="visually-hidden">
              Select Tight End Stats
            </label>
            <select className="stats-dropdrown" dir="rtl" name="TE" id="te-select" value={displayedStats["te"]} onChange={(e) => handleStatsDropdown(e)}>
              <option value="rec">Receiving</option>
              <option value="misc">Misc</option>
            </select>
            <IconDownCaret />
          </div>
        </div>
        <ul className="player-list">
          {ranks
            .filter((playerId) => players[playerId]["POSITION"] === "TE")
            .filter((playerId) => {
              if (filter.toLowerCase() !== "search player" && filter !== "") {
                return players[playerId]["PLAYER"].toLowerCase().includes(filter.toLowerCase());
              } else {
                return true;
              }
            })
            .map((playerId, index) => (
              <PlayerCard
                key={playerId}
                playerId={playerId}
                rank={players[playerId]["RANK"]}
                player={players[playerId]["PLAYER"]}
                points={players[playerId]["MISC FPTS"]}
                stats={players[playerId]}
                playerStatus={playerStatus[playerId]}
                updatePlayerStatus={updatePlayerStatus}
                displayedStats={displayedStats["TE"]}
                currentPick={currentPick}
                setCurrentPick={setCurrentPick}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
