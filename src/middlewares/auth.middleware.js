//Middleware para proteger rutas

const { default: axios } = require('axios')

//1- Revisar si existe un token
//2- Verificar si el token pertenece a un usuario valido 
//3- Verificar el req y agregar req.user con la informacion desencriptada del token

//estrategia: diferentes maneras de hacer un login(Con facebook, google,JWT,GIThub...)
const {jwtSecret} = require('../config')
const { getuserById } = require('../users/users.controllers')
const JwtStategy = require('passport-jwt').Strategy 
//passsport maneja estrategias para las diferentes autenticaciones 
const ExtractJwt = require('passport-jwt').ExtractJwt 
// Extrae los headers de la peticion


//Exportando fuincion anonima
module.exports = (passport) => {
const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret
}

passport.use(
    new JwtStategy(options, async (decoded,done)=>{
        //done(error, decoded)
        try{
          const response = await getuserById(decoded.id)
          if(!response){
            return done(null, false)
          }
          console.log("decoded jwt", decoded)
          return done(null, decoded)
        }catch(error){
            return done(error, false)
        }
    })
)
}






