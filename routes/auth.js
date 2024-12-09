const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/login', (req, res) => {
    const { correo, password } = req.body;

    // Verificar si es usuario
    const userQuery = 'SELECT * FROM cliente WHERE correo_electronico_cliente = ? AND password_cliente = ?';
    db.execute(userQuery, [correo, password], (err, results) => {
        if (err) return res.status(500).send('Error en la consulta');

        if (results.length > 0) {
            req.session.usuario = correo;
            return res.redirect('/desesperanza.html'); // Redirige a la página de inicio
        }

        // Verificar si es administrador
        const adminQuery = 'SELECT * FROM administrador WHERE correo_electronico_administrador = ? AND password_administrador = ?';
        db.execute(adminQuery, [correo, password], (err, results) => {
            if (err) return res.status(500).send('Error en la consulta');

            if (results.length > 0) {
                req.session.admin = correo;
                return res.redirect('/admin.html'); // Redirige a la página del administrador
            } else {
                return res.status(401).send('Credenciales incorrectas');
            }
        });
    });
});

//Registar un nuevo usuario
router.post('/signup', (req, res) => {
    const {nombre, correo, password} = req.body;

    // Ahora, insertar el cliente en la tabla cliente
    const insertClientQuery = 'INSERT INTO cliente (nombre_cliente, correo_electronico_cliente, password_cliente) VALUES (?, ?, ?)';
    db.execute(insertClientQuery, [nombre, correo, password], (err, results) => {
        if(err) return res.status(500).send('Error en la consulta');
        
        return res.status(201).json({mensaje : 'Usuario Registrado con exito'});
    });
});



module.exports = router;