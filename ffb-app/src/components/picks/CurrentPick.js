import { checkPick } from "../../helpers.js";
import { IconPlus } from "../icons/plus.js";
import { IconMinus } from "../icons/minus.js";

export function CurrentPick({ currentPick, setCurrentPick }) {
  return (
    <div className="current-pick">
      <div className="current-pick__pick-container">
        <h2 className="visually-hidden">Current Pick</h2>
        <p className="current-pick__pick">{currentPick}</p>
      </div>
      <button className="current-pick__adjuster current-pick__adjuster-up" onClick={() => setCurrentPick(checkPick(currentPick + 1))}>
        <IconPlus />
      </button>
      <button className="current-pick__adjuster current-pick__adjuster-down" onClick={() => setCurrentPick(checkPick(currentPick - 1))}>
        <IconMinus />
      </button>
    </div>
  );
}
