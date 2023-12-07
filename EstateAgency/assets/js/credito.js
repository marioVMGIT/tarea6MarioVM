
function calcularCotizacion (){

    // Obtener los valores de los campos
    var ms = parseFloat(document.getElementById('montoSolicitar').value);
    var tmAnual = parseFloat(document.getElementById('tasaInteres').value);
    var pAnios = parseFloat(document.getElementById('plazo').value);
    var salarioNeto = parseFloat(document.getElementById('salario').value);
    var fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    var valorVivienda = parseFloat(document.getElementById('valorVivienda').value);

    // Convertir la tasa de interés anual a mensual
    var tmMensual = tmAnual / 1200;

    // Convertir el plazo a meses
    var pMeses = pAnios * 12;

    // Calcular el monto de pago mensual usando la fórmula proporcionada
    var pm = ms * (tmMensual / (1 - Math.pow(1 + tmMensual, -pMeses)));

    // Calcular el monto de salario mínimo requerido
    var salarioMinimo = pm / 0.40;

    // Verificar si el salario es suficiente o insuficiente
    var etiquetaSalario = document.getElementById('etiquetaSalario');
    if (salarioNeto >= salarioMinimo) {
        etiquetaSalario.innerHTML = "Monto de salario suficiente para el crédito";
    } else {
        etiquetaSalario.innerHTML = "Monto de salario insuficiente";
    }

    // Verificar la edad del cliente
    var edad = calcularEdad(fechaNacimiento);
    var etiquetaEdad = document.getElementById('etiquetaEdad');
    
    if (edad > 22 && edad < 55) {
        etiquetaEdad.innerHTML = "Cliente con edad suficiente para crédito";
    } else {
        etiquetaEdad.innerHTML = "Cliente no califica para crédito por edad";
    }
    

    // Calcular el porcentaje a financiar
        var porcentajeFinanciar = (ms / valorVivienda ) * 100;

        // Actualizar los campos con los resultados
        document.getElementById('pagoMensual').value = pm.toFixed(2);
        document.getElementById('salarioMinimo').value = salarioMinimo.toFixed(2);

        // Mostrar el porcentaje a financiar en la etiqueta
        var porcentajeFinanciarLabel = document.getElementById('porcentajeFinanciarLabel');
        porcentajeFinanciarLabel.textContent = porcentajeFinanciar.toFixed(0) + '%';
  }

  function calcularEdad(fechaNacimiento) {
    var hoy = new Date();
    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    var mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
}

var barraPlazo = document.getElementById('plazo');
var spanValorPlazo = document.getElementById('valorPlazo');

// Agregar un evento de cambio a la barra de plazo
barraPlazo.addEventListener('input', function() {
    // Actualizar el contenido del span con el valor seleccionado
    spanValorPlazo.textContent = barraPlazo.value;
});

function interes(tasaMensual, mes, pagoMensual, montoSolicitado) {
    var vInteres = 0;
    var amortiza = montoSolicitado;

    for (var i = 1; i <= mes; i++) {
       vInteres = (amortiza * (tasaMensual / 100));
       amortiza = amortiza - (pagoMensual - vInteres);
    }

    return vInteres;
}



function mostrarProyeccion() {
    // Parámetros de ejemplo (ajusta según tus necesidades)
    var tasaMensual = calcularTasaMensual(parseFloat(document.getElementById('tasaInteres').value)); // Tasa de interés mensual
    var plazo = 8; // Plazo en meses
    var pagoMensual = parseFloat(document.getElementById('pagoMensual').value); // Pago mensual
    var montoSolicitado = parseFloat(document.getElementById('montoSolicitar').value); // Monto solicitado

    // Crear la tabla HTML
    var tablaHTML = '<table border="1"><tr><th>Mes</th><th>Pago Mensual</th><th>Intereses</th><th>Amortización</th><th>Saldo</th></tr>';

    var saldoActual = montoSolicitado;

    for (var mes = 1; mes <= plazo; mes++) {
    var interesCalculado = interes(tasaMensual, mes, pagoMensual, montoSolicitado);
    var amortizacion = pagoMensual - interesCalculado;
    saldoActual -= amortizacion;

        // Formatear los valores con el estilo deseado
        var pagoMensualFormateado = pagoMensual.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        var interesCalculadoFormateado = interesCalculado.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        var amortizacionFormateada = amortizacion.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        var saldoFormateado = saldoActual.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Agregar fila a la tabla
        tablaHTML += '<tr><td>' + mes + '</td><td>' + pagoMensualFormateado + '</td><td>' + interesCalculadoFormateado + '</td><td>' + amortizacionFormateada + '</td><td>' + saldoFormateado + '</td></tr>';
    }

    tablaHTML += '</table>';

    // Mostrar la tabla en el elemento con id "tablaProyeccion"
    document.getElementById('tablaProyeccion').innerHTML = tablaHTML;
}



function calcularTasaMensual(tasaAnual) {
    return (tasaAnual / (12 * 100)) * 100;
}


