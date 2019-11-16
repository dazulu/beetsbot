// Strip hash e.g. '#channel' -> 'channel'
export const stripHash = channel => channel.replace("#", "");

// Random number generator
export function getRandomNumber(max, min = false) {
  if (min === false) {
    return Math.floor(Math.random() * max);
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}
