const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Ruta para obtener todos los productos
router.get('/GET', (req, res) => {
    const query = 'SELECT pan.nombre_pan, pan.descripcion_pan, precio_pan.precio_pan, stock_pan.cantidad_stock, pan.img_pan FROM pan JOIN precio_pan ON precio_pan.id_pan = pan.id_pan JOIN stock_pan ON stock_pan.id_pan = pan.id_pan';

    db.execute(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error en la consulta');
        }

        res.json(results); // Devuelve los resultados como JSON
    });
});


router.post('/POST', (req, res) => {
    db.beginTransaction((err) => {
        
        if (err) return res.status(500).send('Error al iniciar transacción');

        const {nombre_pan, descripcion_pan, img_pan} = req.body;
        const query0 = 'INSERT INTO pan(nombre_pan, descripcion_pan, img_pan) VALUES (?,?,?)';
    
        db.execute(query0, [nombre_pan, descripcion_pan, img_pan], (err, results) => {
            if(err){
                return db.rollback(() => res.status(500).send('Error al insertar pan'));
            }
    
            const id_pan = results.insertId;
            const query1 = 'INSERT INTO precio_pan(id_pan, precio_pan) VALUES (?,?)';
            const {precio_pan} = req.body;
    
            db.execute(query1, [id_pan, precio_pan], (err) => {
    
                if(err){
                    return db.rollback(() => res.status(500).send('Error al insertar precio de pan'));
                }
                const {cantidad_stock} = req.body;
                const query2 = 'INSERT INTO stock_pan(id_pan, cantidad_stock) VALUES(?, ?)';
                
    
                db.execute(query2, [id_pan, cantidad_stock], (err) => {
    
                    if(err){
                        return db.rollback(() => res.status(500).send('Error al insertar cantidad de pan'));
                    }
                    
                    db.commit((err) => {

                        if (err) return db.rollback(() => res.status(500).send('Error al confirmar transacción'));
                        res.status(201).send({ mensaje: 'Pan, precio y cantidad agregados exitosamente'});
                    })
                });
            });
        });
    })
});


router.get('/GET/Admin', (req, res) => {
    const query = 'SELECT pan.id_pan pan.nombre_pan, pan.descripcion_pan, precio_pan.precio_pan, stock_pan.cantidad_stock, pan.img_pan FROM pan JOIN precio_pan ON precio_pan.id_pan = pan.id_pan JOIN stock_pan ON stock_pan.id_pan = pan.id_pan';

    db.execute(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error en la consulta');
        }

        res.json(results); // Devuelve los resultados como JSON
    });
});

module.exports = router;
