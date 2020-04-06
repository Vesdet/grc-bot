const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');

const Database = require('./database');
const { main, hunt, equipment } = require('./scenes');
const { commands } = require('./common/commands');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(TOKEN);

Database.initDatabase('users.db');
// Create scene manager
const stage = new Stage();

// Scene registration
stage.register(main, hunt, equipment);

bot.use(session());
bot.use(stage.middleware());

bot.start(async ctx => {
  if (!Database.isUserExists(ctx.message.from.id)) {
    Database.addUser({
      id: ctx.message.from.id,
      name: `${ctx.message.from.first_name} ${ctx.message.from.last_name}`
    });
  }
  await ctx.reply('Привет! Меня зовут GRc Bot :)');
  return ctx.scene.enter('main');
});

bot.command(commands.NEWS, ctx => {
  return ctx.reply(
    '1. Добавлена схема походов на басты или врага.\n' +
    'Особая благодарность Pink Boobs\n'
  );
});

bot.hears(/(.*)/i, (ctx) => {
  if (!Database.isUserExists(ctx.message.from.id)) {
    Database.addUser({
      id: ctx.message.from.id,
      name: `${ctx.message.from.first_name} ${ctx.message.from.last_name}`
    });
    ctx.reply(`Я не знаю такой команды :( Возможно, я обновился (что появилось нового можно узнать, используя ${commands.NEWS}).`)
  } else {
    ctx.reply('Возможно ты ко мне давно не заглядывал. Начни с главного меню');
  }
  return ctx.scene.enter('main');
});

bot.launch({
  webhook: {
    domain: 'grc-bot.herokuapp.com',
    hookPath: '/RANDOM_ID',
    port: process.env.PORT ||  '0.0.0.0'
  }
});
