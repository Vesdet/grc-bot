const actions = {
  HUNTING: 'Охота',
  EQUIPMENT: 'Сеты',
  BACK: 'Назад'
};

const backCallback = async ctx => {
  await ctx.scene.leave();
  return ctx.scene.enter('main')
};

module.exports = {
  actions,
  backCallback
};
