const mysql = require('mysql2');
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'red_social'
});

connection.connect((err) =>{
  if(err){
    console.log("Error de conexión", err.stack);
  }else{
    console.log('Conexión correcta');
  }
});

module.exports = connection;