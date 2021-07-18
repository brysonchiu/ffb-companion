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
  filter,
  currentPick,
  setCurrentPick,
  settings,
}) {
  let player = 0;
  const filteredPlayers = (playersTotalPoints) => {
    return playersTotalPoints.filter((obj) => {
      if (filter !== "") {
        return players[obj[0]]["PLAYER"].toLowerCase().includes(filter.toLowerCase());
      } else {
        return true;
      }
    });
  };

  const roundLoop = (filteredPlayers, settings) => {
    const rounds = [];
    const numberOfRounds = rosterSize(settings) + 1;
    if (filteredPlayers.length > 1) {
      for (let round = 1; round <= numberOfRounds; round++) {
        rounds.push(
          <React.Fragment key={round}>
            <h3 className="player-list__round-title">{round === rosterSize(settings) + 1 ? `Undrafted` : `Round ${round}`}</h3>
            <ul className="player-list__round-list">{playerLoop(filteredPlayers, settings, round)}</ul>
          </React.Fragment>
        );
      }
    }
    return rounds;
  };

  const playerLoop = (filteredPlayers, settings, round) => {
    const playersSplitIntoRounds = [];
    const firstPlayer = player;
    const lastPlayer = round === rosterSize(settings) + 1 ? filteredPlayers.length : firstPlayer + parseStringToFloat(settings.general?.teams);
    for (let i = firstPlayer; i < lastPlayer; i++) {
      if (
        //If rank is greater than the first pick of the round, and
        //A) If it is not the undrafted round and the rank is less than or eq to the last pick of the round, or
        //B) If it is the undrafted round
        playersTotalPoints.findIndex((el) => el[0] === filteredPlayers[player]?.[0]) + 1 > (round - 1) * parseStringToFloat(settings.general?.teams) &&
        ((round !== rosterSize(settings) + 1 &&
          playersTotalPoints.findIndex((el) => el[0] === filteredPlayers[player]?.[0]) + 1 <= round * parseStringToFloat(settings.general?.teams)) ||
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
        player++;
      }
    }
    return playersSplitIntoRounds;
  };

  return (
    <div className="overall-list">
      <div className="list-head">
        <h2 className="list-heading">Overall</h2>
      </div>
      <div className="player-list">{roundLoop(filteredPlayers(playersTotalPoints), settings)}</div>
    </div>
  );
}
