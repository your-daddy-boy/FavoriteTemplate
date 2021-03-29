const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const https = require("https");
const fs = require('fs');
const sendError = require("../Error/Error")

module.exports = {
	name: 'Play',
	description: 'Playing medi',
  guildOnly: false,
  ownerOnly: false,
  myServerOnly: false,
	aliases: ['play','p'],
	usage: ``,
	cooldown: 1,
	async execute(client, message, args, queue) {
    let channel = message.member.voice.channel;
    if (!channel)return sendError("You need to be in a voice channel", message.channel);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))return sendError("I cannot connect to your voice channel, make sure I have the proper permissions!", message.channel);
    if (!permissions.has("SPEAK"))return sendError("I cannot speak in this voice channel, make sure I have the proper permissions!", message.channel);

    const searchString = args.join(" ");
    if (!searchString)return sendError("Please a song title to play", message.channel);
    const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
    var serverQueue = message.client.queue.get(message.guild.id);
    const searcho = `https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;`
    
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      skip: [],
      songs: [],
      volume: 50,
      playing: true,
      loop: false
    };
    
    
    let songInfo = null;
    let song = null;
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {       
       try {
          songInfo = await ytdl.getInfo(url)
          if(!songInfo)return sendError("Looks like i was unable to find the song on YouTube", message.channel);
        song = {
       id: songInfo.videoDetails.videoId,
       title: songInfo.videoDetails.title,
       url: songInfo.videoDetails.video_url,
       img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
      duration: songInfo.videoDetails.lengthSeconds,    
      req: message.author          
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }else {
      try {        
    var searched = await yts.search(searchString);
    if(searched.videos.length === 0)return sendError("Looks like i was unable to find the song on YouTube", message.channel)
    
     songInfo = searched.videos[0]
        song = {
      id: songInfo.videoId,          
      title: Util.escapeMarkdown(songInfo.title),      
      url: songInfo.url,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }
    if (serverQueue) {
      serverQueue.songs.push(song);
      
       let thinga = new MessageEmbed()      
      .setTitle("Track Added")            
      .addField("Title", `Add **[${song.title}](${song.url})** to Queue`, true)
      .addField("Duration", `${song.duration}`, true)
      .setFooter(`Request By : ${song.req.username}`)
          
      return message.channel.send(thinga);
    }        
    queueConstruct.songs.push(song);
    message.client.queue.set(message.guild.id, queueConstruct);
    
    const play = async function (song) {
    const queue = message.client.queue.get(message.guild.id);
    
       
    
     
    if (!song){
                                 
             message.client.queue.delete(message.guild.id);
}
    
 let stream = null; 
    if (song.url.includes("youtube.com")) {
      
      stream = await ytdl(song.url);
stream.on('error', async function(er)  {
      if (er) {
        if (queue) {
        queue.songs.shift();
        play(queue.songs[0]);
        return sendError(`An unexpected error has occurred.\nPossible type \`${er}\``, message.channel)
          }
        }
    });
}
    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

      const dispatcher = queue.connection
         .play(ytdl(song.url, {quality: 'highestaudio',
                               filter: "audio", 
                               highWaterMark: 1 << 25 ,
                               type: "opus"}))
                                
         .on("finish", () => {
           //const info = current.map((track) => `**\`${++j}\`** | [\`${track.title}\`](${track.url})`).join("\n");
           const shiffed = queue.songs.shift();
            if (queue.loop === true) {
                queue.songs.push(shiffed);
            };
          play(queue.songs[0])
        })
     dispatcher.setVolumeLogarithmic(queue.volume / 100);
      let thing = new MessageEmbed()
      .setTitle("Start the Track")
      //.setImage(song.img)      
      .addField("Title",`**[${song.title}](${song.url})**`, true)
      .addField("Duration",`${song.duration}`, true)
      .setFooter(`Request By : ${song.req.username}`)
      //.addField("Source Link", [song.url])
    //.setFooter(`Views: ${song.views} | ${song.ago}`)
      queue.textChannel.send(thing)      
    };

    try {
      const connection = await channel.join();
      await queueConstruct.connection
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0], message);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      message.client.queue.delete(message.guild.id);
      return sendError(`I could not join the voice channel: ${error}`, message.channel);
    } 
  


  


},

};
