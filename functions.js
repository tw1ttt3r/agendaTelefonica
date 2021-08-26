function pregunta(msg, number = false) {
    return number ? Number(prompt(msg)) : prompt(msg);
}

function infoContacto(contacto) {
    return `Nombre: ${contacto.nombre === '' ? '-' : contacto.nombre}
    Apodo: ${contacto.apodo === '' ? '-' : contacto.apodo}
    Telefono: ${contacto.telefono === '' ? '-' : contacto.telefono}
    Correo: ${contacto.correo === '' ? '-' : contacto.correo}`;
}

function infoListContactos(contactos) {
    let i = 0;
    for(contacto of contactos) {
        i++;
        console.log(`Información del contacto ${i}
        ${infoContacto(contacto)}
        
        `);
    }
}

function busqueda() {
    const p_pregunta = pregunta('Buscar por: 1)Nombre 2)Apodo', true);
    const campo = p_pregunta === 1 ? 'nombre' : 'apodo';
    const data = pregunta(`Proporciona el ${campo}:`);
    return [data, campo];
}

function catalogo(option) {
    let respuesta = [];
    switch(option) {
        case 1:
            const contacto = {};
            contacto.nombre = pregunta('Nombre: ');
            contacto.telefono = pregunta('Telefono: ');
            contacto.correo = pregunta('Correo: ');
            contacto.direccion = pregunta('Direccion: ');
            contacto.apodo = pregunta('Apodo: ');
            agenda.push(contacto);
            respuesta = ['Contacto guardado correctamente', true];
            break;
        case 2:
            let info = [];
            const p_data = busqueda();
            for(let contacto of agenda) {
                if (contacto[p_data[1]] === p_data[0]) {
                    info.push(contacto);
                }
            }
            if (info.length > 0) {
                infoListContactos(info);
            }
            respuesta = [`Contactos encontrados: ${info.length}`, true];
            break;
        case 3:
            const p_data2 = busqueda();
            let pos = -1, i = 0;
            for(let contacto of agenda) {
                if (contacto[p_data2[1]] === p_data2[0]) {
                    pos = i;
                }
                i++;
            }
            if (pos > -1) {
                for (let campo of Object.keys(agenda[pos])){
                    let newData = pregunta(`${campo}: `);
                    if (newData !== '') {
                        agenda[pos][campo] = newData
                    }
                }
                respuesta = [
                    `Contacto actualizado correctamente: ${infoContacto(agenda[pos])}`,
                    true
                ];
            } else {
                respuesta = ['No se encontraron contactos', true];
            }
            break;
        case 4:
            const p_data3 = busqueda();
            let pos2 = -1, i2 = 0;
            for(let contacto of agenda) {
                if (contacto[p_data3[1]] === p_data3[0]) {
                    pos2 = i2;
                }
                i2++;
            }
            if (pos2 > -1) {
                agenda.splice(pos2, 1);
                respuesta = ['Contacto eliminado correctamente', true];
            } else {
                respuesta = ['No se encontraron contactos', true];
            }
            break;
        case 5:
            infoListContactos(agenda);
            respuesta = [`Contactos totales: ${agenda.length}`, true];
            break;
        case 6:
            respuesta = ['Muchas gracias por usar nuestra agenda', false];
            break;
        default:
            respuesta = ['Esta opción no la reconocemos', false];
    }
    return respuesta;
}

function main() {
    let action = true;
    while(action) {
        const option = pregunta(menu, true);
        const respuesta = catalogo(option);
        action = respuesta[1];
        alert(respuesta[0])
    }
}