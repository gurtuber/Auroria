exports.desc = "Owners can change the command prefix.";
exports.syntax = "setprefix (pref)"

var main = require("C:/BOT/bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var config = main.config;
  var cmd = config["prefix_" + msg.guild.id];
  var musQueue = main.musQueue;
  var fs = main.fs;	

 console.log(`${msg.author.username} has attempted to use the Set Prefix command on ${msg.channel.guild.name}`);

		if (msg.guild.owner.id != msg.author.id) {
			msg.reply("Only the Server Owner can run this command.");
			return;
		} else {
			let args = msg.content.replace(cmd + "setprefix ", "").replace("`", '').replace("``", '').replace("```", '').replace(" ", "");

			if (args.length > 3 || args.length == 0) {
				msg.reply("The prefix length must be between 1-3 characters long! (" + args.length + ")");
				return;
			}

			if (args.includes(" ") || args == "" || args == " " || args.indexOf(' ') !== -1) {
				msg.reply("The prefix can not contain spaces!");
				return;
			}

			var prefix = args;

			if (cmd == prefix) {
				msg.reply("That is already the current prefix!");
				return;
			}

			if (prefix.includes(",") || prefix.includes(" ") || config["prefix_" + msg.guild.id].includes(",")) {
				msg.reply("Prefixes can not contain commas or spaces, sorry!");
				return;
			}

			const embed = new Discord.RichEmbed()
  					.setTitle('-=-=-=-= Server Prefix Update -=-=-=-=')
  					.setAuthor( msg.author.username, msg.author.avatarURL )
  					.setColor([41, 255, 13])
  					.setDescription(`The Command prefix has been updated by the server owner (**${msg.author.username}**)`)
  					.setFooter('', '')
  					.setImage( "" )
  					.setThumbnail( "" )
  					.setTimestamp( '' )
  					.setURL('')
  					.addField(`-> Old Prefix`, `${cmd}`)
  					.addField(`-> New Prefix`, `${prefix}`);

			config["prefix_" + msg.guild.id] = prefix;
  			fs.writeFile('./config.json', JSON.stringify(config), (err) => {if(err) console.error(err)});
  			msg.channel.sendEmbed(embed, '', { disableEveryone: true });
		}
}