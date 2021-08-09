import { useState } from "react";
import { PlayerCard } from "./PlayerCard";
import { IconDownCaret } from "../icons/down-caret.js";

export function PositionalLists({
  players,
  playersTotalPoints,
  sentimentStatus,
  draftStatus,
  updateDraftStatus,
  playerSearch,
  currentPick,
  setCurrentPick,
  playerStatusFilters,
}) {
  //Set display stats initial state
  const [displayedStats, setDisplayedStats] = useState({
    QB: "pass",
    RB: "rush",
    WR: "rec",
    TE: "rec",
    DST: "dst1",
  });

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
          {playersTotalPoints
            .filter((obj) => players[obj[0]]["POSITION"] === "QB")
            .filter((obj) => {
              ///check if draft status and filter status are in line
              if ((draftStatus[obj[0]] && playerStatusFilters.drafted) || (!draftStatus[obj[0]] && playerStatusFilters.undrafted)) {
                //then check if sentiment status and filters are true
                if (sentimentStatus[obj[0]]) {
                  let sentiment = sentimentStatus[obj[0]];
                  return playerStatusFilters[sentiment];
                } else {
                  return true;
                }
              } else {
                return false;
              }
            })
            .filter((obj) => {
              if (playerSearch.toLowerCase() !== "search player" && playerSearch !== "") {
                return players[obj[0]]["PLAYER"].toLowerCase().includes(playerSearch.toLowerCase());
              } else {
                return true;
              }
            })
            .map((obj) => (
              <PlayerCard
                key={obj[0]}
                playerId={obj[0]}
                rank={playersTotalPoints.findIndex((el) => el[0] === obj[0]) + 1}
                playerTotalPoints={obj[1]}
                player={players[obj[0]]["PLAYER"]}
                stats={players[obj[0]]}
                sentimentStatus={sentimentStatus[obj[0]]}
                draftStatus={draftStatus[obj[0]]}
                updateDraftStatus={updateDraftStatus}
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
          {playersTotalPoints
            .filter((obj) => players[obj[0]]["POSITION"] === "RB")
            .filter((obj) => {
              ///check if draft status and filter status are in line
              if ((draftStatus[obj[0]] && playerStatusFilters.drafted) || (!draftStatus[obj[0]] && playerStatusFilters.undrafted)) {
                //then check if sentiment status and filters are true
                if (sentimentStatus[obj[0]]) {
                  let sentiment = sentimentStatus[obj[0]];
                  return playerStatusFilters[sentiment];
                } else {
                  return true;
                }
              } else {
                return false;
              }
            })
            .filter((obj) => {
              if (playerSearch.toLowerCase() !== "search player" && playerSearch !== "") {
                return players[obj[0]]["PLAYER"].toLowerCase().includes(playerSearch.toLowerCase());
              } else {
                return true;
              }
            })
            .map((obj) => (
              <PlayerCard
                key={obj[0]}
                playerId={obj[0]}
                rank={playersTotalPoints.findIndex((el) => el[0] === obj[0]) + 1}
                playerTotalPoints={obj[1]}
                player={players[obj[0]]["PLAYER"]}
                stats={players[obj[0]]}
                sentimentStatus={sentimentStatus[obj[0]]}
                draftStatus={draftStatus[obj[0]]}
                updateDraftStatus={updateDraftStatus}
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
          {playersTotalPoints
            .filter((obj) => players[obj[0]]["POSITION"] === "WR")
            .filter((obj) => {
              ///check if draft status and filter status are in line
              if ((draftStatus[obj[0]] && playerStatusFilters.drafted) || (!draftStatus[obj[0]] && playerStatusFilters.undrafted)) {
                //then check if sentiment status and filters are true
                if (sentimentStatus[obj[0]]) {
                  let sentiment = sentimentStatus[obj[0]];
                  return playerStatusFilters[sentiment];
                } else {
                  return true;
                }
              } else {
                return false;
              }
            })
            .filter((obj) => {
              if (playerSearch.toLowerCase() !== "search player" && playerSearch !== "") {
                return players[obj[0]]["PLAYER"].toLowerCase().includes(playerSearch.toLowerCase());
              } else {
                return true;
              }
            })
            .map((obj) => (
              <PlayerCard
                key={obj[0]}
                playerId={obj[0]}
                rank={playersTotalPoints.findIndex((el) => el[0] === obj[0]) + 1}
                playerTotalPoints={obj[1]}
                player={players[obj[0]]["PLAYER"]}
                stats={players[obj[0]]}
                sentimentStatus={sentimentStatus[obj[0]]}
                draftStatus={draftStatus[obj[0]]}
                updateDraftStatus={updateDraftStatus}
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
          {playersTotalPoints
            .filter((obj) => players[obj[0]]["POSITION"] === "TE")
            .filter((obj) => {
              ///check if draft status and filter status are in line
              if ((draftStatus[obj[0]] && playerStatusFilters.drafted) || (!draftStatus[obj[0]] && playerStatusFilters.undrafted)) {
                //then check if sentiment status and filters are true
                if (sentimentStatus[obj[0]]) {
                  let sentiment = sentimentStatus[obj[0]];
                  return playerStatusFilters[sentiment];
                } else {
                  return true;
                }
              } else {
                return false;
              }
            })
            .filter((obj) => {
              if (playerSearch.toLowerCase() !== "search player" && playerSearch !== "") {
                return players[obj[0]]["PLAYER"].toLowerCase().includes(playerSearch.toLowerCase());
              } else {
                return true;
              }
            })
            .map((obj) => (
              <PlayerCard
                key={obj[0]}
                playerId={obj[0]}
                rank={playersTotalPoints.findIndex((el) => el[0] === obj[0]) + 1}
                playerTotalPoints={obj[1]}
                player={players[obj[0]]["PLAYER"]}
                stats={players[obj[0]]}
                sentimentStatus={sentimentStatus[obj[0]]}
                draftStatus={draftStatus[obj[0]]}
                updateDraftStatus={updateDraftStatus}
                displayedStats={displayedStats["TE"]}
                currentPick={currentPick}
                setCurrentPick={setCurrentPick}
              />
            ))}
        </ul>
      </div>
      <div className="positional-list positional-list__k">
        <div className="list-head">
          <h2 className="list-heading">K</h2>
        </div>
        <ul className="player-list">
          {playersTotalPoints
            .filter((obj) => players[obj[0]]["POSITION"] === "K")
            .filter((obj) => {
              ///check if draft status and filter status are in line
              if ((draftStatus[obj[0]] && playerStatusFilters.drafted) || (!draftStatus[obj[0]] && playerStatusFilters.undrafted)) {
                //then check if sentiment status and filters are true
                if (sentimentStatus[obj[0]]) {
                  let sentiment = sentimentStatus[obj[0]];
                  return playerStatusFilters[sentiment];
                } else {
                  return true;
                }
              } else {
                return false;
              }
            })
            .filter((obj) => {
              if (playerSearch.toLowerCase() !== "search player" && playerSearch !== "") {
                return players[obj[0]]["PLAYER"].toLowerCase().includes(playerSearch.toLowerCase());
              } else {
                return true;
              }
            })
            .map((obj) => (
              <PlayerCard
                key={obj[0]}
                playerId={obj[0]}
                rank={playersTotalPoints.findIndex((el) => el[0] === obj[0]) + 1}
                playerTotalPoints={obj[1]}
                player={players[obj[0]]["PLAYER"]}
                stats={players[obj[0]]}
                sentimentStatus={sentimentStatus[obj[0]]}
                draftStatus={draftStatus[obj[0]]}
                updateDraftStatus={updateDraftStatus}
                currentPick={currentPick}
                setCurrentPick={setCurrentPick}
              />
            ))}
        </ul>
      </div>
      <div className="positional-list positional-list__dst">
        <div className="list-head">
          <h2 className="list-heading">DST</h2>
          <div className="stats-dropdrown__container">
            <label htmlFor="dst-select" className="visually-hidden">
              Select Wide Receiver Stats
            </label>
            <select className="stats-dropdrown" dir="rtl" name="DST" id="dst-select" value={displayedStats["dst"]} onChange={(e) => handleStatsDropdown(e)}>
              <option value="dst1">Sacks & Turnovers</option>
              <option value="dst2">Scoring & Allowances</option>
            </select>
            <IconDownCaret />
          </div>
        </div>
        <ul className="player-list">
          {playersTotalPoints
            .filter((obj) => players[obj[0]]["POSITION"] === "DST")
            .filter((obj) => {
              ///check if draft status and filter status are in line
              if ((draftStatus[obj[0]] && playerStatusFilters.drafted) || (!draftStatus[obj[0]] && playerStatusFilters.undrafted)) {
                //then check if sentiment status and filters are true
                if (sentimentStatus[obj[0]]) {
                  let sentiment = sentimentStatus[obj[0]];
                  return playerStatusFilters[sentiment];
                } else {
                  return true;
                }
              } else {
                return false;
              }
            })
            .filter((obj) => {
              if (playerSearch.toLowerCase() !== "search player" && playerSearch !== "") {
                return players[obj[0]]["PLAYER"].toLowerCase().includes(playerSearch.toLowerCase());
              } else {
                return true;
              }
            })
            .map((obj) => (
              <PlayerCard
                key={obj[0]}
                playerId={obj[0]}
                rank={playersTotalPoints.findIndex((el) => el[0] === obj[0]) + 1}
                playerTotalPoints={obj[1]}
                player={players[obj[0]]["PLAYER"]}
                stats={players[obj[0]]}
                sentimentStatus={sentimentStatus[obj[0]]}
                draftStatus={draftStatus[obj[0]]}
                updateDraftStatus={updateDraftStatus}
                displayedStats={displayedStats["DST"]}
                currentPick={currentPick}
                setCurrentPick={setCurrentPick}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
