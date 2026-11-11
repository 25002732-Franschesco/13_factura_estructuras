//----- GENERAR CONCEPTOS DESDE EL RECEPTOR --------------------------------------------------

document.getElementById('generar').addEventListener('click', function() {
    generarConceptos();
});

let totalConceptos = 0;

let calcularImporte = function(x){
    let cantidad = parseFloat(document.getElementById('cantidad' + x).value) || 0;
    let valorUnitario = parseFloat(document.getElementById('valorunitario' + x).value) || 0;
    
    document.getElementById('importe' + x).value = (cantidad * valorUnitario).toFixed(2);
    
    calcularRestantes();
}

let calcularRestantes = function(){
    let importes = document.getElementsByName('importe');
    let j = 0;
    let subtotal = 0;
    
    while(j < importes.length){
        subtotal += parseFloat(importes[j].value) || 0;
        j++;
    }

    document.getElementById('subTotal').innerHTML = subtotal.toFixed(2);

    let iva = subtotal * 0.16;

    document.getElementById('iva').innerHTML = iva.toFixed(2);

    let total = subtotal + iva;

    document.getElementById('total').innerHTML = total.toFixed(2);
}

let Conceptos = '';

let generarConceptos = function() {
    Conceptos = document.getElementById('conceptos').innerHTML;
    let num = document.getElementById('n-conceptos').value;
    totalConceptos = Number(num); 
    
    if(num > 0) {
        for(let i = 0; i < num; i++) {
            Conceptos += '<div id="Concepto' + i + '">';
            Conceptos += estructurarConcepto(i);
            Conceptos += '</div>';
        }
    }
    document.getElementById('titulo-conceptos').classList.add('quitar-titulo-conceptos');
    document.getElementById('conceptos').innerHTML = Conceptos;
    document.getElementById('agregar').classList.add('mostrar-agregar');
}

document.getElementById('agregar').addEventListener('click', function() {
    let i = totalConceptos;
    let nuevoBloque = '<div id="Concepto' + i + '">';
    nuevoBloque += estructurarConcepto(i);
    nuevoBloque += '</div>';
    
    Conceptos += nuevoBloque;
    document.getElementById('conceptos').innerHTML = Conceptos;
    totalConceptos++;
});

function eliminar(i) {
    let fila = document.getElementById('Concepto' + i);
    if(fila) {
        let imp = document.getElementById('importe' + i);
        if(imp) {
            imp.value = "0.00";
        }
        fila.remove();
        Conceptos = document.getElementById('conceptos').innerHTML;
        calcularRestantes();
    }       
}

function estructurarConcepto(num){
    return `
    <label class="borrar" onclick="eliminar(${num})" style="cursor: pointer;"> 
        <img src="iconos/borrar.png" alt="Borrar"> 
    </label>

    <label>Cantidad <input type="number" name="cantidad" id="cantidad${num}" value="0" oninput="calcularImporte(${num})" stop="0.01"> </label>

    <label>Descripcion <input type="text" id="descripcion${num}" placeholder="Descripcion"> </label>

    <label>Valor Unitario <input type="number" name="valorunitario" id="valorunitario${num}" placeholder="Valor" value="0.00" step="0.01" oninput="calcularImporte(${num})"> </label>
    
    <label>Importe <input type="text" name="importe" id="importe${num}" value="0.00" placeholder="Importe" readonly> </label>
    `;
}