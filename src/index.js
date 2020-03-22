const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const session = require('telegraf/session');

const fs = require('fs');
const dictionary = require('./hunting/dictionary');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new Telegraf(TOKEN);

const main = new Scene('main');
main.enter(ctx => ctx.reply('Попробуй, что я умею, выбрав опцию из меню ниже',
  Markup.keyboard(['Охота'])
    .oneTime()
    .resize()
    .extra()
));
main.hears('Охота', (ctx) => ctx.scene.enter('hunting'));

const hunt = new Scene('hunting');
hunt.enter(({ reply }) =>
  reply('Введи имя моба, чтобы узнать какими героями его бить!',
    Markup.keyboard(['Выйти'])
      .oneTime()
      .resize()
      .extra()
  ));
hunt.hears("Выйти", async ctx => {
  await ctx.scene.leave();
  return ctx.scene.enter("main")
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

// Create scene manager
const stage = new Stage()

// Scene registration
stage.register(main);
stage.register(hunt);

bot.use(session());
bot.use(stage.middleware());

bot.start(async ctx => {
  await ctx.reply('Привет! Меня зовут GRc Bot :)');
  return ctx.scene.enter("main");
});

bot.launch({
  // webhook: {
  //   domain: 'grc-bot.herokuapp.com',
  //   hookPath: '/RANDOM_ID',
  //   port: process.env.PORT || 5000
  // }
});
