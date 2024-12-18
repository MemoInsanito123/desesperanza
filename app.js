//express nos permite generar un servidor local en un puerto especifico que nos ayuda a leer peticiones HTTP
const express = require('express');

//body-parser es un middleware para express que se utiliza para analizar el cuerpo de las solicitudes HTTP entrantes
//convierte datos en req.body en formato JSON o URL codificada.
const bodyParser = require('body-parser');
//se utiliza en Node.js para importar un módulo
const authRoutes = require('./routes/auth.js');
const authProducts = require('./routes/methodProducts.js');
//importamos el modulo db para la conexion a la base de datos
const db = require('./db/db.js');
//Generamos una instancia para express
const app = express();
//Declaramos una variable para el puerto del servidor local
const PORT = 3000;

const path = require('path');

// Middleware
//Analiza datos URL-encoded (del tipo form-data) y convierte JSON en objetos accesibles en req.body.
app.use(bodyParser.urlencoded({ extended: true }));
//Para que la informacion se transforme en objetos 
app.use(bodyParser.json());

//Definimos una ruta absoluta para el local host
app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
})

// Define que todas las rutas de authRoutes estarán disponibles bajo el prefijo /auth
app.use('/auth', authRoutes);
app.use('/products', authProducts);

// Servir archivos estáticos (public), es decir desde cualquier ruta dentro del directorio(carpeta) frontend es posible acceder a los archivos. Por ejemplo localhost:3000/index.html
// indica que el servidor sirve archivos estáticos desde la carpeta public, lo que permite acceder a ellos directamente desde el navegador.
app.use(express.static('public/html'));
app.use(express.static('public'));



//Correr el servidor de forma local en el puerto indicado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});