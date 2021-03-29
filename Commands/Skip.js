const { Util, MessageEmbed } = require("discord.js");
const sendError = require("../Error/Error")

module.exports = {
	name: 'Skip',
	description: 'Skipping audio',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['skip','s'],
	cooldown: 0.5,
	execute(client, message, args) {
    
      const channel = message.member.voice.channel
    if (!channel)return sendError("You should join to the voice channel with me", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("There is no sound that played", message.channel);
        if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Resumed the music for you!")
      .setColor("YELLOW")
      .setTitle("Music has been Resumed!")
      
       
   return message.channel.send(xd).catch(err => console.log(err));
      
    }


       try{
      serverQueue.connection.dispatcher.end()
      } catch (error) {
        serverQueue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
      }
    message.react("<:ReoneTrue:808285174046916618>")
  },
};
