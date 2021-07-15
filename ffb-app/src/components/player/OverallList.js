import { PlayerCard } from "./PlayerCard";

export function OverallList({ players, playersTotalPoints, playerStatus, updatePlayerStatus, filter, currentPick, setCurrentPick }) {
  return (
    <div className="overall-list">
      <div className="list-head">
        <h2 className="list-heading">Overall</h2>
      </div>
      <div className="player-list">
        {playersTotalPoints
          .filter((obj) => {
            if (filter !== "") {
              return players[obj[0]]["PLAYER"].toLowerCase().includes(filter.toLowerCase());
            } else {
              return true;
            }
          })
          .map((obj) => (
            <PlayerCard
              key={obj[0]}
              playerId={obj[0]}
              rank={playersTotalPoints.findIndex((el) => el[0] === obj[0]) + 1}
              team={players[obj[0]]["TEAM"]}
              overallPoints={obj[1]}
              position={players[obj[0]]["POSITION"]}
              player={players[obj[0]]["PLAYER"]}
              playerStatus={playerStatus[obj[0]]}
              updatePlayerStatus={updatePlayerStatus}
              sentiment={true}
              currentPick={currentPick}
              setCurrentPick={setCurrentPick}
            />
          ))}
      </div>
    </div>
  );
}
