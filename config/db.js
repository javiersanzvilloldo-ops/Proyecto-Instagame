const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'red_social'
});

connection.connect((err) =>{
  if(err){
    console.log("Error de conexión", err.stack);
  }else{
    console.log('Conexión correcta');
  }
});

module.exports = connection;
