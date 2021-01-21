const actions = {
  HUNTING: '⚡️Охота',
  HUNTING_BONAPPETI: 'Вивиан',
  HUNTING_TERRORTHORN: 'Шип',
  HUNTING_GRIMREAPER: 'Жнец',
  HUNTING_HARDROX: 'Голем',
  HUNTING_GARGANTUA: 'Гаргантюа',
  HUNTING_MEGAMAGGOT: 'Магот',
  HUNTING_GRYPHON: 'Грифон',
  HUNTING_TIDALTITAN: 'Титан',
  HUNTING_BLACWING: 'Чернокрыл',
  HUNTING_QUEENBEE: 'Пчела',
  HUNTING_FROSTWING: 'Ледокрыл',
  HUNTING_NOCEROS: 'Рино',
  HUNTING_JADEWYRM: 'Змей',
  HUNTING_SABERFANG: 'Саблезуб',
  HUNTING_VOODOOSHAMAN: 'Шаман',
  HUNTING_SNOWBEAST: 'Вьюжник',
  HUNTING_HELLDRIDER: 'Драйдер',
  HUNTING_MECHATROJAN: 'Конь',
  HUNTING_COTTAGEROAR: 'Теремок',
  HUNTING_HOODCLAW: 'Жуткая лапа',
  EQUIPMENT: '⚔️Сеты',
  EQUIPMENT_INFANTRY: '🛡 Пехи',
  EQUIPMENT_RANGED: '🏹 Луки',
  EQUIPMENT_CAVALRY: '🐴 Кони',
  EQUIPMENT_MIX: '🔮 Солянка',
  DARKNESTS: '🔱 Походы на басты/врага',
  DARKNESTS_FORMATION: '⚜ Построения',
  DARKNESTS_FAMILIARS: '🐰 Фамильяры',
  SG_REGISTRATION: '🏆 СГ Регистрация',
  FAMILIARS_LOOT: '📯 Фамы: все о прокачке',
  FAMILIARS_LOOT_COMMON: 'Общая информация',
  FAMILIARS_LOOT_FIRST: 'Пакт 1',
  FAMILIARS_LOOT_SECOND: 'Пакт 2',
  FAMILIARS_LOOT_THIRD: 'Пакт 3',
  FAMILIARS_LOOT_FOURTH: 'Пакт 4',
  BACK: '⬅️ Назад'
};

const backCallback = async (ctx, prevScene) => {
  const scene = typeof prevScene === 'string' ? prevScene : 'main';
  await ctx.scene.leave();
  return ctx.scene.enter(scene);
};

module.exports = {
  actions,
  backCallback
};
