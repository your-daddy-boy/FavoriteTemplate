const { MessageEmbed } = require("discord.js");
const sendError = require("../Error/Error")

module.exports = {
	name: 'Queue',
	description: 'Showing list of content',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['queue','q'],
	usage: ``,
	cooldown: 0.5,
	async execute(client, message, args) {
  

  const permissions = message.channel.permissionsFor(message.client.user);
    if (!permissions.has(["MANAGE_MESSAGES", "ADD_REACTIONS"]))
      return sendError("Missing permission on me",message.channel);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return sendError("There is no sound that played",message.channel)

    let currentPage = 0;
    const embeds = generateQueueEmbed(message, queue.songs);

    const queueEmbed = await message.channel.send(
      `**\`Page ${currentPage + 1}\`**/**${embeds.length}**`,
      embeds[currentPage]
    );

    try {
      await queueEmbed.react("◀");
      await queueEmbed.react("🛑");
      await queueEmbed.react("▶");
    } catch (error) {
      console.error(error);
      message.channel.send(error.message).catch(console.error);
    }

    const filter = (reaction, user) =>
      ["◀", "🛑", "▶"].includes(reaction.emoji.name) && message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "▶") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(`**\`${currentPage + 1}\`**/**${embeds.length}**`, embeds[currentPage]);
          }
        } else if (reaction.emoji.name === "◀") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(`**\`${currentPage + 1}\`**/**${embeds.length}**`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        }
        await reaction.users.remove(message.author.id);
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      }
    });
  }
};

function generateQueueEmbed(message, queue) {
  let embeds = [];
  let k = 10;

  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;

    const info = current.map((track) => `**\`${++j}\`** | [\`${track.title}\`](${track.url})`).join("\n");
    const serverQueue = message.client.queue.get(message.guild.id);
    const embed = new MessageEmbed()
    .setAuthor("Server Tracks")
    .addField("Started",`🔴 [${queue[0].title}](${queue[0].url})`, true)
    //.setThumbnail(message.guild.iconURL())    
    .setDescription(info)
    //.addField("Now Playing", `[${queue[0].title}](${queue[0].url})`, true)
    //.addField("Text Channel", serverQueue.textChannel, true)
    //.addField("Voice Channel", serverQueue.voiceChannel, true)
    .setFooter('Development')
     if(serverQueue.songs.length === 1)embed.setDescription(`No song added to Queue`)

    embeds.push(embed);
  }

  return embeds;
 
};
