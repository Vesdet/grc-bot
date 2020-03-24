const fs = require('fs');
const Markup = require('telegraf/markup');
const Scene = require('telegraf/scenes/base');

const { actions, backCallback } = require('../common/actions');
const { notCommand } = require('../common/commands');

const mapActionToSetName = {
  [actions.EQUIPMENT_INFANTRY]: 'infantry',
  [actions.EQUIPMENT_RANGED]: 'ranged',
  [actions.EQUIPMENT_CAVALRY]: 'cavalry',
  [actions.EQUIPMENT_MIX]: 'mix'
};

const equipmentCallback = async ctx => {
  const set = mapActionToSetName[ctx.message.text];
  const directory = `src/equipment/images/`;

  const images = fs.readdirSync(directory);
  for (const image of images) {
    if (image.startsWith(set)) {
      await ctx.replyWithPhoto({ source: fs.createReadStream(`${directory}/${image}`) });
    }
  }
};

const equipment = new Scene('equipment');
equipment.enter(({ reply }) =>
  reply('Выбери тип войск из меню ниже',
    Markup.keyboard([
      [actions.EQUIPMENT_INFANTRY, actions.EQUIPMENT_RANGED, actions.EQUIPMENT_CAVALRY],
      [actions.EQUIPMENT_MIX],
      [actions.BACK]
    ])
      .resize()
      .extra()
  ));

equipment.hears(actions.BACK, backCallback);
equipment.hears(actions.EQUIPMENT_INFANTRY, equipmentCallback);
equipment.hears(actions.EQUIPMENT_RANGED, equipmentCallback);
equipment.hears(actions.EQUIPMENT_CAVALRY, equipmentCallback);
equipment.hears(actions.EQUIPMENT_MIX, equipmentCallback);
equipment.hears(notCommand, (ctx) => {
  return ctx.reply('Я не знаю такой команды :( Попробуй, что я умею, выбрав опцию из меню ниже');
});

module.exports = equipment;
