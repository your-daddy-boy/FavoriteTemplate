const { MessageEmbed } = require('discord.js');
const sendError = require("../Error/Error")

module.exports = {
	name: 'Clear',
	description: 'Clearing the queue',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['clear'],
	usage: ``,
	cooldown: 0.5,
	execute(client, message, args) {
    
    const channel = message.member.voice.channel
    if (!channel)return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("There is nothing playing that I could stop for you.", message.channel);
   if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     try{
      serverQueue.connection.dispatcher.end();
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
      }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.react("<:ReoneTrue:808285174046916618>")
  },
};
