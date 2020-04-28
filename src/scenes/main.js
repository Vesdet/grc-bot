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
main.hears(actions.DARKNESTS, (ctx) => ctx.scene.enter('darknests'));

main.hears(commands.USERS, async (ctx) => {
  const users = Database.getAllUsers();
  await ctx.reply(`Количество уникальных пользователей ${users.length}`);
  await ctx.reply(users.map(user => `${Object.values(user).join(' ')}\n`).join(''));
});

main.hears(notCommand, (ctx) => {
  return ctx.reply('Я не знаю такой команды :( Попробуй, что я умею, выбрав опцию из меню ниже');
});

module.exports = main;
