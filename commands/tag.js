exports.desc = "View a tag.";
exports.syntax = "tag (name)"

var main = require("../bot.js");
var Discord = require("discord.js");

exports.run = function (msg) {
    var bot = main.bot;
    var sql = main.sql;

    sql.get("SELECT * FROM db WHERE guildID ='" + msg.guild.id + "'")
        .then(row => {
            var cmd = row.prefix;
            var args = msg.content.replace(cmd + "tag ", "").split(" ");

            if (args.length < 1 || args.length > 1) {
                msg.reply("Invalid argument size! Syntax: **" + this.syntax + "**.");
                return;
            }

            sql.get("SELECT * FROM tags WHERE guildID ='" + msg.guild.id + "'")
                .then(rowT => {
                    var data = JSON.parse(rowT.data);

                    if (data == null || data == undefined || !rowT || rowT.data == null || rowT.data == undefined) return msg.reply("No tags available to view!");

                    var found = false;
                    var foundI;

                    for (i = 0; i < data.length; i++) {
                        if (data[i] != undefined || data[i].name != null) {
                            if (data[i].name == args[0]) {
                                found = true;
                                foundI = i;
                            }
                        }
                    }

                    if (found) return msg.channel.sendMessage(data[foundI].content);
                    if (!found) return msg.channel.sendMessage('That tag does not exist!');
                });
        });
}