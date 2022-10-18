const bcrypt = require('bcrypt')


const hashPassword = (plainPassword) => {
return bcrypt.hashSync(plainPassword, 10)
}

//Creamos esta funcion para comparar la contraseña a ver si es o no
const comparePassword = (plainPassword, hashedPassword) => {
    //Esta utilidad se usa cuando hacemos un login y recibimos la contraseña del usurio y la comparamos con la que tenemos en la db
 return bcrypt.compareSync(plainPassword, hashedPassword)
}

console.log(hashPassword('root'))

//Con este comprovamos y si es correcto tiene que salir true y si no coincide tiene que salir false
console.log(comparePassword('root', '$2b$10$1bc.Xz8OvgoksJRrRyZcUe3wru1MuEOTH3MoodGn9zkb4qzxyNjQ6') )

module.exports = {
    hashPassword,
    comparePassword
}