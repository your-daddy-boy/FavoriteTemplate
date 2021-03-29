const { MessageEmbed } = require("discord.js");
const sendError = require("../Error/Error")

module.exports = {
	name: 'Jump',
	description: 'move another soundmedia',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['j'],
	usage: `Jump <num>`,
	cooldown: 5,
	execute(client, message, args) {


    let channel = message.member.voice.channel;
    if (!channel)return sendError("You need to be in a voice channel", message.channel);

    if (!args.length || isNaN(args[0]))
      return message.channel.send({
                        embed: {
                            //color: "fffaff",
                            description: `**Usage**: Input number`
                        }
   
                   }).catch(console.error);
        

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return sendError("There is no song on the queue.",message.channel).catch(console.error);
    if (args[0] > queue.songs.length)
      return sendError(`The queue is only ${queue.songs.length} songs long!`,message.channel).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
     try{
    queue.connection.dispatcher.end();
      }catch (error) {
        queue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
       return sendError(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
      }
    
    queue.textChannel.send({
                        embed: {
                            color: "GREEN",
                            description: `${message.author.username} ⏭ Jump and \`${args[0] - 1}\` songs are skipped`
                        }
   
                   }).catch(console.error);
                   message.react("<:ReoneTrue:808285174046916618>")

  },
};
