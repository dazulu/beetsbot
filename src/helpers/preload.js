import BattleRoyale from '../battleroyale';
import ThrowCatch from '../throwcatch';
import Winner from '../winner';

export default function preloadFeatures() {
  const obj = {};
  const channels = process.env.CHANNEL_NAMES.split(',');

  channels.forEach(channel => {
    obj[channel] = {
      battleroyale: new BattleRoyale(),
      throwcatch: new ThrowCatch(),
      winner: new Winner()
    };
  });

  return obj;
}
