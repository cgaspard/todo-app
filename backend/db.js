const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      google_id TEXT UNIQUE,
      facebook_id TEXT UNIQUE,
      display_name TEXT
    )
  `);

  db.run(`
    CREATE TABLE todos (
      id INTEGER PRIMARY KEY,
      user_id INTEGER,
      title TEXT,
      description TEXT,
      completed BOOLEAN,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
};

const findOrCreateUser = (profile) => {
  return new Promise((resolve, reject) => {
    const googleId = profile.provider === "google" ? profile.id : null;
    const facebookId = profile.provider === "facebook" ? profile.id : null;

    db.get(
      "SELECT * FROM users WHERE google_id = ? OR facebook_id = ?",
      [googleId, facebookId],
      (err, row) => {
        if (err) {
          return reject(err);
        }

        if (row) {
          resolve(row);
        } else {
          db.run(
            "INSERT INTO users (google_id, facebook_id, display_name) VALUES (?, ?, ?)",
            [googleId, facebookId, profile.displayName],
            function (err) {
              if (err) {
                return reject(err);
              }
              resolve(getUserById(this.lastID));
            }
          );
        }
      }
    );
  });
};

// Add your other database functions for todos below

module.exports = {
  getUserById,
  findOrCreateUser,
  // Export other database functions
};
