const sqlite = require('sqlite-sync');

const initDatabase = (filename) => {
  sqlite.connect(filename);

  sqlite.run(`CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL UNIQUE
);`,
    (res) => {
      if (res.error) {
        throw res.error;
      }
    });
};

const isUserExists = (user_id) => {
  return sqlite.run('SELECT COUNT(*) as cnt FROM users WHERE  `user_id` = ?', [user_id])[0].cnt !== 0;
};

const addUser = (user_id) => {
  sqlite.insert('users', { user_id },
    (res) => {
      if (res.error) {
        throw res.error;
      }
    });
};

module.exports = {
  initDatabase,
  addUser,
  isUserExists
};
