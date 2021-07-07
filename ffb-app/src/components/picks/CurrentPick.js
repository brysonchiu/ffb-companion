export function CurrentPick({ pick }) {
  return (
    <div className="current-pick">
      <div className="current-pick__pick-container">
        <h2 className="visually-hidden">Current Pick</h2>
        <p className="current-pick__pick">{pick}</p>
      </div>
      <button className="current-pick__adjuster current-pick__adjuster-up"></button>
      <button className="current-pick__adjuster current-pick__adjuster-down"></button>
    </div>
  );
}
