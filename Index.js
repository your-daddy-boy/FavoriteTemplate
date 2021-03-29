const Discord = require('discord.js');
const { Client, Collection } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Canvas = require('canvas');
const fs = require("fs");
const { readdirSync } = require("fs");
const { join } = require("path");
const snekfetch = require("snekfetch");
const fetch = require("node-fetch");
const { prefix, serverId, ownerId, coownerId, genChannelOnlyId } = require('./Database.json');
//const client = new Client({ disableMentions: "everyone" });
const client = new Client()

require('dotenv').config()
client.commands = new Collection();
client.prefix = prefix;
client.queue = new Map()

const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`✅ ${client.user.username} Summoned`);
  });

client.on("warn", (info) => console.log(info));

client.on("error", console.error);

let ikan = ["bitrate?"]
client.on("message", async message => {
  if (ikan.some(word => message.toString().toLowerCase().includes(word))) {
    let channel = message.member.voice.channel.bitrate;
    message.channel.send(channel);
  }
});

/*client.on("ready", (message => {
   client.user.setStatus("ONLINE");
   console.log(`${client.user.tag} Summoned`);
   console.log(`VORSTELLEN ${client.guilds.cache.size} SERVER`);
  //command status bot
  setInterval(() => {
  
    const status = [
        `Development`,
      `discord.gg/culverine`,
      `@culverine.official`,
    ];
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity({
      url: "https://www.youtube.com/watch?v=S2IYCZnhHcg",
      name: status[random],
      type: "STREAMING",
    });
  }, 3000)
}));
*/
client.on("ready", () => {
 
        
    let statuses = [     
      
      `Development`,
      `discord.gg/culverine`,
      `@culverine.official`,
                   ];
    setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)]
        
        client.user.setPresence({ activity: 
                                { name : status }, 
                                  status : "online",                               
                                  type : 'Playing' });
    }, 5000);
    
})

/**
 * Import all commands
 */
client.on("message", async (message) => {
const commandFiles = readdirSync(join(__dirname, "Commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "Commands", `${file}`));
  client.commands.set(command.name, command);  
  console.log("✅ Loading Command: " +command.name)
};
})

client.on("message", async (message) => {
  if (message.author.bot) return;
  // if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }
/*if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}
  if (command.myServerOnly && message.guild.id !== serverId) {
    message.channel.send('Command Cannot be used in this server. This command can only be used in servers specified by the bot developer')
    return false;
  }*/
  if (command.ownerOnly && message.author.id !== ownerId || coownerId) {
    message.channel.send('Developer Command')
    return false;
  }/*
  if (command.genChannelOnly && message.channel.id !== genChannelOnlyId) {
    message.channel.send(`This command can only be used in <#${genChannelOnlyId || "deleted-channel"}>`)
    return false;
  }*/
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(client, message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command, i thought").catch(console.error);
  }
});

var express = require("express");
var http = require("http");
var { get } = require("snekfetch");
var app = express();

// Ping the app
app.use(express.static("public"));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => res.sendStatus(200));

// Request listener
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 28000);

client.on("guildMemberAdd", member => {
const channelwel = '771106776757567500'
const total = member.guild.memberCount;
const welcomeEmbed = new Discord.MessageEmbed()

.setAuthor('assalamualaikum','https://media.discordapp.net/attachments/789572136577794099/817484025224233020/20210305_082636.gif')
.setThumbnail(member.user.displayAvatarURL({format: 'png', dynamic: true})+"?size=2048")
.setDescription("[𝗦𝗲𝗹𝗮𝗺𝗮𝘁 𝗱𝗮𝘁𝗮𝗻𝗴 𝗱𝗶 𝗖𝗨𝗟𝗩𝗘𝗥𝗜𝗡𝗘](https://discord.com/api/oauth2/authorize?client_id=778387309883293716&permissions=0&scope=bot)\n<a:Arrow:820477468934799380> 𝗶𝗻𝗳𝗼 𝘀𝗲𝗿𝘃𝗲𝗿 : <#786926169815646219>\n<a:Arrow:820477468934799380> 𝗰𝗹𝗮𝗶𝗺 𝗿𝗼𝗹𝗲𝘀 : <#773404943927345232>\n<a:Arrow:820477468934799380> 𝗶𝘀𝗶 𝗯𝗶𝗼𝗱𝗮𝘁𝗮 : <#790339724208373812>\nI hope you guys enjoy and have fun, stay here.")
.setColor("ffd800")
.setFooter(`Member this time : ${total}`)
.setImage(`https://cdn.discordapp.com/attachments/817926359945838602/820574234186874880/Presents.png`)
.setTimestamp()
member.guild.channels.cache.get(channelwel).send(`<@${member.id}>`,welcomeEmbed)

});

