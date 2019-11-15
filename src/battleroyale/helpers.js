import {
  battleTemplate,
  winTemplate,
  selfEliminationTemplates
} from "./actions";
import { items } from "./items";

// Random number generator
export function getRandomNumber(max, min = false) {
  if (min === false) {
    return Math.floor(Math.random() * max);
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Returns a random item name
export function getItem() {
  return items[getRandomNumber(items.length)];
}

// Returns the constructed 1v1 battle message
export function getWinMessage(player) {
  return winTemplate.replace("%a", `@${player}`);
}

// Returns the constructed 1v1 battle message
export function getBattleMessage(winner, loser) {
  return battleTemplate
    .replace("%a", `@${winner}`)
    .replace("%b", `@${loser}`)
    .replace("%w", `${getItem()}`);
}

// Returns the constructed self elimination  message
export function getSelfEliminationMessage(player) {
  const messageTemplate =
    selfEliminationTemplates[
      (Math.floor(Math.random() * selfEliminationTemplates.length), 1)
    ];

  return messageTemplate.replace("%a", `@${player}`);
}
