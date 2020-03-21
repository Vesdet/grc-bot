const Telegraf = require('telegraf');

const TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new Telegraf(TOKEN);

bot.start((ctx) => ctx.reply('Привет! Введи имя моба, чтобы узнать какими героями его бить!'));

bot.hears(/hi/i, (ctx) => ctx.reply('Hey there'));

bot.launch();
