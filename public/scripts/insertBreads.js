
//Guardar el formulario y asignarle un evento submit sin recargar
const formulario = document.getElementById('form_pan').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const pan = {
        nombre_pan : document.getElementById('nombre_pan').value,
        descripcion_pan : document.getElementById('descripcion_pan').value,
        precio_pan : parseInt(document.getElementById('precio_pan').value),
        cantidad_stock : parseInt(document.getElementById('cantidad_pan').value),
        img_pan : document.getElementById('imagen_pan').value
    };

    fetch('/products/POST', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pan)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error en la petición');
    })
    .then(data => {
        console.log('Pan Registrado');
    })
    .catch(error => console.error('Error:', error));

    }

);


const showPanes = () => {

    let panes = {};

    fetch('products/GET')
    .then(response => response.json())
    .then(data => {
        panes = data;
        callPanes(panes);
    })
    .catch(err => console.error('Error:' + err));
    
    const callPanes = (array1) => {

        const tbody = document.querySelector('#table_pan');

        array1.forEach(element => {
            
            //Crear elementos de la tabla
            
            const fila = document.createElement('tr');
            
            const columnaNombre = document.createElement('th');
            const columnaDescripcion = document.createElement('th');

            

        });

    }

};

