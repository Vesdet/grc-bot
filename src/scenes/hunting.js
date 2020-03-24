const fs = require('fs');
const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');
const dictionary = require('../hunting/dictionary.json');

const hunt = new Scene('hunting');
hunt.enter(({ reply }) =>
  reply('Введи имя моба, чтобы узнать какими героями его бить!',
    Markup.keyboard(['Выйти'])
      .oneTime()
      .resize()
      .extra()
  ));
hunt.hears('Выйти', async ctx => {
  await ctx.scene.leave();
  return ctx.scene.enter('main')
});
hunt.hears(/(.*)/i, (ctx) => {
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

module.exports = hunt;