//COSTOM BOT ACTION
//client.on("message", async message => {
  
  // if (message.content === "") message.channel.send('');
//})

//SNIPE.JS
client.snipes = new Map()
client.on('messageDelete', function(message, channel){
 client.snipes.set(message.channel.id,{
  content: message.content, 
  author: message.author, 
  image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
})

client.on("message", async message => {
  if (message.content === "welcomee") message.channel.send('https://cdn.discordapp.com/emojis/805981523005800488.gif?v=1');
  if (message.content === "halo") message.reply('Halo sayang');
  if (message.content === "Halo") message.reply('Halo sayang');
  if (message.content === "night") message.reply('Night juga sayang');
  if (message.content === "morning") message.reply('Morning juga sayang');
  if (message.content === "hay") message.channel.send('jangan canggung yah buat mampir dan stay disini sayang');
  if (message.content === "yuk") message.channel.send('yuk ajak teman kalian buat join kesini <a:la:781018633076736051>');
})

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};

client.on('message', message => {
    if (message.content === 'gojoin') {
        client.emit('guildMemberAdd', message.member);
    }
});
client.on('guildMemberAdd', async member => {
	//const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
	//if (!channel) return;

	const canvas = Canvas.createCanvas(700, 360);
	const ctx = canvas.getContext('2d');
  
	const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/817926359945838602/818772864781385788/1615222660546-picsay.png');
  //const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/817926359945838602/819432872892956692/a53ee9d9fe9f444d81ff66dbd2699317.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#111111';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	//ctx.font = 'bold 50px Cooper';
	//ctx.fillStyle = 'ffffff';
	//ctx.fillText(`-#${member.guild.memberCount}`, 700, canvas.height / 3);
  
  //ctx.font = applyText(canvas, `${member.displayName}!`);
	//ctx.fillStyle = 'ffffff';
	//ctx.fillText(`to our guild`, canvas.width / 2.5, canvas.height / 1.8);
  
  /*ctx.font = 'bold 50px Genta';
	ctx.fillStyle = 'ffffff';
	ctx.fillText(`- #${member.guild.memberCount}`, canvas.height / 2 + 125);
  */
      //ctx.font = 'bold 60px Genta';
      //ctx.fillStyle = '#f2f2f2';
      //ctx.fillText(`Member #${member.guild.memberCount}`, 750, canvas.height / 2 + 125);
  
  
  
  ctx.font = 'bold 40px Genta';
	ctx.fillStyle = '#00ff2f';
	ctx.fillText(`${member.user.username}#${member.user.discriminator}`, canvas.width / 17, canvas.height / 1.2);

  ctx.font = 'bold 28px Genta';
	ctx.fillStyle = '#00ff2f';
	ctx.fillText(`-#${member.guild.memberCount}`, canvas.width / 17, canvas.height / 1.1);


	
  
	ctx.beginPath();
  //ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);
   //ctx.drawImage(avatar, 50, canvas.height / 2 - 250, 250, 250);
  
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ikanaa.jpg');

  //let abagu = new Discord.MessageEmbed()
  //.addField(`Selamat Datang DI CULVERINE ${member.username}`,"❖➤ Baca rules terlebih dahulu ya : <#786926169815646219>\n❖➤ Isi form <#790339724208373812>\n❖➤ Silahkan ambil role disini  : <#773404943927345232>")
  //.setImage("attachment://ikanaa.jpg")
  //.attachFiles(attachment)
  //.setColor("#00ff2f")
  
 member.guild.channels.cache.get("595719013930369028").send(`───────────────────────────────────\n**Selamat Datang di CULVERINE** <@${member.id}>\n<a:emoji_245:819397554851676162> Baca rules terlebih dahulu ya : <#786926169815646219>\n<a:emoji_245:819397554851676162> Isi form kalian yah <#790339724208373812>\n<a:emoji_245:819397554851676162> Silahkan ambil role disini  : <#773404943927345232>\n───────────────────────────────────`, attachment)
	//channel.send(bagu);
});

client.on('guildMemberRemove', async member => {
	//const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
	//if (!channel) return;

	const canvas = Canvas.createCanvas(700, 360);
	const ctx = canvas.getContext('2d');
  
	const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/817926359945838602/818772830514184232/1615222660546-picsay.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#111111';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	//ctx.font = 'bold 50px Cooper';
	//ctx.fillStyle = 'ffffff';
	//ctx.fillText(`-#${member.guild.memberCount}`, 700, canvas.height / 3);
  
  //ctx.font = applyText(canvas, `${member.displayName}!`);
	//ctx.fillStyle = 'ffffff';
	//ctx.fillText(`to our guild`, canvas.width / 2.5, canvas.height / 1.8);
  
  /*ctx.font = 'bold 50px Genta';
	ctx.fillStyle = 'ffffff';
	ctx.fillText(`- #${member.guild.memberCount}`, canvas.height / 2 + 125);
  */
      //ctx.font = 'bold 60px Genta';
      //ctx.fillStyle = '#f2f2f2';
      //ctx.fillText(`Member #${member.guild.memberCount}`, 750, canvas.height / 2 + 125);
  
  
  
  ctx.font = 'bold 40px Genta';
	ctx.fillStyle = '#f5ff00';
	ctx.fillText(`${member.user.username}#${member.user.discriminator}`, canvas.width / 17, canvas.height / 1.2);

  ctx.font = 'bold 28px Genta';
	ctx.fillStyle = '#f5ff00';
	ctx.fillText(`-#${member.guild.memberCount}`, canvas.width / 17, canvas.height / 1.1);


  
	ctx.beginPath();
  //ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);
   //ctx.drawImage(avatar, 50, canvas.height / 2 - 250, 250, 250);
  
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ikan.jpg');

  ///let bagu = new Discord.MessageEmbed()
  //.setImage("attachment://ikandd.jpg")
  //.attachFiles(attachment)
  //.setColor("#f5ff00")
  
 member.guild.channels.cache.get("595719013930369028").send(attachment)
	//channel.send(bagu);
});
/*

client.on("guildMemberRemove", member => {

let welcomeEmbedaa = new MessageEmbed()

.setAuthor(member.displayName, client.user.displayAvatarURL({format: 'png', dynamic: true})+"?size=2048")
//.setImage(`https://cdn.discordapp.com/attachments/803150196129136681/805335292419768340/LEGEND_20210131_141401.gif`)
//.setTitle("Joined the server")
.setColor("96fff1")
.addField("Leaving",`Good bye ${member.displayName}`)
//.addField("Nickname",`${member.displayName}`)
//.addField("Mentioned",`[<@${member.id}>]`)
//.addField("Rules & Guide",`[<#759125660072673300>]\n[<#759125659606843461>]`, true)
//.addField("Introduce and Roles",`[<#804552298352476190>]\n[<#804173888497254440>]`, true)
//.setDescription(`If there is some trouble, you can contact <@759125659606843454>. Thank you boi`)
//.addField('Support :',`> [\***Invite***\](https://discord.com/api/oauth2/authorize?client_id=778387309883293716&permissions=0&scope=bot)`)
.setFooter(`Gheayoubi`)
//.setImage(`https://cdn.discordapp.com/attachments/728962702504099881/781211664410083378/IMG_20201126_013534.jpg`)
member.guild.channels.cache.get('817959611247493161').send(welcomeEmbedaa);
})
*/
//let databukanmain = require('File.js')

client.login(process.env.TOKENdd)
