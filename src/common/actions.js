const actions = {
  HUNTING: '⚡️Охота',
  EQUIPMENT: '⚔️Сеты',
  EQUIPMENT_INFANTRY: '🛡 Пехи',
  EQUIPMENT_RANGED: '🏹 Луки',
  EQUIPMENT_CAVALRY: '🐴 Кони',
  EQUIPMENT_MIX: '🔮 Солянка',
  BACK: '⬅️ Назад'
};

const backCallback = async ctx => {
  await ctx.scene.leave();
  return ctx.scene.enter('main')
};

module.exports = {
  actions,
  backCallback
};
