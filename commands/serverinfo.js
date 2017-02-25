exports.desc = "Take a look at some information about the current server.";
exports.syntax = "serverinfo"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
  var bot = main.bot;

  var sender = "";
  if (msg.channel.guild.member(msg.author).nickname == null) {
    sender = msg.author.username;
  } else {
    sender = msg.channel.guild.member(msg.author).nickname;
  }
  msg.delete();
  // SEXC EMBEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
  const embed = new Discord.RichEmbed()
    .setTitle('Server Info:')
    .setAuthor(sender, msg.author.avatarURL)
    .setColor(0x00AE86)
    .setDescription('')
    .setFooter('', '')
    .setImage('')
    .setThumbnail("")
    .setTimestamp()
    .setURL('')
    .addField('\nName:', msg.channel.guild.name)
    .addField('\nID:', msg.channel.guild.id)
    .addField('\nMember Count:', msg.channel.guild.memberCount)
    .addField('\nRegion:', msg.channel.guild.region)

  msg.channel.sendEmbed(
    embed,
    '',
    { disableEveryone: true }
  );
}