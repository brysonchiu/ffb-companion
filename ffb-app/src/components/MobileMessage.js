import { BrowserWindow } from "./icons/browser-window.js";

export function MobileMessage() {
  return (
    <div className="mobile-message__container">
      <BrowserWindow />
      <h2 className="mobile-message__title">{`Right now, bigger${"\u00a0"}is${"\u00a0"}better.`}</h2>
      <p className="mobile-message">This site is optimized for larger broser windows. Switch to desktop or adjust your window.</p>
    </div>
  );
}
