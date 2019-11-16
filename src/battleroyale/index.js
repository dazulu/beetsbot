import client from "../client";
import getChatMembers from "../getChatMembers";
import config from "../config.json";
import { randNum } from "../utilities.js";
import {
  getWinMessage,
  getBattleMessage,
  getSelfEliminationMessage
} from "./helpers";

const {
  prefix,
  chanceOfSelfElimination,
  minMessageWait,
  maxMessageWait
} = config.battleroyale;

export default class BattleRoyale {
  constructor() {
    this.gameInProgress = false;
    this.channelName = "";
    this.players = [];
  }

  async init(channelName) {
    this.channelName = channelName;

    if (this.gameInProgress) {
      client.say(this.channelName, `${prefix} Already in progress!`);
    } else {
      const players = await this.getPlayers();

      if (players.length <= 1) {
        client.say(this.channelName, `${prefix} Not enough players to start`);
      } else {
        this.players = players;
        client.say(this.channelName, `${prefix} Players droppin' in...`);
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
    setTimeout(() => {
      this.gameLogic();
    }, randNum(minMessageWait, maxMessageWait));
  }

  endRound() {
    setTimeout(() => {
      const winMessage = getWinMessage(this.players[0]);
      client.say(this.channelName, `${prefix} ${winMessage}`);
      this.gameInProgress = false;
    }, 2000);
  }

  gameLogic() {
    let message;

    const chanceOfBattle = randNum(100);

    console.log(this.players);

    // 1v1 battle or chance of self elimination
    if (chanceOfBattle > chanceOfSelfElimination) {
      // Randomly extract winner and loser of a 1v1 battle
      const winner = this.players.splice(randNum(this.players.length), 1);
      const loser = this.players.splice(randNum(this.players.length), 1);

      // Put the winner back into the pool of living players
      this.players.push(winner);

      message = getBattleMessage(winner, loser);
    } else {
      // Self-elimination
      const player = this.players.splice(randNum(this.players.length), 1);
      message = getSelfEliminationMessage(player);
    }

    client.say(this.channelName, `${prefix} ${message}`);

    // If there is only 1 player left, they are the winner
    // else go back into the game loop
    if (this.players.length === 1) {
      this.endRound();
    } else {
      setTimeout(
        this.gameLogic.bind(this),
        randNum(minMessageWait, maxMessageWait)
      );
    }
  }
}
