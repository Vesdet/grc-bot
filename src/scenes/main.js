const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');

const { actions } = require('../common/actions');
const { commands } = require('../common/commands');
const { notCommand } = require('../common/commands');
const Database = require('../database');

const main = new Scene('main');
main.enter(ctx => ctx.reply('Попробуй, что я умею, выбрав опцию из меню ниже',
  Markup.keyboard([
    [actions.HUNTING],
    [actions.EQUIPMENT, actions.DARKNESTS],
    [actions.SG_REGISTRATION, actions.FAMILIARS_LOOT]
  ])
    .resize()
    .extra()
));
main.hears(actions.HUNTING, (ctx) => ctx.scene.enter('hunting'));
main.hears(actions.EQUIPMENT, (ctx) => ctx.scene.enter('equipment'));
main.hears(actions.DARKNESTS, (ctx) => ctx.scene.enter('darknests'));
main.hears(actions.FAMILIARS_LOOT, (ctx) => ctx.scene.enter('familiarsLoot'));
main.hears(actions.SG_REGISTRATION, (ctx) => {
  ctx.replyWithHTML(
    '1. Переходим на боевые таланты и ставим боевой шмот\n' +
    '2. По возможности активируем алтарь (казнив одного из захваченных лидеров)\n' +
    '3. Просим у товарища лидера 60 уровня на пару минут\n' +
    '4. Делаем разведку на любой замок и активируем запал битвы, чтобы увеличить атаку армии\n' +
    '5. Активируем буст 20% атаки армии (а если вы богач, то и 50% атаки армии)\n' +
    '6. Регистрируемся с боевыми героями (никаких травоядных зажигалок, фей и т.д.)\n' +
    '7. Регистрируемся однотипной армией на выбор и правильной фалангой. Обязательно берём подушку по 4 солдата каждого типа\n' +
    '8. Клины в столкновение не ставим, оперируем только двумя фалангами\n' +
    '9. Примеры регистрации\n' +
    '    А) берём 374992 луков, 4 штуки коней и 4 штуки пехов. Ставим ПЕХОТНУЮ фалангу\n' +
    '    Б) берём 375к пехов. Подушку можно не брать. Ставим ПЕХОТНУЮ фалангу\n' +
    '    В) берём 374992 коней, 4 штуки пехов и 4 штуки луков. Ставим СТРЕЛКОВУЮ фалангу\n' +
    '10. Р4 или назначенный человек наблюдает за чередованием регистрации и при необходимости просит перерегистрироваться тем или иным типом\n'
  )
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
