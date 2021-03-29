const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'Channelinfo',
	description: 'Information about specify channel',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['channaelinfo','ci'],
	usage: `Channelinfo <channel/id/name>`,
	cooldown: 5,
	execute(bot , message, args) {
  
     message.content.toLowerCase()
         let nsfwV = message.channel.nsfw ? 'Yes' : 'No';
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.channel.send("**Channel Not Found!**");

        let channelembed = new MessageEmbed()
            .setTitle(`Channel Information for ${channel.name}`)
            .setThumbnail(message.guild.iconURL())
            .addField("**Channel NSFW**", nsfwV)
            .addField("**Channel ID**", channel.id)
            .addField("**Channel Type**", channel.type)
            .addField("**Channel Description**", `${channel.topic || "No Description"}`)
            .addField("**Channel Created Date**", channel.createdAt)
            .setColor("BLUE")
        message.channel.send(channelembed);
      
    
  }
}
