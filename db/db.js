//importamos el modulo de Mysql para realizar la conexion a la DB
const mysql = require('mysql2');

//nombre de la DB
const dbname = 'dbdesesperanza';

//Generamos la conexion a la DB con los datos requeridos
const db = mysql.createConnection({
    host :'localhost',
    user : 'root',
    password : 'n0m3l0',
    database : dbname
});

//Establecemos la conexion mediante un callback
db.connect((err) => {
    //El callback recibe un parametro que almacena los posibles errores que se presenten
    if(err){
        console.error('Error al intentar conectarse a la DB: ' + dbname + err.stack);
        return;
    }
    else{
        console.log('Conexion exitosa con la DB: ' + dbname);
    }

});

//Exportamos el modulo para usarlo posteriormente
module.exports = db;