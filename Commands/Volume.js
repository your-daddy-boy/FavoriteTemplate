const { MessageEmbed } = require('discord.js');
const sendError = require("../Error/Error")

module.exports = {
	name: 'Volume',
	description: 'Sound volume manager',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['volume','vol','v'],
	usage: `Volume <num>`,
	cooldown: 0.1,
	execute(client, message, args) {
  
     const channel = message.member.voice.channel;
    if (!channel)return sendError("You should join to the voice channel with me", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("There is no sound that played", message.channel);
    if (!serverQueue.connection) return sendError("There is no sound that played", message.channel);
    if (!args[0])return message.channel.send(`Current volume is : **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send(':notes: Numbers only!').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError('You can\'t set the volume high than 150. or lower than 0',message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`Volume config : **${args[0]/1}/100**`)
    .setAuthor("Sound Volume")
    .setColor("GREEN")
  
    return message.channel.send(xd);
  },
};
