const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');

const { actions, backCallback } = require('../common/actions');
const { notCommand } = require('../common/commands');

const jewels = new Scene('jewels');
const NUMBER_OF_EQUIP = 8;

jewels.enter(({ replyWithHTML }) => replyWithHTML(
  'Введи количество своих камней в формате:\n' +
  'Серый Зеленый Синий Фиолетовый Золотой\n' +
  'Например: 10 10 1 2 0',
  Markup.keyboard([[actions.BACK]])
    .resize()
    .extra()
));

jewels.hears(actions.BACK, ctx => backCallback(ctx, 'equipment'));

jewels.hears(notCommand, (ctx) => {
  const jewel = ctx.message.text.trim().toLowerCase();
  const arr = jewel.split(" ").map(it => +it);
  if (arr.length !== 5 || arr.some(it => !Number.isInteger(it))) return ctx.reply("Неверный формат");

  return ctx.reply(`Лучшая комбинация на ${NUMBER_OF_EQUIP} шмоток: \n${showJewelsResult(calcJewels(arr))}`);
});

/**
 * @param {Array<Number>} x - [Серый, Зелёный, Синий, Фиолектовый, Золотой]
 * @return {Array<Number>}
 */
function calcJewels(x) {
  const commons = x.reduce((acc, it, i) => acc + it * Math.pow(4, i), 0);
  if (commons <= NUMBER_OF_EQUIP) return [commons, 0, 0, 0, 0];
  let newarr = new Array(5).fill(0);

  [1,2,3,4].reduce((acc, i) => {
    if (acc === 0) return acc;
    newarr[i] = Math.floor(acc / 4);
    newarr[i-1] = acc % 4;
    if (newarr[i] >= NUMBER_OF_EQUIP) return newarr[i];

    while (newarr[i] + newarr[i-1] < NUMBER_OF_EQUIP) {
      newarr[i] -=1;
      newarr[i-1] += 4;
    }
    return 0;
  }, commons);

  return newarr;
}

function showJewelsResult(arr) {
  const mapping = {
    4: "Серый(ых)",
    3: "Зелёный(ых)",
    2: "Синий(их)",
    1: "Фиолектовый(ых)",
    0: "Золотой(ых)"
  };

  let result = "";
  arr.reverse().reduce((acc, it, i) => {
    if (acc === 0) return 0;
    if (it === 0) return acc;
    if (it >= acc) {
      result += `${acc} ${mapping[i]}`;
      return 0;
    }
    result += `${it} ${mapping[i]} `;
    return acc - it;
  }, NUMBER_OF_EQUIP);

  return result;
}

module.exports = jewels;