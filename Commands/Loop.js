const { MessageEmbed } = require("discord.js");
const sendError = require("../Error/Error")

module.exports = {
	name: 'Loop',
	description: 'Repeat the song or queue',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['loop','l'],
	usage: ``,
	cooldown: 1,
	execute(client, message, args) {
    
    let channel = message.member.voice.channel;
    if (!channel)return sendError("You should join to the voice channel with me", message.channel);

    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "GREEN",
                    title: "Loop Statement",
                    description: `🔄  **|**  Loop is ${serverQueue.loop === true ? "Enabled" : "Disabled"}`
                }
            });
        };
    return sendError("There is nothing playing in this server", message.channel);
  },
};
