const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');

const { actions } = require('../common/actions');
const { commands } = require('../common/commands');
const { notCommand } = require('../common/commands');
const Database = require('../database');

const main = new Scene('main');
main.enter(ctx => ctx.reply('Попробуй, что я умею, выбрав опцию из меню ниже',
  Markup.keyboard([actions.HUNTING, actions.EQUIPMENT, actions.DARKNESTS])
    .resize()
    .extra()
));
main.hears(actions.HUNTING, (ctx) => ctx.scene.enter('hunting'));
main.hears(actions.EQUIPMENT, (ctx) => ctx.scene.enter('equipment'));
main.hears(actions.DARKNESTS, async (ctx) => {
  await ctx.replyWithHTML(
    '1) Если идем <b>пехами</b> - бьем на <i>пех фаланге</i>\n' +
    'НЕ берем подушку из 4 солдат других типов'
  );
  await ctx.replyWithHTML(
    '2) Если идем <b>кавалерией</b> - бьем на <i>стрелковой фаланге</i> или <i>стрелковым клином</i> (если у врага солянка)\n' +
    'Берем подушку из 4 солдат других типов'
  );
  await ctx.replyWithHTML(
    '3) Если идем <b>стрелками</b>\n' +
    '\n' +
    'А) бьем <i>пехотной фалангой</i> или <i>кавалерийским клином</i>\n' +
    'Берем подушку из 4 солдат других типов\n' +
    '\n' +
    'Б) У врага только кони-луки - бьем <i>кавалерийской фалангой</i>\n' +
    'Берем подушку из 4 КОНЕЙ\n' +
    '\n' +
    'В) У врага кони-луки и меньше пехов - бьем <i>пех клином</i>\n' +
    'Берем подушку из 4 солдат других типов'
  );
});

main.hears(commands.USERS, async (ctx) => {
  const users = Database.getAllUsers();
  await ctx.reply(`Количество уникальных пользователей ${users.length}`);
  await ctx.reply(users.map(user => `${Object.values(user).join(' ')}\n`).join(''));
});

main.hears(notCommand, (ctx) => {
  return ctx.reply('Я не знаю такой команды :( Попробуй, что я умею, выбрав опцию из меню ниже');
});

module.exports = main;
