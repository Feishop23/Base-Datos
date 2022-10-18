// Email y contraseña del usuario

const { getUserByEmail } = require("../users/users.controllers");
const { comparePassword } = require("../utils/crypto");

//El email es unico en mi base de datos

const loginUser = async (email, password) => {
  //El try hace lo mismo que el .then .catch pero nos deja usar el return de mejor manera
  try {
    const data = await getUserByEmail(email);
    //user.password contiene la contraseña incriptada de mi base de datos
    const verifyPassword = comparePassword(password, data.password);
    if (verifyPassword) {
      return data;
    }
    //el return false puede ir afuera del if
    //por que cuando se ejecute muere en el true
    // y ya no deja que siga para abajo en si corta todo codigo inferior
    return false;
  } catch (error) {
    return false;
  }
};

module.exports = loginUser;
