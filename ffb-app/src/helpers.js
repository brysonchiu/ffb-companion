//Round Numbers and add commas
export function roundNumber(num) {
  let isString = false;
  if (typeof num === "string") {
    isString = true;
    num = parseFloat(num.replace(/,/g, ""));
  }
  num = Math.round(num);
  if (isString) num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num;
}

//Set min limit to 1 on current pick
export function checkPick(currentPick) {
  return currentPick < 1 ? 1 : currentPick;
}
