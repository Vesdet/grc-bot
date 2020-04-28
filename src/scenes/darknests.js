const fs = require('fs');
const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');

const { actions, backCallback } = require('../common/actions');
const { notCommand } = require('../common/commands');

const darknests = new Scene('darknests');

darknests.enter(({ reply }) =>
  reply('В данном разделе ты получишь информацию по построениям и фамильярам под разные типы войск. Выбери опцию из меню ниже',
    Markup.keyboard([
      [actions.DARKNESTS_FORMATION],
      [actions.DARKNESTS_FAMILIARS],
      [actions.BACK]
    ])
      .resize()
      .extra()
  ));

darknests.hears(actions.DARKNESTS_FAMILIARS, (ctx) => ctx.scene.enter('familiars'));
darknests.hears(actions.DARKNESTS_FORMATION, async (ctx) => {
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


darknests.hears(actions.BACK, backCallback);
darknests.hears(notCommand, (ctx) => {
  return ctx.reply('Я не знаю такой команды :( Попробуй, что я умею, выбрав опцию из меню ниже');
});

module.exports = darknests;
