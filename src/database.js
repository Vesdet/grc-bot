const sqlite = require('sqlite-sync');

const initDatabase = (filename) => {
  sqlite.connect(filename);

  sqlite.run(`CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL UNIQUE,
  name TEXT
);`,
    (res) => {
      if (res.error) {
        throw res.error;
      }
    });
};

const getAllUsers = () => {
  return sqlite.run('SELECT * FROM users');
};

const isUserExists = (user_id) => {
  return sqlite.run('SELECT COUNT(*) as cnt FROM users WHERE  `user_id` = ?', [user_id])[0].cnt !== 0;
};

const addUser = (user) => {
  sqlite.insert('users', { user_id: user.id, name: user.name },
    (res) => {
      if (res.error) {
        throw res.error;
      }
    });
};

module.exports = {
  initDatabase,
  addUser,
  isUserExists,
  getAllUsers
};
