import { battleTemplate, winTemplate, selfEliminationTemplates } from './actions';
import items from './items';
import { randNum } from '../utilities';

// Returns a random item name
export function getItem() {
  return items[randNum(items.length)];
}

// Returns the constructed 1v1 battle message
export function getWinMessage(player) {
  return winTemplate.replace('%a', `@${player}`);
}

// Returns the constructed 1v1 battle message
export function getBattleMessage(winner, loser) {
  return battleTemplate
    .replace('%a', `@${winner}`)
    .replace('%b', `@${loser}`)
    .replace('%w', `${getItem()}`);
}

// Returns the constructed self elimination  message
export function getSelfEliminationMessage(player) {
  const messageTemplate = selfEliminationTemplates[randNum(2, 0)];
  return messageTemplate.replace('%a', `@${player}`);
}
