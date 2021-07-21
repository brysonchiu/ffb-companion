import React from "react";
import { PlayerCard } from "./PlayerCard";
import { rosterSize, parseStringToFloat } from "../../helpers.js";

export function OverallList({
  players,
  playersTotalPoints,
  sentimentStatus,
  updateSentimentStatus,
  draftStatus,
  updateDraftStatus,
  playerSearch,
  currentPick,
  setCurrentPick,
  settings,
  playerStatusFilters,
  setPlayerStatusFilters,
}) {
  const filteredPlayers = (players, playersTotalPoints, playerSearch) => {
    return playersTotalPoints
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
        if (playerSearch !== "") {
          return players[obj[0]]["PLAYER"].toLowerCase().includes(playerSearch.toLowerCase());
        } else {
          return true;
        }
      });
  };

  const roundLoop = (filteredPlayers, settings) => {
    let player = 0;
    const rounds = [];
    const numberOfRounds = rosterSize(settings) + 1;
    if (filteredPlayers.length >= 1) {
      for (let round = 1; round <= numberOfRounds; round++) {
        let playerLoopReturn = playerLoop(filteredPlayers, settings, round, player);
        player = playerLoopReturn[1];
        rounds.push(
          <React.Fragment key={round}>
            <h3 className="player-list__round-title">
              {round === rosterSize(settings) + 1 ? `Undrafted` : `Round `}
              <span className="text--number">{round === rosterSize(settings) + 1 ? null : round}</span>
            </h3>
            <ul className="player-list__round-list">{playerLoopReturn[0]}</ul>
          </React.Fragment>
        );
      }
    }
    return rounds;
  };

  const playerLoop = (filteredPlayers, settings, round, player) => {
    const playersSplitIntoRounds = [];
    const firstPlayer = player;
    const lastPlayer = round === rosterSize(settings) + 1 ? filteredPlayers.length : firstPlayer + parseStringToFloat(settings.general?.teams);
    for (let i = firstPlayer; i <= lastPlayer; i++) {
      if (
        //If rank is greater than the first pick of the round, and
        //A) If it is not the undrafted round and the rank is less than or eq to the last pick of the round, or
        //B) If it is the undrafted round
        playersTotalPoints.findIndex((el) => el[0] === filteredPlayers[i]?.[0]) + 1 > (round - 1) * parseStringToFloat(settings.general?.teams) &&
        ((round !== rosterSize(settings) + 1 &&
          playersTotalPoints.findIndex((el) => el[0] === filteredPlayers[i]?.[0]) + 1 <= round * parseStringToFloat(settings.general?.teams)) ||
          round === rosterSize(settings) + 1)
      ) {
        playersSplitIntoRounds.push(
          <PlayerCard
            key={filteredPlayers[i]?.[0]}
            playerId={filteredPlayers[i]?.[0]}
            rank={playersTotalPoints.findIndex((el) => el[0] === filteredPlayers[i]?.[0]) + 1}
            team={players[filteredPlayers[i]?.[0]]?.["TEAM"]}
            overallPoints={filteredPlayers[i]?.[1]}
            position={players[filteredPlayers[i]?.[0]]?.["POSITION"]}
            player={players[filteredPlayers[i]?.[0]]?.["PLAYER"]}
            sentimentStatus={sentimentStatus[filteredPlayers[i]?.[0]]}
            updateSentimentStatus={updateSentimentStatus}
            draftStatus={draftStatus[filteredPlayers[i]?.[0]]}
            updateDraftStatus={updateDraftStatus}
            sentiment={true}
            currentPick={currentPick}
            setCurrentPick={setCurrentPick}
          />
        );
        player = i;
      }
    }
    return [playersSplitIntoRounds, player];
  };

  const handlePlayerStatusFilters = (e) => {
    setPlayerStatusFilters({ ...playerStatusFilters, [e.target.name]: !playerStatusFilters[e.target.name] });
  };

  return (
    <div className="overall-list">
      <div className="list-head">
        <h2 className="list-heading">Overall</h2>
        <fieldset className="player-filter">
          <legend>Filter</legend>
          {Object.keys(playerStatusFilters).map((key) => (
            <div className="player-filter__input-container" key={key}>
              <input type="checkbox" id={`filter-${key}`} name={key} checked={playerStatusFilters[key]} onChange={handlePlayerStatusFilters} />
              <label htmlFor={`filter-${key}`}>
                <span className="visually-hidden">{key}</span>
              </label>
            </div>
          ))}
        </fieldset>
      </div>
      <div className="player-list">{roundLoop(filteredPlayers(players, playersTotalPoints, playerSearch), settings)}</div>
    </div>
  );
}
