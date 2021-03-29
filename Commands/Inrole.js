const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
	name: 'Inrole',
	description: 'Member role map',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['inrole'],
	usage: `Inrole <rolename>`,
	cooldown: 2,
	execute(client, message, args) {
      if (!message.member.permissions.any(["ADMINISTRATOR"])) {
      return message.channel.send("Only ADMINISTRATOR can do this Command");
      }
      
      
        if (args.includes("@everyone")) return;
        
        if (args.includes("@here")) return;

        if (!args[0]) return message.channel.send("Please enter a [`ROLE`]")

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!role) return message.channel.send("Please enter a Valid [`ROLE`]");

        let membersWithRole = message.guild.members.cache.filter(member => {
            return member.roles.cache.find(r => r.name === role.name);
        }).map(member => {
            return member.user.tag;
        })
        if (membersWithRole > 1024) return message.channel.send('**List Is Too Long!**')

        let roleEmbed = new MessageEmbed()
            .setColor("BLUE")
            //.setThumbnail(message.guild.iconURL())
            .setTitle(`Player with ${role.name}`)
            .setFooter(`Total Player ${message.guild.roles.cache.find(r => r.name === role.name).members.size}`)
            //.setFooter(`Development`)
            .setDescription(membersWithRole.join("\n"));
           
        message.channel.send(roleEmbed);
      
  }
}
