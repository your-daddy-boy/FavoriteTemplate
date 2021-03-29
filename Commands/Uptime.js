const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const time = require('ms')

module.exports = {
	name: 'uptime',
	description: '',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['uptime'],
	usage: ``,
	cooldown: 5,
	async execute(client, message, args) {
  
    const authors = ["701546426135740426","378960892508897281"];
    let AIR = new MessageEmbed()       
    .setTitle('YOU NOT EVEN MY MASTER')
    if(!authors.includes(message.author.id)) return message.channel.send(AIR);
    const uptime = time(client.uptime)
    const days = Math.floor(client.uptime / 86400000);
    const hours = Math.floor(client.uptime / 3600000) % 24;
    const minutes = Math.floor(client.uptime / 60000) % 60;
    const seconds = Math.floor(client.uptime / 1000) % 60;
    //react with approve emoji
    let api = new Discord.MessageEmbed()
    .setTitle(`${client.user.username}`)
    .addField(`Days`,`\`\`\`css\n${days}\`\`\``, true)
    .addField(`Hours`,`\`\`\`css\n${hours}\`\`\``, true)
    .addField(`Minutes`, `\`\`\`css\n${minutes} : ${seconds}\`\`\``, true)
    //.addField('I have been up for:', uptime)
    message.channel.send(api)

    
    
  }
}
