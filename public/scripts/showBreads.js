let panes = [];

fetch('/products/GET')
.then(response => response.json())
.then(data => {
    panes = data;
    productos(panes);
    //console.log(panes); // Aquí puedes procesar los datos y mostrarlos en la página
})
.catch(error => console.error('Error:', error));


const tbody = document.querySelector('#productosTable tbody');

function productos(array){

    array.forEach(element => {
        console.log(element);

        const fila = document.createElement('tr');

        const columnaNombre = document.createElement('th');
        const columnaDescripcion = document.createElement('th');
        const columnaPrecio = document.createElement('th');
        const columnaStock = document.createElement('th');
        const columnaImg = document.createElement('th'); 
    
        const img = document.createElement('img');

        columnaNombre.textContent = element.nombre_pan;
        columnaDescripcion.textContent = element.descripcion_pan;
        columnaPrecio.textContent = element.precio_pan;
        columnaStock.textContent = element.cantidad_stock;
        
        img.alt = 'Imagen no encontrada'
        img.src = element.img_pan;
        columnaImg.appendChild(img);
    
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaDescripcion);
        fila.appendChild(columnaPrecio);
        fila.appendChild(columnaStock);
        fila.appendChild(columnaImg);
    
        tbody.appendChild(fila);
    });
}