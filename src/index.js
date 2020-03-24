const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');

const { hunt, main } = require('./scenes');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new Telegraf(TOKEN);

// Create scene manager
const stage = new Stage();

// Scene registration
stage.register(main);
stage.register(hunt);

bot.use(session());
bot.use(stage.middleware());

bot.start(async ctx => {
  await ctx.reply('Привет! Меня зовут GRc Bot :)');
  return ctx.scene.enter('main');
});

bot.hears(/(.*)/i, (ctx) => {
  return ctx.reply('Я не знаю такой команды :( Возможно, я обновился. Набери /start , чтобы увидеть, что я умею')
});

bot.launch({
  // webhook: {
  //   domain: 'grc-bot.herokuapp.com',
  //   hookPath: '/RANDOM_ID',
  //   port: process.env.PORT || 5000
  // }
});
