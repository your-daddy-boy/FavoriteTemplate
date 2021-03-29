const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'AddEmoji',
	description: 'Adding emoji on specify server',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['addemoji','ad'],
	usage: `addemoji <emoji>`,
	cooldown: 2,
	execute(client, message, args) {
        if (!message.member.hasPermission("MANAGE_EMOJIS")) {
            return message.channel.send(`You don't have the necessary authority`)
        }

        const emoji = args[0];
        if (!emoji) return message.channel.send(`Input an emoji please`);

        let customemoji = Discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
              customemoji.animated ? "gif" : "png"
            }`;
            const name = args.slice(1).join(" ");
            message.guild.emojis.create(
                `${Link}`,
                `${name || `${customemoji.name}`}`
            ).catch(error => {
                console.log(error)
            })
          let custom = Discord.Util.parseEmoji(emoji);
            const Added = new MessageEmbed()
                .setTitle(`Successfully`)
                .setColor('GREEN')
                .setDescription(`Emoji added to server\n**Name:** \`${name || `${customemoji.name}`}\`\n**Preview:** [Click](${Link})`)
                .setThumbnail(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`)
                .setFooter('Development')
            return message.channel.send(Added).catch(e => {
                console.log(e)
            })
        } else {
            let CheckEmoji = parse(emoji, {
                assetType: "png"
            });
            if (!CheckEmoji[0])
                return message.channel.send(`Please Give Me A Valid Emoji!`);
            message.channel.send(
                `You Can Use Normal Emoji Without Adding In Server!`
            );
        }
    }
};
