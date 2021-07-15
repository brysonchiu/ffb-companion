//Turns a string into a float
export function parseStringToFloat(num) {
  const onlyPeriodsOrDash = new RegExp(/^[.-]*$/, "i");
  if (!num || num === "" || onlyPeriodsOrDash.test(num)) {
    return 0;
  } else if (typeof num === "string") {
    num = parseFloat(num.replace(/,/g, ""));
  }
  return num;
}

//Round Numbers, add commas, return to string for display
export function roundNumber(num) {
  num = parseStringToFloat(num);
  num = Math.round(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num;
}

//Set min limit to 1 on current pick
export function checkPick(currentPick) {
  return currentPick < 1 ? 1 : currentPick;
}
