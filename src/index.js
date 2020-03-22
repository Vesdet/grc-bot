const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const fs = require('fs');
const dictionary = require('./hunting/dictionary');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new Telegraf(TOKEN);

/* NIKITA TEST */
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const { leave } = Stage;



bot.start(({ reply }) =>
  reply('Привет! Меня зовут GRc Bot :) Попробуй, что я умею, выбрав опцию из меню ниже',
    Markup.keyboard(['Охота'])
      .oneTime()
      .resize()
      .extra()
  ));

const hunt = new Scene('hunting');
hunt.enter(({ reply }) =>
  reply('Привет! Введи имя моба, чтобы узнать какими героями его бить!',
    Markup.keyboard(['Выйти'])
      .oneTime()
      .resize()
      .extra()
  ));
hunt.leave((ctx) => ctx.reply('Bye'));
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

// hunt.on('message', (ctx) => ctx.reply('Send `hi`'))

// Create scene manager
const stage = new Stage()
const session = require('telegraf/session')
stage.command('cancel', leave())

// Scene registration
stage.register(hunt)

bot.use(session())
bot.use(stage.middleware())
bot.hears('Охота', (ctx) => {
  return ctx.scene.enter('hunting')
})


// bot.hears(/(.*)/i, (ctx) => {
//   const mob = ctx.match[1].trim().toLowerCase();
//   const entity = Object.entries(dictionary).find(([key, value]) => value.includes(mob));
//
//   if (entity) {
//     try {
//       return ctx.replyWithPhoto({ source: fs.createReadStream(`src/hunting/images/${entity[0]}.jpg`) });
//     } catch {
//       return ctx.reply('Мне такой моб не знаком :( Попробуй ввести его другое название');
//     }
//   }
//
//   return ctx.reply('Мне такой моб не знаком :( Попробуй ввести его другое название');
// });

bot.launch({
  // webhook: {
  //   domain: 'grc-bot.herokuapp.com',
  //   hookPath: '/RANDOM_ID',
  //   port: process.env.PORT || 5000
  // }
});
