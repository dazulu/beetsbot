// Random number generator
export function randNum(max, min = false) {
  if (min === false) {
    return Math.floor(Math.random() * max) + 1;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default randNum;
