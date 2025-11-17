function calcular(){
    const numero1 = parseFloat(document.getElementById("num1").value)
    const numero2 = parseFloat(document.getElementById("num2").value)
    const resultado = numero1*numero2
    document.getElementById("resultado").innerText = `${resultado}`

    if(isNaN(numero1) || isNaN(numero2)){ 
        swal.fire({
            title:"Error",
            icon:"error",
            text:"Por favor ingrese un numero valido"
        })
    }else{
        swal.fire({
            title:"Respuesta",
            icon:"success",
            html:`<p>El resultado es<br><b>${resultado}</b></p>`
        })
    }
}

salarios = () => {

    const nombre = document.getElementById("nombre").value;
    const salario = parseFloat(document.getElementById("salario").value);
    const diaslab = parseFloat(document.getElementById("diaslab").value);
    let auxtransporte = document.getElementById("aux").value;
    let horasEx = parseFloat(document.getElementById("horasE").value);
    let comisiones = parseFloat(document.getElementById("comision").value);
    let arl = document.getElementById("arl").value;

    if (!nombre || isNaN(salario) || isNaN(diaslab)) {
        Swal.fire({
            icon:"error",
            title:"Datos incompletos",
            text:"Por favor ingrese nombre, salario y días trabajados."
        });
        return;
    }

    if (isNaN(horasEx)) horasEx = 0;
    if (isNaN(comisiones)) comisiones = 0;

    auxtransporte = auxtransporte === "1" ? 97032 : 0;

    const salarioReal = (salario / 30) * diaslab;
    const valorHoraNormal = (salario / 30) / 8;
    const valorHoraExtra = valorHoraNormal * 1.35;
    const totalHorasExtra = valorHoraExtra * horasEx;

    const totalDevengado = salarioReal + auxtransporte + comisiones + totalHorasExtra;

    const baseAportes = salarioReal + comisiones + totalHorasExtra;
    const salud = baseAportes * 0.04;
    const pension = baseAportes * 0.04;

    const deducciones = salud + pension;
    const netoPagar = totalDevengado - deducciones;

    const ApSalud = baseAportes * 0.085;
    const ApPension = baseAportes * 0.12;
    const totalSeguridadSocial = ApSalud + ApPension;

    const cesantias = totalDevengado * 0.0833;
    const intereses = cesantias * 0.12;
    const prima = totalDevengado * 0.0833;
    const vacaciones = salario * 0.0417;

    const caja = baseAportes * 0.04;
    const icbf = baseAportes * 0.03;
    const sena = baseAportes * 0.02;
    const parafiscales = caja + icbf + sena;

    const nivelArl = {
        "1": 0.00522,
        "2": 0.01044,
        "3": 0.02436,
        "4": 0.04350,
        "5": 0.06960
    };

    const arlTotal = baseAportes * nivelArl[arl];
    const totalApropiado = cesantias + intereses + prima + vacaciones + parafiscales + arlTotal;

    const granTotal = totalDevengado + totalSeguridadSocial + totalApropiado;

    Swal.fire({
        icon:"success",
        title:`Señor(a)<br>${nombre}`,
        width:"40em",
        heightAuto:false,
        customClass:{ popup:'popup-scroll' },
        html:`
        <div style="text-align:left; font-size:15px; color:black;">

            <p><strong>Salario Real:</strong> ${salarioReal}</p>
            <p><strong>Auxilio de Transporte:</strong> ${auxtransporte}</p>
            <p><strong>Comisiones:</strong> ${comisiones}</p>
            <p><strong>Horas Extra:</strong> ${totalHorasExtra}</p>

            <p><strong>Total Devengado:</strong> ${totalDevengado}</p>
            <hr>

            <p><strong>Salud (4%):</strong> ${salud}</p>
            <p><strong>Pensión (4%):</strong> ${pension}</p>
            <p><strong>Total Deducciones:</strong> ${deducciones}</p>

            <p><strong>Neto a Pagar:</strong> ${netoPagar}</p>
            <hr>

            <p><strong>Aporte Salud Empresa:</strong> ${ApSalud}</p>
            <p><strong>Aporte Pensión Empresa:</strong> ${ApPension}</p>
            <p><strong>Total Seguridad Social:</strong> ${totalSeguridadSocial}</p>
            <hr>

            <p><strong>Cesantías:</strong> ${cesantias}</p>
            <p><strong>Intereses Cesantías:</strong> ${intereses}</p>
            <p><strong>Prima:</strong> ${prima}</p>
            <p><strong>Vacaciones:</strong> ${vacaciones}</p>

            <p><strong>Caja de Compensación:</strong> ${caja}</p>
            <p><strong>ICBF:</strong> ${icbf}</p>
            <p><strong>SENA:</strong> ${sena}</p>
            <p><strong>ARL:</strong> ${arlTotal}</p>

            <p><strong>Total Apropiado:</strong> ${totalApropiado}</p>
            <hr>

            <p style="font-size:25px; text-align:center; font-weight:bold;">
                GRAN TOTAL<br>${granTotal}
            </p>

        </div>
        `
    });
};