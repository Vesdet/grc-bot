const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');

const { hunt, main } = require('./scenes');
const { commands } = require("./common/commands");

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(TOKEN);

// Create scene manager
const stage = new Stage();

// Scene registration
stage.register(main, hunt);

bot.use(session());
bot.use(stage.middleware());

bot.start(async ctx => {
  await ctx.reply('Привет! Меня зовут GRc Bot :)');
  return ctx.scene.enter('main');
});

bot.command(commands.NEWS, ctx => {
  return ctx.reply('ВЫНЕСТИ ЭТУ СТРОКУ В ОТДЕЛЬНЫЙ ФАЙЛ');
});

bot.hears(/(.*)/i, (ctx) => {
  return ctx.reply(`Я не знаю такой команды :( Возможно, я обновился (что появилось нового можно узнать, используя ${commands.NEWS}). Набери или нажми ${commands.START} , чтобы увидеть, что я умею`)
});

bot.launch({
  // webhook: {
  //   domain: 'grc-bot.herokuapp.com',
  //   hookPath: '/RANDOM_ID',
  //   port: process.env.PORT || 5000
  // }
});
