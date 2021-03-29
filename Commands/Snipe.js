const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')
module.exports = {
	name: 'Snipe',
	description: 'Snipping',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['snipe','sn'],
	usage: ``,
	cooldown: 5,
	execute(client, message, args) {
    
const msg = client.snipes.get(message.channel.id);
if(!msg) return message.channel.send({embed: {description: `There is no deleted message ${message.channel.name} i thought`, color: "fffaff"}})
   
 let embed = new Discord.MessageEmbed()
.setAuthor(msg.author.username, msg.author.displayAvatarURL())
//.setDescription(`[${msg.content}]`)
.addField("Sniped Content",`${msg.content}`)
//.setDescription(msg.content)
.setColor('BLUE')
.setImage(msg.image)
.setTimestamp()
 message.channel.send(embed)
 
  }
}
