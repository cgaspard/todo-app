const { Sequelize } = require("sequelize");
// Initialize Sequelize instance
const TodoModel = require("./models/todo");
const UserModel = require("./models/user");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

// Define models
const Todo = TodoModel(sequelize);
const User = UserModel(sequelize);

// Define user model functions
async function getUserById(id) {
  const user = await User.findByPk(id);
  return user;
}

async function findOrCreateUser(profile) {
  const [user, created] = await User.findOrCreate({
    where: { googleId: profile.id },
    defaults: { email: profile.emails[0].value, name: profile.displayName },
  });
  return user;
}

// Sync models with the database
sequelize.sync().then(() => {
  console.log("Tables synced successfully.");
});

function initialize() {
  return Promise.resolve();
}

module.exports = {
  sequelize,
  User,
  Todo,
  getUserById,
  findOrCreateUser,
  initialize,
};
