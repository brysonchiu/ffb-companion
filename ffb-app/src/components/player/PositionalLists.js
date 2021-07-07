import { PlayerCard } from "./PlayerCard";

export function PositionalLists({ players, ranks, playerStatus, updatePlayerStatus }) {
  return (
    <div className="positional-list__container">
      <div className="positional-list positional-list__qb">
        <div className="list-head">
          <h2 className="list-heading">QB</h2>
        </div>
        <ul className="player-list">
          {ranks
            .filter((playerId) => players[playerId]["POSITION"] === "QB")
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
              />
            ))}
        </ul>
      </div>
      <div className="positional-list positional-list__rb">
        <div className="list-head">
          <h2 className="list-heading">RB</h2>
        </div>
        <ul className="player-list">
          {ranks
            .filter((playerId) => players[playerId]["POSITION"] === "RB")
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
              />
            ))}
        </ul>
      </div>
      <div className="positional-list positional-list__wr">
        <div className="list-head">
          <h2 className="list-heading">WR</h2>
        </div>
        <ul className="player-list">
          {ranks
            .filter((playerId) => players[playerId]["POSITION"] === "WR")
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
              />
            ))}
        </ul>
      </div>
      <div className="positional-list positional-list__te">
        <div className="list-head">
          <h2 className="list-heading">TE</h2>
        </div>
        <ul className="player-list">
          {ranks
            .filter((playerId) => players[playerId]["POSITION"] === "TE")
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
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
