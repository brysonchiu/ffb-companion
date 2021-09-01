import React, { useState } from "react";
import { PlayerCard } from "./PlayerCard";
import { IconDownCaret } from "../icons/down-caret.js";

export function PositionalLists({
  players,
  playersTotalPoints,
  vbdRanks,
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
    K: null,
    DST: "dst1",
  });

  //Handle Stats Dropdown
  const handleStatsDropdown = (e) => {
    const newDisplayedStats = { ...displayedStats, [e.target.name]: e.target.value };
    setDisplayedStats(newDisplayedStats);
  };

  //Get the Total player's points
  const getTotalPoints = (playerId) => {
    const index = playersTotalPoints.findIndex((player) => player[0] === playerId);
    return playersTotalPoints[index][1];
  };

  //Display Dropdown Label Text
  const displayPositionName = (position) => {
    switch (position) {
      case "QB":
        return "Select Quarterback Stats";
      case "RB":
        return "Select Running Back Stats";
      case "WR":
        return "Select Wide Reciever Stats";
      case "TE":
        return "Select Tight End Stats";
      case "K":
        return "Select Kicker Stats";
      case "DST":
        return "Select Defense and Special Teams Stats";
      default:
        return "Select Position Stats";
    }
  };

  //Display Dropdown Options by Position
  const displayDropDownOptions = (position) => {
    switch (position) {
      case "QB":
        return (
          <React.Fragment>
            <option value="pass">Passing</option>
            <option value="rush">Rushing</option>
            <option value="misc">Misc</option>
          </React.Fragment>
        );
      case "RB":
        return (
          <React.Fragment>
            <option value="rush">Rushing</option>
            <option value="rec">Receiving</option>
            <option value="misc">Misc</option>
          </React.Fragment>
        );
      case "WR":
        return (
          <React.Fragment>
            <option value="rush">Rushing</option>
            <option value="rec">Receiving</option>
            <option value="misc">Misc</option>
          </React.Fragment>
        );
      case "TE":
        return (
          <React.Fragment>
            <option value="rec">Receiving</option>
            <option value="misc">Misc</option>
          </React.Fragment>
        );
      case "DST":
        return (
          <React.Fragment>
            <option value="dst1">Sacks & Turnovers</option>
            <option value="dst2">Scoring & Allowances</option>
          </React.Fragment>
        );
      default:
        return null;
    }
  };

  //Display the stats dropdowns
  const displayDropDown = (position) => {
    const posLowerCase = position.toLowerCase();
    if (position !== "K") {
      return (
        <div className="stats-dropdrown__container">
          <label htmlFor={`${posLowerCase}-select`} className="visually-hidden">
            {displayPositionName(position)}
          </label>
          <select
            className="stats-dropdrown"
            dir="rtl"
            name={position}
            id={`${posLowerCase}-select`}
            value={displayedStats[position]}
            onChange={(e) => handleStatsDropdown(e)}
          >
            {displayDropDownOptions(position)}
          </select>
          <IconDownCaret />
        </div>
      );
    }
  };

  //Display each positional list
  const displayLists = (position, listType) => {
    if (vbdRanks?.[listType]?.filter((obj) => players?.[obj?.[0]]?.["POSITION"] === position).length > 0) {
      return (
        <React.Fragment>
          <h3 className="player-list__title">{listType.charAt(0).toUpperCase() + listType.slice(1)}</h3>
          <ul className="player-list__list">
            {vbdRanks[listType]
              .filter((obj) => players[obj[0]]["POSITION"] === position)
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
                if (playerSearch !== "" && players[obj[0]]["TEAM"]) {
                  return (
                    players[obj[0]]["PLAYER"].toLowerCase().includes(playerSearch.toLowerCase()) ||
                    players[obj[0]]["TEAM"].toLowerCase().includes(playerSearch.toLowerCase())
                  );
                } else if (playerSearch !== "") {
                  return players[obj[0]]["PLAYER"].toLowerCase().includes(playerSearch.toLowerCase());
                } else {
                  return true;
                }
              })
              .map((obj) => (
                <PlayerCard
                  key={obj[0]}
                  playerId={obj[0]}
                  rank={vbdRanks.all.findIndex((el) => el[0] === obj[0]) + 1}
                  playerTotalPoints={getTotalPoints(obj[0])}
                  player={players[obj[0]]["PLAYER"]}
                  team={players[obj[0]]["TEAM"]}
                  stats={players[obj[0]]}
                  sentimentStatus={sentimentStatus[obj[0]]}
                  draftStatus={draftStatus[obj[0]]}
                  updateDraftStatus={updateDraftStatus}
                  displayedStats={displayedStats[position]}
                  currentPick={currentPick}
                  setCurrentPick={setCurrentPick}
                />
              ))}
          </ul>
        </React.Fragment>
      );
    }
  };

  return (
    <div className="positional-list__container">
      {Object.keys(displayedStats).map((position) => {
        const posLowerCase = position.toLowerCase();
        if (
          vbdRanks?.["starters"]?.filter((obj) => players?.[obj?.[0]]?.["POSITION"] === position).length > 0 ||
          vbdRanks?.["bench"]?.filter((obj) => players?.[obj?.[0]]?.["POSITION"] === position).length > 0 ||
          vbdRanks?.["undrafted"]?.filter((obj) => players?.[obj?.[0]]?.["POSITION"] === position).length > 0
        ) {
          return (
            <div key={posLowerCase} className={`positional-list positional-list__${posLowerCase}`}>
              <div className="list-head">
                <h2 className="list-heading">{position}</h2>
                {displayDropDown(position)}
              </div>
              {vbdRanks?.starters && vbdRanks?.bench && vbdRanks?.undrafted && players && (
                <div className="player-list">
                  {displayLists(position, "starters")}
                  {displayLists(position, "bench")}
                  {displayLists(position, "undrafted")}
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}
