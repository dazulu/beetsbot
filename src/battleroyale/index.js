import client from '../client';
import getChatMembers from '../helpers/getChatMembers';
import config from '../config.json';
import { randNum } from '../helpers/utilities';
import { getWinMessage, getBattleMessage, getSelfEliminationMessage } from './helpers';

const { messagePrefix, minMessageWait, maxMessageWait } = config.battleroyale;

export default class BattleRoyale {
  constructor() {
    this.gameInProgress = false;
    this.channelName = '';
    this.players = [];
  }

  async init(channelName) {
    this.channelName = channelName;

    if (this.gameInProgress) {
      client.say(this.channelName, `${messagePrefix} Already in progress!`);
    } else {
      const players = await this.getPlayers();

      if (players.length <= 1) {
        client.say(this.channelName, `${messagePrefix} Not enough players to start`);
      } else {
        this.players = players;
        client.say(this.channelName, `${messagePrefix} Players droppin' in...`);
        this.startRound();
      }
    }
  }

  async getPlayers() {
    const chatMembers = await getChatMembers(this.channelName);
    return chatMembers.reduce((array, item) => {
      array.push(item.name);
      return array;
    }, []);
  }

  startRound() {
    setTimeout(this.gameLogic.bind(this), 2000);
  }

  endRound() {
    setTimeout(() => {
      const winMessage = getWinMessage(this.players[0]);
      client.say(this.channelName, `${messagePrefix} ${winMessage}`);
      this.gameInProgress = false;
    }, 2000);
  }

  gameLogic() {
    // 1v1 battle or chance of self elimination
    if (randNum(100) > 8) {
      // Randomly extract winner and loser of a 1v1 battle
      const winner = this.players.splice(randNum(this.players.length - 1, 0), 1);
      const loser = this.players.splice(randNum(this.players.length - 1, 0), 1);

      // put the winner back into the pool of living players
      this.players.push(winner);

      client.say(this.channelName, `${messagePrefix} ${getBattleMessage(winner, loser)}`);
    } else {
      // Self-elimination
      const player = this.players.splice(randNum(this.players.length - 1, 0), 1);
      client.say(this.channelName, `${messagePrefix} ${getSelfEliminationMessage(player)}`);
    }

    // If there is only 1 player left, they are the winner
    // else go back into the game loop
    if (this.players.length === 1) {
      this.endRound();
    } else {
      setTimeout(this.gameLogic.bind(this), randNum(minMessageWait, maxMessageWait));
    }
  }
}
