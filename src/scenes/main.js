const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');

const { actions } = require('../common/actions');
const { notCommand } = require('../common/commands');

const main = new Scene('main');
main.enter(ctx => ctx.reply('Попробуй, что я умею, выбрав опцию из меню ниже',
  Markup.keyboard([actions.HUNTING, actions.EQUIPMENT])
    .resize()
    .extra()
));
main.hears(actions.HUNTING, (ctx) => ctx.scene.enter('hunting'));
main.hears(actions.EQUIPMENT, (ctx) => ctx.scene.enter('equipment'));

main.hears(notCommand, (ctx) => {
  return ctx.reply('Я не знаю такой команды :( Попробуй, что я умею, выбрав опцию из меню ниже');
});

module.exports = main;
