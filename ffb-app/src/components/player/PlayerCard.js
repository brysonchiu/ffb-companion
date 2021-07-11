import React from "react";
import { roundNumber, checkPick } from "../../helpers.js";

export function PlayerCard({
  playerId,
  rank,
  team,
  position,
  player,
  overallPoints,
  stats,
  playerStatus,
  updatePlayerStatus,
  sentiment,
  displayedStats,
  currentPick,
  setCurrentPick,
}) {
  return (
    <li
      className={`player-card${playerStatus && playerStatus.drafted ? " player-card--drafted" : ""}${
        playerStatus && playerStatus.sentiment ? " player-card--" + playerStatus.sentiment : ""
      }`}
      onClick={() => {
        if (playerStatus.drafted) {
          setCurrentPick(checkPick(currentPick - 1));
        } else {
          setCurrentPick(checkPick(currentPick + 1));
        }
        updatePlayerStatus(playerId, "drafted");
      }}
    >
      <div className="player-card__rank">{rank}</div>
      {position && <div className="player-card__position">{position}</div>}
      <div className="player-card__name">{player}</div>
      {team && <div className="player-card__team">{team}</div>}
      {overallPoints && <div className="player-card__pnts">{roundNumber(overallPoints)}</div>}
      {stats && stats["PASSING ATT"] && stats["PASSING CMP"] && stats["PASSING INTS"] && stats["PASSING TDS"] && stats["PASSING YDS"] && (
        <table className={`stats-table stats-table--pass${displayedStats !== "pass" ? " stats-table--hidden" : ""}`}>
          <caption className="visually-hidden">Passing Stats</caption>
          <thead>
            <tr>
              <th>PNTS</th>
              <th>ATT</th>
              <th>CMP</th>
              <th>YDS</th>
              <th>TDS</th>
              <th>INTS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{roundNumber(stats["MISC FPTS"])}</td>
              <td>{roundNumber(stats["PASSING ATT"])}</td>
              <td>{roundNumber(stats["PASSING CMP"])}</td>
              <td>{roundNumber(stats["PASSING YDS"])}</td>
              <td>{roundNumber(stats["PASSING TDS"])}</td>
              <td>{roundNumber(stats["PASSING INTS"])}</td>
            </tr>
          </tbody>
        </table>
      )}
      {stats && stats["RUSHING ATT"] && stats["RUSHING TDS"] && stats["RUSHING YDS"] && (
        <table className={`stats-table stats-table--rush${displayedStats !== "rush" ? " stats-table--hidden" : ""}`}>
          <caption className="visually-hidden">Rushing Stats</caption>
          <thead>
            <tr>
              <th>PNTS</th>
              <th>ATT</th>
              <th>YDS</th>
              <th>TDS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{roundNumber(stats["MISC FPTS"])}</td>
              <td>{roundNumber(stats["RUSHING ATT"])}</td>
              <td>{roundNumber(stats["RUSHING YDS"])}</td>
              <td>{roundNumber(stats["RUSHING TDS"])}</td>
            </tr>
          </tbody>
        </table>
      )}
      {stats && stats["RECEIVING REC"] && stats["RECEIVING TDS"] && stats["RECEIVING YDS"] && (
        <table className={`stats-table stats-table--rec${displayedStats !== "rec" ? " stats-table--hidden" : ""}`}>
          <caption className="visually-hidden">Receiving Stats</caption>
          <thead>
            <tr>
              <th>PNTS</th>
              <th>REC</th>
              <th>YDS</th>
              <th>TDS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{roundNumber(stats["MISC FPTS"])}</td>
              <td>{roundNumber(stats["RECEIVING REC"])}</td>
              <td>{roundNumber(stats["RECEIVING YDS"])}</td>
              <td>{roundNumber(stats["RECEIVING TDS"])}</td>
            </tr>
          </tbody>
        </table>
      )}
      {stats && stats["MISC FL"] && (
        <table className={`stats-table stats-table--rec${displayedStats !== "misc" ? " stats-table--hidden" : ""}`}>
          <caption className="visually-hidden">Miscellaneous Stats</caption>
          <thead>
            <tr>
              <th>PNTS</th>
              <th>FUM</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{roundNumber(stats["MISC FPTS"])}</td>
              <td>{roundNumber(stats["MISC FL"])}</td>
            </tr>
          </tbody>
        </table>
      )}
      {sentiment && (
        <div className="player-card__sentiment">
          <button
            className="player-card__button player-card__button--star"
            name="starred"
            onClick={(e) => {
              if (!playerStatus.drafted) {
                e.stopPropagation();
                updatePlayerStatus(playerId, "sentiment", e.currentTarget.name);
              }
            }}
          >
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                fill="currentColor"
                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
              ></path>
            </svg>
          </button>
          <button
            className="player-card__button player-card__button--favorite"
            name="favorited"
            onClick={(e) => {
              if (!playerStatus.drafted) {
                e.stopPropagation();
                updatePlayerStatus(playerId, "sentiment", e.currentTarget.name);
              }
            }}
          >
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
              ></path>
            </svg>
          </button>
          <button
            className="player-card__button player-card__button--hate"
            name="hated"
            onClick={(e) => {
              if (!playerStatus.drafted) {
                e.stopPropagation();
                updatePlayerStatus(playerId, "sentiment", e.currentTarget.name);
              }
            }}
          >
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="currentColor"
                d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}
