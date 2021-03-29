const { MessageEmbed } = require("discord.js");
const sendError = require("../Error/Error")
module.exports = {
	name: 'Pause',
	description: 'Song paused',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['pause'],
	usage: "[pause]",
	cooldown: 2,
	execute(client, message, args) {
    let channel = message.member.voice.channel;
    if (!channel)return sendError("You need to be in a voice channel", message.channel);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
      }	    
      let xd = new MessageEmbed()
      .setDescription("⏸ Paused the music for you!")
      .setColor("GREEN")
      .setTitle("Music has been paused!")
      return message.channel.send(xd);
    }
    return sendError("There is nothing playing in this server.", message.channel);
  },
};
