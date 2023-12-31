const url = "http://localhost:8080/TestAPI/webservice/ServicePersona/";

const tablaPersona = document.getElementById("tabla-persona");
const formularioPersona = document.getElementById("formulario-persona");
const botonFormulario = document.getElementById("boton-abrir-formulario");
const botonCrearPersona = document.getElementById("boton-crear-persona");
const tablaPersonas = document.getElementById("tabla-persona");

const campoIdPersona = document.getElementById("idPersona");
const campoNombre = document.getElementById("nombre");
const campoApellido = document.getElementById("apellido");
const campoEmail = document.getElementById("email");
const campoTelefono = document.getElementById("telefono");

//initialization methods

// Utilizando Fetch
this.fetch(url)
  .then((response) => {
    // Verificar si la respuesta es exitosa (código de estado 200-299)
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    // Parsear la respuesta como JSON
    return response.json();
  })
  .then((data) => {
    // Hacer algo con los datos JSON

    let isVacio = data.length != 0;
    if (isVacio) {
      for (const persona of data) {
        tablaPersonas.appendChild(crearCelda(persona));
      }
    } else {
      tablaPersonas.appendChild(crearCelda());
    }
  })
  .catch((error) => {
    console.error("Error en la solicitud:", error);
    const listItemTR = document.createElement("TR");

    listItemTR.innerHTML = `
    <td colspan="5" style="text-align: center;">No exísten personas</td>
    `;

    tablaPersonas.appendChild(listItemTR);
  });

const crearCelda = (persona) => {
  const listItemTR = document.createElement("TR");

  listItemTR.innerHTML = `
    <td>${persona.nombre}</td>
    <td>${persona.apellido}</td>
    <td>${persona.email}</td>
    <td>${persona.telefono}</td>
    <td><button type="button" onclick="eliminarPersona(${persona.idPersona})">Eliminar</button>
    <button type="button" onclick="modificarFormulario(${persona.idPersona})">Modificar</button></td>
    `;

  return listItemTR;
};

const cambioCrear = (isMoficar) => {
  if (isMoficar) {
    botonCrearPersona.textContent = "Actualizar";
  } else {
    botonCrearPersona.textContent = "Crear";
  }
  tablaPersona.classList.toggle("desaparecer");
  formularioPersona.classList.toggle("desaparecer");
  if (botonFormulario.textContent === "Crear Persona") {
    botonFormulario.textContent = "Listar Personas";
    if (!isMoficar) {
      campoIdPersona.value = "";
      campoNombre.value = "";
      campoApellido.value = "";
      campoEmail.value = "";
      campoTelefono.value = "";
    }
  } else {
    botonFormulario.textContent = "Crear Persona";
  }
};

//Buttons Methods

botonFormulario.addEventListener("click", () => {
  cambioCrear(false);
});

botonCrearPersona.addEventListener("click", () => {
  let validacion = true;
  let idCrear = true;
  let url = "http://localhost:8080/TestAPI/webservice/ServicePersona/";
  let typeMethod = "POST";

  const persona = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
  };

  for (const valor in persona) {
    if (persona[valor].trim() === "") {
      validacion = false;
    }
  }

  persona.idPersona = campoIdPersona.value;
  if (campoIdPersona.value !== "") {
    url = `http://localhost:8080/TestAPI/webservice/ServicePersona/${persona.idPersona}`;
    typeMethod = "PUT";
  } else {
    persona.idPersona = 0;
  }

  if (validacion) {
    postData(url, persona, typeMethod).then((data) => {});
  } else {
    alert("Los campos no pueden estar vacíos.");
  }
});

//Creación de persona

async function postData(url = "", data = {}, typeMethod) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: typeMethod, // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

//Eliminar persona
function eliminarPersona(id) {
  fetch(`http://localhost:8080/TestAPI/webservice/ServicePersona/${id}`, {
    method: "DELETE",
    // mode: "cors",
    // cache: "no-cache",
    // credentials: "same-origin",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // redirect: "follow",
    // referrerPolicy: "no-referrer",
    // body: JSON.stringify(data),
  });
  alert("Persona eliminada.");
  location.reload();
}

async function obtenerPersona(id) {
  const response = await fetch(
    `http://localhost:8080/TestAPI/webservice/ServicePersona/${id}`
  );
  // Verificar si la respuesta es exitosa (código de estado 200-299)
  if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.status}`);
  }
  return await response.json();
}

const modificarFormulario = (idPersona) => {
  cambioCrear(true);

  obtenerPersona(idPersona).then((persona) => {
    campoIdPersona.value = persona.idPersona;
    campoNombre.value = persona.nombre;
    campoApellido.value = persona.apellido;
    campoEmail.value = persona.email;
    campoTelefono.value = persona.telefono;
  });
};
