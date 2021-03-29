const { MessageEmbed } = require("discord.js");
const sendError = require("../Error/Error")

module.exports = {
	name: 'Now Playing',
	description: 'Song that started',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['nowplaying','np'],
	usage: ``,
	cooldown: 0.1,
	execute(client, message, args) {
  
    
  const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("There is no sound that played", message.channel);
    let song = serverQueue.songs[0]
    let th = new MessageEmbed()
      .setAuthor("Playing On")
      .setThumbnail(song.img)    
      .setColor("BLUE")
      .addField("Started",`🔴 ${song.title}`)
      .addFields(
                {
                    name: "Duration",
                    value: `${song.duration}`,
                    inline: true
                },
                {
                    name: "Request by",
                    value: `${song.req.username}`,
                    inline: true
                })
      .setFooter("Development")
    return message.channel.send(th)
  },
};//Commands/NowPlaying.js
