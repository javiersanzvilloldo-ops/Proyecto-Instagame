const connection = require("../config/db")

class GameController{

 
    //controlador del endpoint que abre el form desde el nav
    openAddNewGame = (req, res) =>{
      let sql = 'SELECT user_id, first_name, last_name FROM user WHERE is_deleted = 0'
      connection.query(sql, (err, result)=>{
        if(err){
          throw err;
        }else{
            res.render('addGameSelect', {user : result, message: ""})
        }
      })
      
    }
      // controlador que valida y recoge y guarda los datos en bbdd
    addNewGame = (req, res) => {
      const {user_id, name, review, puntuacion, platform, year_sale} = req.body;
        //validaciones
      if(!user_id||!name||!review||!puntuacion||!platform||!year_sale||!req.file){
           let sql = 'SELECT user_id, first_name, last_name FROM user WHERE is_deleted = 0'
      connection.query(sql, (err, result)=>{
           if(err){
              throw err;
           }else{
              res.render('addGameSelect', {user : result, message: "Completa todos los campos"})
           }
        }) //guardamos en BBDD
       } else{
            let sql = 'INSERT INTO game (user_id, name, review, puntuacion, platform, year_sale, picture) VALUES (?, ?, ?, ?, ?, ?, ?)'
            let values = [user_id, name, review, puntuacion, platform, year_sale, req.file.filename]
            connection.query(sql, values, (err, result) => {
              if(err){
                throw err;
              }else{
                  res.redirect(`/users/profile/${user_id}`)  
              }
            })
          
    }
}

  //abrimos formulario de edicion de juego
  openEditGame = (req, res) => {
    const {game_id} = req.params;

    let sql = 'SELECT * FROM game WHERE game_id = ?';
    let values = [game_id];

    connection.query(sql, values, (err, result)=>{
      if(err){
        throw err
      }else{
        res.render('formEditGame', {gameEdit: result[0], message: ""})
      }
    })
    
  }

  editGame = (req, res) => {
    const {name, review, puntuacion, platform, year_sale} = req.body;
    const {game_id, user_id} = req.params;

    if(!name||!review||!puntuacion||!platform||!year_sale){
      let datosTemp = {
        name : name,
        review : review,
        puntuacion : puntuacion,
        platform : platform,
        year_sale : year_sale,
        game_id : game_id,
        user_id : user_id
      }
      res.render('formEditGame', {gameEdit : datosTemp, message : "Faltan datos por completar"})
    }else{
      let sql = 'UPDATE game SET name=?, review=?, puntuacion=?, platform=?,year_sale=? WHERE game_id=?'
      let values = [name, review, puntuacion, platform, year_sale, game_id]
      connection.query(sql, values, (err, result)=>{
        if(err){
          throw err;
        }else{
          res.redirect(`/users/profile/${user_id}`)
        }
      })
    }
  }

      delTotal = (req, res) =>{
        const {game_id, user_id} = req.params;
        let sql = 'DELETE FROM game WHERE game_id = ?'
        connection.query(sql, [game_id], (err, result)=>{
            if(err){
                throw err;
            }else{
                res.redirect(`/users/profile/${user_id}`)
            }
        })
    }
}

module.exports = new GameController();