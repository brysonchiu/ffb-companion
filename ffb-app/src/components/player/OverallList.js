import { PlayerCard } from "./PlayerCard";

export function OverallList({ players, ranks, playerStatus, updatePlayerStatus }) {
  return (
    <div className="overall-list">
      <div className="list-head">
        <h2 className="list-heading">Overall</h2>
      </div>
      <div className="player-list">
        {ranks.map((playerId) => (
          <PlayerCard
            key={playerId}
            playerId={playerId}
            team={players[playerId]["TEAM"]}
            rank={players[playerId]["RANK"]}
            position={players[playerId]["POSITION"]}
            player={players[playerId]["PLAYER"]}
            overallPoints={players[playerId]["MISC FPTS"]}
            playerStatus={playerStatus[playerId]}
            updatePlayerStatus={updatePlayerStatus}
            sentiment={true}
          />
        ))}
      </div>
    </div>
  );
}
