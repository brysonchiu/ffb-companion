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
