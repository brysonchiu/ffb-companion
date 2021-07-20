import { IconRightArrow } from "../icons/right-arrow.js";
import { rosterSize, parseStringToFloat } from "../../helpers.js";

export function UserPicks({ settings, currentPick }) {
  //Calculate user picks
  const returnPicks = (yourPick, teamCount, rosterSize) => {
    const picks = [];
    if (yourPick && teamCount && yourPick <= teamCount) {
      for (let i = 1; i <= rosterSize; i++) {
        if (i % 2 === 0) {
          picks.push((i - 1) * teamCount + (teamCount - yourPick + 1));
        } else {
          picks.push((i - 1) * teamCount + yourPick);
        }
      }
    } else {
      picks.push("Oops! You have a settings error.");
    }
    return picks;
  };

  return (
    <div className="user-picks__container">
      <h2 className="visually-hidden">Your Picks</h2>
      <ul>
        {settings.general &&
          settings.roster &&
          returnPicks(parseStringToFloat(settings.general.user_pick), parseStringToFloat(settings.general.teams), rosterSize(settings)).map((userPick) => {
            return (
              <li
                key={userPick}
                className={`user-pick__list-item${currentPick === userPick ? " user-pick__list-item--current" : ""}${
                  currentPick > userPick ? " user-pick__list-item--past" : ""
                }${userPick === "Oops! You have a settings error." ? " user-pick__list-item--error" : ""} `}
              >
                <span className="user-pick text--number">{userPick}</span> <IconRightArrow />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
