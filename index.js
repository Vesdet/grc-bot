const Telegraf = require('telegraf');


const TOKEN = "1134761566:AAHVfjmpmP2f488WwvPaZrKBuA-PeWwSXPE";

const bot = new Telegraf(TOKEN);

bot.start((ctx) => ctx.reply('Welcome!'));

bot.hears(/hi/i, (ctx) => ctx.reply('Hey there'));

bot.launch();