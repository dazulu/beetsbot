import client from '../client';
import config from '../config.json';
import { randNum } from '../utilities';

const prefix = config.general.commandPrefix;

export default function(channelName, msg) {
  const regex = new RegExp(`^${prefix}roll\\s[\\d]+$`);

  if (msg === `${prefix}roll`) {
    client.action(channelName, `rolls ${randNum(100)}`);
  } else if (regex.test(msg)) {
    const max = parseInt(msg.split(' ')[1], 10);
    if (max > 0) {
      client.action(channelName, `rolls ${randNum(max)}`);
    }
  }
}
