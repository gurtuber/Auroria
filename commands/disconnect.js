exports.desc = "Get the bot to disconnect from your voice channel.";
exports.syntax = "disconnect"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function(msg) {
  var bot = main.bot;
  var config = main.config;
  var cmd = config["prefix_" + msg.guild.id];
  var musQueue = main.musQueue;
  
      var canPlay = false;

      for (var i = 0; i < musicBotGuilds.length && !canPlay; i++) {
        if (musicBotGuilds[i] === msg.guild.id) {
          canPlay = true;
        }
      }

      if (!canPlay) {
        msg.delete();
        msg.reply(":musical_note: :no_entry_sign: Error. This server has not been whitelisted to use the music part of this bot. (Apply for access here: ** " + musicApplyLink + "**) :musical_note:");
        return;
      }

      msg.delete();

      if (msg.guild.roles.find("name", "Staff") == null) {
            msg.reply('```An error has occured\nReason: Role: Staff does not exist. Contact the server owner and get him/her to create it.```')
            return;
      }

      if (!(msg.member.roles.has(msg.guild.roles.find("name", "Staff").id))) {
            msg.reply('```You can not run this command\nReason: You are not in the correct permission role [Staff]```')
            .then(mesg => {
                setTimeout(function() {
                mesg.delete();
            }, 5000);
            });
            return;
      }

      if (bot.voiceConnections.get(msg.channel.guild.id) == null || bot.voiceConnections.get(msg.channel.guild.id) == undefined) return msg.channel.sendMessage(":musical_note: I am not even in a voice channel! :no_entry_sign:");
      let voiceChannelConnection = bot.voiceConnections.get(msg.guild.id).channel;
      msg.reply(":musical_note: Disconnecting from **" + voiceChannelConnection.name + "** ...");
      voiceChannelConnection.leave();
      console.log("Music> Disconnected from: " + voiceChannelConnection.name + " on " + msg.channel.guild.name + ".");
}