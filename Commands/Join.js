const { MessageEmbed } = require('discord.js');
const sendError = require("../Error/Error");

module.exports = {
	name: 'Join',
	description: 'Client joining the channel',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['join','summon'],
	usage: ``,
	cooldown: 5,
	execute(client, message, args) {

    const channel = message.member.voice.channel;
    const permissions = channel.permissionsFor(message.client.user);
    //if(channel)return sendError ("Im on a voice channel now or some player using me")
    if (!channel)return sendError("You should join to the voice channel first", message.channel);
    
    if (!permissions.has("CONNECT"))return sendError("Missing permission on me", message.channel);
    if (!permissions.has("SPEAK"))return sendError("Missing permission on me", message.channel);               
      
    let song = null;
    if (!song){
                                 
             message.client.queue.delete(message.guild.id);
}
    
      const connection = channel.join();
      message.member.voice.channel.join();    
      
      let ez = new MessageEmbed()
      .setTitle("Connected on")
      .setColor("GREEN")
      .setDescription(`Im joining the voice channel, lets play`)     
      message.channel.send(ez);
    
            
    }
  };
