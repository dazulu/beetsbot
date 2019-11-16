import axios from "axios";

export default function getChatters(channelName, _attemptCount = 0) {
  return axios
    .get(`https://tmi.twitch.tv/group/user/${channelName}/chatters`)
    .then(response => {
      return Object.entries(response.data.chatters).reduce(
        (p, [type, list]) =>
          p.concat(
            list.map(name => {
              if (name === channelName) type = "broadcaster";
              return { name, type };
            })
          ),
        []
      );
    })
    .catch(err => {
      if (_attemptCount < 3) {
        return getChatters(channelName, _attemptCount + 1);
      }
      console.log(err);
      throw err;
    });
}
