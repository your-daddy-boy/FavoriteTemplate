const Discord = require('discord.js');

module.exports = {
	name: 'Avatar',
	description: 'Player avatar',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['avatar','ava'],
	usage: ``,
	cooldown: 1,
	async execute(client, message, args) {

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

let msg = await message.channel.send("Loading. . .");

if(!message.guild.iconURL) return msg.edit("No icon found!");

let iconembed = new Discord.MessageEmbed()

.setFooter("Requested by " + message.author.tag, message.author.displayAvatarURL() )
.setImage(user.user.displayAvatarURL({dynamic : true, size : 4096, format : 'png'}))
.setTitle(`${user.user.username}#${user.user.discriminator}`)
.setDescription("[**Source**]("+user.user.displayAvatarURL()+")")
.setColor("BLUE")
message.channel.send(iconembed)
    
    msg.delete();
 }
}
