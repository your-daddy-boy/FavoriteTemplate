const { MessageEmbed } = require('discord.js');
const sendError = require("../Error/Error");

module.exports = {
	name: 'Leave',
	description: 'Client leaving the channel',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['leave','dc'],
	usage: ``,
	cooldown: 5,
	execute(client, message, args) {

    const channel = message.member.voice.channel;
    const permissions = channel.permissionsFor(message.client.user);
    
    if (!channel)return sendError("You should join to the voice channel first", message.channel);
    
    if (!permissions.has("CONNECT"))return sendError("Missing permission on me", message.channel);
    if (!permissions.has("SPEAK"))return sendError("Missing permission on me", message.channel);               
      
      const connection = channel.leave();
      message.member.voice.channel.leave();    
      
      let ez = new MessageEmbed()
      .setTitle("Disconnected")
      .setColor("RED")
      .setDescription(`Im leaving the channel, thanks`)     
      message.channel.send(ez);
            
    }
  };
