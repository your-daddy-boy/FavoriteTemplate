const { MessageEmbed } = require("discord.js");
const sendError = require("../Error/Error")
const Discord = require("discord.js")

module.exports = {
	name: 'Resume',
	description: 'Song resumed',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['resume'],
	usage: ``,
	cooldown: 2,
	execute(client, message, args) {
    
    let channel = message.member.voice.channel;
    if (!channel)return sendError("You need to be in a voice channel", message.channel);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new Discord.MessageEmbed()
      .setDescription("▶ Resumed the music for you!")
      .setColor("GREEN")
      .setAuthor("Music has been Resumed!")
      return message.channel.send(xd);
    }
    return sendError("There is nothing playing in this server.", message.channel);
  },
};
