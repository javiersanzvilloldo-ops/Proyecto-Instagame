const connection = require('../config/db');
const bcrypt = require('bcrypt');

class UserController{

    //abrimos página del perfil de usuario
  openProfile = (req, res) =>{
    //sacamos el id del endpoint través del req.params
    const {id} = req.params;
    //hacemos la llamada a la BBDD
    let sql = `SELECT user.*, game.* FROM user 
              LEFT JOIN game ON user.user_id = game.user_id
              AND game.is_deleted = 0 WHERE user.is_deleted = 0 AND
              user.user_id = ?`     
    
      let values = [id];
       connection.query(sql, values, (err, result)=>{
      if(err){
        throw err;
      }else{
        //construimos el objeto para poder enviarselo a la vista
        let usuario = {
         user_id: result[0].user_id,
         first_name: result[0].first_name,
         last_name: result[0].last_name,
         email: result[0].email,
         description: result[0].description,
         picture_user: result[0].picture_user
        }
        // dentro de juegos hacemos un recorrido por el array de todo el resultado
        //para extraer por cada elemento el resultado de juegos
        let game = []
          //si tenemos obras la vamos llenando con el resultado
        result.forEach((elem)=>{
          if(elem.game_id != null){
            let newGame = {
              game_id: elem.game_id,
              name: elem.name,
              review : elem.review,
              puntuacion : elem.puntuacion,
              platform : elem.platform,
              year_sale : elem.year_sale,
              picture : elem.picture
            }
            //metemos en el array que hemos creado let game los datos del new game
            game.push(newGame);
          }
        })
       
        res.render('profileUser', {usuario, game})
      }
    })
    
  }

  //abrimos el formulario
   openFormUser = (req, res)=> {
  res.render('formUser',  {message: ""});
  }

  
  register = (req, res)=>{
    //sacamos los valores de base de datos
    const {first_name, last_name, email, password, description} = req.body;
    
    //validamos para que no vengan campos vacíos
    if(!first_name||!last_name||!email||!password||!description||!req.file){
      res.render('formUser', {message: "Debes completar todos los campos"})
      }else{
        //hasheamos contraseña
        bcrypt.hash(password, 10, (err, hash)=>{
          if (err){
            throw err
          }else{
             //guardamos con la contraseña encriptada en la base de datos
             let sql = `INSERT INTO user (first_name, last_name, email, password, description, picture_user)
             VALUES ("${first_name}", "${last_name}", "${email}", "${hash}", "${description}", "${req.file.filename}")`

             connection.query(sql, (err, result)=>{
              if(err){
                 //controlamos errores de email repetido 
                    if(err.errno == 1062){
                      res.render('formUser', {message: "El email ya existe"})
                    }else{
                      throw err
                    }   
              } else{
                     res.redirect('/')
              }
             
            })
          }
        })
    }
  }
}

module.exports = new UserController();