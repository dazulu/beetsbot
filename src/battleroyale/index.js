import getChatMembers from "../getChatMembers";
import config from "../config.json";
import {
  getRandomNumber,
  getWinMessage,
  getBattleMessage,
  getSelfEliminationMessage
} from "./helpers";

const consola = require("consola");

const {
  prefix,
  selfEliminationChance,
  minMessageWait,
  maxMessageWait
} = config.battleroyale;

let isGameInProgress = false;

export default async function(client, channelName) {
  if (isGameInProgress) {
    consola.info(`${prefix} Already in progress!`);
    client.say(channelName, `${prefix} Already in progress!`);
    return;
  }

  isGameInProgress = true;

  const chatMembers = await getChatMembers(channelName);
  const players = chatMembers.reduce((array, item) => {
    array.push(item.name);
    return array;
  }, []);

  if (players.length <= 1) {
    consola.info(`${prefix} Not enough players to start`);
    client.say(channelName, `${prefix} Not enough players to start`);
    return;
  }

  consola.info(`${prefix} Starting Battle Royale with ${players.join(", ")}`);
  client.say(channelName, `${prefix} Players are droppin' in...`);

  setTimeout(() => {
    let timeout;
    (function ontimeout() {
      let message;

      const percentage = getRandomNumber(100);

      // 1v1 battle else self elimination
      if (percentage > selfEliminationChance) {
        // Randomly extract winner and loser of a 1v1 battle
        const winner = players.splice(getRandomNumber(players.length), 1);
        const loser = players.splice(getRandomNumber(players.length), 1);

        // Put the winner back into the pool of living players
        players.push(winner);

        message = getBattleMessage(winner, loser);
      } else {
        const player = players.splice(getRandomNumber(players.length), 1);
        message = getSelfEliminationMessage(player);
      }

      consola.info(`${prefix} ${message}`);
      consola.info(`${prefix} Remaining:", ${players.join(", ")}`);

      client.say(channelName, `${prefix} ${message}`);

      // If there is only 1 player left, they are the winner
      // else set another timeout
      if (players.length === 1) {
        setTimeout(() => {
          const winMessage = getWinMessage(players[0]);
          consola.success(`${prefix} ${winMessage}`);
          client.say(channelName, `${prefix} ${winMessage}`);
          isGameInProgress = false;
        }, 2000);
        clearTimeout(timeout);
      } else {
        timeout = setTimeout(
          ontimeout,
          getRandomNumber(minMessageWait, maxMessageWait)
        );
      }
    })();
  }, getRandomNumber(minMessageWait, maxMessageWait));
}
