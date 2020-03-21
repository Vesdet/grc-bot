const Telegraf = require('telegraf');
const fs = require('fs');
const dictionary = require('./hunting/dictionary');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new Telegraf(TOKEN);

bot.start((ctx) => ctx.reply('Привет! Введи имя моба, чтобы узнать какими героями его бить!'));

bot.hears(/(.*)/i, (ctx) => {
  const mob = ctx.match[1].trim().toLowerCase();
  const entity = Object.entries(dictionary).find(([key, value]) => value.includes(mob));

  if (entity) {
    try {
      return ctx.replyWithPhoto({ source: fs.createReadStream(`src/hunting/images/${entity[0]}.jpg`) });
    } catch {
      return ctx.reply('Мне такой моб не знаком :( Попробуй ввести его другое название');
    }
  }

  return ctx.reply('Мне такой моб не знаком :( Попробуй ввести его другое название');
});

bot.launch({
  webhook: {
    domain: 'grc-bot.herokuapp.com',
    hookPath: '/RANDOM_ID',
    port: process.env.PORT || 5000
  }
});
