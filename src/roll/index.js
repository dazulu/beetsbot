import client from '../client';
import config from '../config.json';
import { randNum } from '../helpers/utilities';

const prefix = config.general.commandPrefix;

export default function(channelName, msg) {
  // pattern to test if a custom number was requested
  const regexNumber = new RegExp(`^${prefix}roll\\s[\\d]+$`);
  const regexDice = new RegExp(`^${prefix}roll\\sd[\\d]+$`);

  if (msg === `${prefix}roll`) {
    client.action(channelName, `rolls ${randNum(100)} out of 100`);
  } else if (regexNumber.test(msg)) {
    const max = parseInt(msg.split(' ')[1], 10);
    if (max > 0) {
      client.action(channelName, `rolls ${randNum(max)} out of ${max}`);
    }
  } else if (regexDice.test(msg)) {
    const max = parseInt(msg.split('d')[1], 10);
    client.action(channelName, `rolls a d${max} for ${randNum(max)}`);
  }
}
