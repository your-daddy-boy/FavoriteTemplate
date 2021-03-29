const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const moment = require("moment");
/*
const filterLevels = {
  DISABLED: "Off",
  MEMBERS_WITHOUT_ROLES: "No Role",
  ALL_MEMBERS: "Everyone"
};
*/
const verificationLevels = {
  NONE: "None",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "(╯°□°）╯︵ ┻━┻",
  VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
};
//Commands/ServerInfo.js
const regions = {
  brazil: "Brazil",
  europe: "Europe",
  hongkong: "Hong Kong",
  india: "India",
  japan: "Japan",
  russia: "Russia",
  singapore: "Singapore",
  southafrica: "South Africa",
  sydeny: "Sydney",
  "us-central": "US Central",
  "us-east": "US East",
  "us-west": "US West",
  "us-south": "US South"
};

module.exports = {
  name: "ServerInfo",
  description: "Server overview",
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
  aliases: ["serverinfo", "server"],
  usage: ``,
  cooldown: 5,
  execute(client, message, args) {
    
    let member = message.guild.members;
    let offline = member.cache.filter(m => m.user.presence.status === "offline").size,
        online = member.cache.filter(m => m.user.presence.status === "online").size,
        idle = member.cache.filter(m => m.user.presence.status === "idle").size,
        dnd = member.cache.filter(m => m.user.presence.status === "dnd").size,
        robot = member.cache.filter(m => m.user.bot).size,
        total = message.guild.memberCount;
    
    const roles = message.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString());
    const channels = message.guild.channels.cache;
    const emojis = message.guild.emojis.cache;
    const embeda = new MessageEmbed()
    
    .setAuthor(`${message.guild.name}`)
    //Guild Owner : ${message.guild.owner.user.tag}
    .addField("General",`\`\`\`js
Guild Name : ${message.guild.name}
Guild ID : ${message.guild.id}
Guild Owner : ${message.guild.owner.user.tag}
Guild Region : ${regions[message.guild.region]}
Guild Boost : ${message.guild.premiumSubscriptionCount || "0"}
Guild Tier : ${message.guild.premiumTier
            ? `Tier ${message.guild.premiumTier}`
            : "None"
               }
Guild Verification Level : ${verificationLevels[message.guild.verificationLevel]
               }
Guild Created Date : ${moment(message.guild.createdTimestamp).format(
          "LT"
        )} ${moment(message.guild.createdTimestamp).format("LL")} ${moment(
          message.guild.createdTimestamp
        ).fromNow()}\`\`\``)
    
    .addField("Guild Collection",`\`\`\`js
Roles Check : ${roles.length}
Emoji Check : ${emojis.size}
Text Channels : ${
          channels.filter(channel => channel.type === "text").size
        }
Voice Channels : ${
          channels.filter(channel => channel.type === "voice").size
        }\`\`\``)
     .addField(`Members [${total}]`, `Online: ${online} \nIdle: ${idle} \nDND: ${dnd} \nOffline: ${offline} \nBots: ${robot}`)
     .setColor("BLUE")
    message.channel.send(embeda)
    }
}
