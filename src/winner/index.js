import client from '../client';
import getChatMembers from '../helpers/getChatMembers';
import { randNum } from '../helpers/utilities';

export default class Winner {
  constructor() {
    this.members = [];
    this.channelName = '';
  }

  async handleWinner(channelName, msg) {
    if (this.members.length === 0) this.members = await getChatMembers();
    if (this.channelName === '') this.channelName = channelName;

    const type = msg.split(' ')[1];

    let winner;

    if (type === 'followers' || type === 'f') {
      winner = this.getRandomMember('followers');
    } else if (type === 'subscribers' || type === 'subs' || type === 's') {
      winner = this.getRandomMember('subscribers');
    } else if (msg === '!winner') {
      winner = this.getRandomMember('viewers');
    }

    if (winner) {
      client.action(this.channelName, `picked @${winner}`);
    }
  }

  getRandomMember(type) {
    const filteredMembers = this.members.filter(member => member.chatterType === type);
    return filteredMembers && filteredMembers[randNum(this.members.length - 1, 0)].name;
  }
}
