const commands = {
  START: '/start',
  NEWS: '/news'
};

const notCommand = text => !Object.values(commands).includes(text);

module.exports = {
  commands,
  notCommand
};
