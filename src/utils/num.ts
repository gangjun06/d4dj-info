export function pad(num: number, size: number) {
  let str = num.toString();
  while (str.length < size) str = "0" + num;
  return str;
}
