const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');

const main = new Scene('main');
main.enter(ctx => ctx.reply('Попробуй, что я умею, выбрав опцию из меню ниже',
  Markup.keyboard(['Охота'])
    .oneTime()
    .resize()
    .extra()
));
main.hears('Охота', (ctx) => ctx.scene.enter('hunting'));

module.exports = main;
