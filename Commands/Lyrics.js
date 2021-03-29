const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const sendError = require("../Error/Error")

module.exports = {
	name: 'Lyrics',
	description: 'Showing song lyrics',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['lyric','lyrics','ly'],
	usage: ``,
	cooldown: 0.5,
	async execute(client, message, args) {
    
      const queue = message.client.queue.get(message.guild.id);
    if (!queue) return sendError("There is no sound that played",message.channel).catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setAuthor(`${queue.songs[0].title} | Lyrics`)
      .setThumbnail(queue.songs[0].img)
      .setColor("BLUE")
      .setDescription(lyrics)
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed)
      .catch(console.error);
  },
};
