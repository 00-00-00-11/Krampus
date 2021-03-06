const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "amazingearth",
  aliases: ["earthporn"],
  description: "Amazing images of light and landscape",
  category: "image",
  async execute(bot, message) {
    const data = await fetch(
      "https://www.reddit.com/r/Earthporn/random/.json"
    ).then((res) => res.json());

    const children = data[0].data.children[0];
    const permaLink = children.data.permalink;
    const url = `https://reddit.com${permaLink}`;
    const image = children.data.url;
    const title = children.data.title;
    const upvotes = children.data.ups;
    const comments = children.data.num_comments;

    const embed = BaseEmbed(message)
      .setTitle(`${title}`)
      .setURL(url)
      .setImage(image)
      .setFooter(`👍 ${upvotes} - 💬 ${comments}`);

    message.channel.send({ embed });
  },
};
