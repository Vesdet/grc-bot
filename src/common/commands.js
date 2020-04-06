const commands = {
  START: '/start',
  NEWS: '/news',
  USERS: '/users'
};

const notCommand = text => !Object.values(commands).includes(text);

module.exports = {
  commands,
  notCommand
};
