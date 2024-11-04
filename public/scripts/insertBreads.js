
//Guardar el formulario y asignarle un evento submit sin recargar
const formulario = document.getElementById('form_pan').addEventListener('submit', function(event) {
    
    //event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

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

//Crear la tabla cuando inicia el Admin.html y cargas los datos de la DB
const showPanes = () => {
    let panes = {};

    fetch('products/GET/Admin')
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
            const columnaPrecio = document.createElement('th');
            const columnaCantidad = document.createElement('th');
            const columnaImagen = document.createElement('th');
            const columnaAccion = document.createElement('th');

            const imagen = document.createElement('img');
            const boton00 = document.createElement('button');
            const boton01 = document.createElement('button');

            //Agregamos una funcion para cuando clickees el boton editar
            boton00.onclick = () => {
                //Guardar el Id del elemento 
                const id_pan_now = element.id_pan;
                //Obtener el modal del admin.html
                const modal = document.querySelector('#modal');
                
                //Agregar un evento de cancelar
                const boton_cancelar = document.getElementById('cancelar_dialog');
                boton_cancelar.addEventListener('click', () => {
                    modal.close();
                });

                //Agregamos una funcion para cuando se envie el formulario del modal
                const formulario = document.getElementById('form_pan_update').addEventListener('submit',() =>{

                    const pan_update = {
                        id_pan : id_pan_now,
                        nombre_pan : document.getElementById('nombre_pan_update').value,
                        descripcion_pan : document.getElementById('descripcion_pan_update').value,
                        precio_pan : parseInt(document.getElementById('precio_pan_update').value),
                        cantidad_stock : parseInt(document.getElementById('cantidad_pan_update').value),
                        img_pan : document.getElementById('imagen_pan_update').value
                    }

                    fetch(
                        'products/PUT',
                        {
                            method : 'PUT',
                            headers : {'Content-Type': 'application/json'},
                            body : JSON.stringify(pan_update)
                        }
                    )
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Error en la petición');
                    })
                    .then(data => {
                        console.log('Pan Actualizado ');
                    })
                    .catch(error => console.error('Error:', error));

                });

                //Mostrar el Modal
                modal.show();

                //Mostrar el ID del pan
                console.log(id_pan_now);
            };

            boton01.addEventListener('click', () => {

                const id_pan_now = element.id_pan;

                const pan_delete = {id_pan : id_pan_now};

                const modal = document.getElementById('modal1');
                const boton_cancelar = document.getElementById('cancelar_dialog1');

                boton_cancelar.addEventListener('click', () => {
                    modal.close();
                });

                fetch(
                    'products/DELETE',
                    {
                        method : 'DELETE',
                        headers : {'Content-Type': 'application/json'},
                        body : JSON.stringify(pan_delete)
                    }
                )
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Error en la petición');
                })
                .then(data => {
                    console.log('Pan Actualizado ');
                })
                .catch(error => console.error('Error:', error));

                modal.show();

            });

            //Agregar atributos a los componentes creados
            columnaNombre.textContent = element.nombre_pan;
            columnaDescripcion.textContent = element.descripcion_pan;
            columnaPrecio.textContent = element.precio_pan;
            columnaCantidad.textContent = element.cantidad_stock;
            imagen.src = element.img_pan;

            boton00.textContent = 'Editar';
            boton01.textContent = 'Eliminar';

            //Anidar elementos como hijos de otros
            columnaImagen.appendChild(imagen);
            columnaAccion.appendChild(boton00);
            columnaAccion.appendChild(boton01);

            fila.appendChild(columnaNombre);
            fila.appendChild(columnaDescripcion);
            fila.appendChild(columnaPrecio);
            fila.appendChild(columnaCantidad);
            fila.appendChild(columnaImagen);
            fila.appendChild(columnaAccion);
            
            tbody.append(fila);
        });
    }
};

showPanes();

