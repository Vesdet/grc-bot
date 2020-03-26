const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');

const { main, hunt, equipment } = require('./scenes');
const { commands } = require("./common/commands");

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(TOKEN);

let userIDs = [];

// Create scene manager
const stage = new Stage();

// Scene registration
stage.register(main, hunt, equipment);

bot.use(session());
bot.use(stage.middleware());

bot.start(async ctx => {
  if (!userIDs.includes(ctx.message.from.id)) {
    userIDs.push(ctx.message.from.id);
  }
  await ctx.reply('Привет! Меня зовут GRc Bot :)');
  return ctx.scene.enter('main');
});

bot.command(commands.NEWS, ctx => {
  return ctx.reply(
    '1. Добавлены кнопки для выбора моба в разделе "Охота".\n' +
    '2. Добавлен новый сет одежды для пехов.\n'
  );
});

bot.hears(/(.*)/i, (ctx) => {
  if (!userIDs.includes(ctx.message.from.id)) {
    userIDs.push(ctx.message.from.id);
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
