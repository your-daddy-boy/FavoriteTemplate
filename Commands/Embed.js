const Discord = require('discord.js')

module.exports = {
	name: 'Embed',
	description: 'Embed on message',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['embed','embedsay','embedtext'],
	usage: `Embed <text>`,
	cooldown: 5,
	async execute(client, message, args) { 

if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the necessary authority")
let specifyembed = new Discord.MessageEmbed()
        
        .setDescription(`${message.author}, Please enter a word or message to embed.`)
        .setTimestamp();

    var text = args.join(" ");
    if (!text) return message.channel.send(specifyembed);

    let postMsg = await message.channel.send('**Please wait a moment...**');
    let embedsay = new Discord.MessageEmbed()
        // .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor("BLUE")
        .setDescription(`${text}`);
        message.channel.send(embedsay).then(() => { postMsg.delete();});
  message.delete({ timeout: 200 });
}
}
