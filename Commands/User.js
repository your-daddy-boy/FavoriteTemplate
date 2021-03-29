const { MessageEmbed } = require('discord.js');
const moment = require("moment")


module.exports = {
	name: 'User',
	description: 'Get information about the player that you mention',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['user','userinfo'],
	usage: `User <player>`,
	cooldown: 5,
	async execute(client, message, args) {    

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member; // checking for members mention
    

    //OPTIONS FOR STATUS

    let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
    }
  
  function trimArray(arr, maxLen = 10) {
    if (arr.length > maxLen) {
      const len = arr.length - maxLen;
      arr = arr.slice(0, maxLen);
      arr.push(`${len} more...`)
    }
    return arr;
  }

    let embed = new MessageEmbed()
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))

    //ACTIVITY
    let array = []
    if (user.user.presence.activities.length) {

      let data = user.user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name 
        let xname = data[i].details
        let zname = data[i].state 
        let type = data[i].type

        array.push(`**${type}** : \n\`${name} : ${xname} : ${zname}\``)

        if (data[i].name === "Spotify") {
          embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
        }

        embed.setDescription(array.join("\n"))

      }
    }
    // members roles
    const roles = user.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1)


      //OTHER STUFF 
      embed.setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true }))

      //CHECK IF USER HAVE NICKNAME
      if (user.nickname !== null) embed.addField("Nickname", user.nickname)
      embed.addField("Joined Date", moment(user.joinedAt).format("LL LT"))
        .addField("Account Created", moment(user.user.createdAt).format("LL LT"))
        .addField("General Information", `ID: \`${user.user.id}\`\nDiscriminator: #${user.user.discriminator}\nBot: ${user.user.bot}\nDeleted User: ${user.deleted}\nRoles [${roles.length}]: ${roles.length < 10 ? roles.join(", ") : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`)
        .addField("Avatar", `[Source](${user.user.displayAvatarURL({dynamic : true, size : 4096, format : 'png'})})`)
        .setFooter(user.user.presence.status, stat[user.user.presence.status])
        .setColor("BLUE")


      return message.channel.send(embed).catch(err => {
        return message.channel.send("Error : " + err)
      })



    }



}
