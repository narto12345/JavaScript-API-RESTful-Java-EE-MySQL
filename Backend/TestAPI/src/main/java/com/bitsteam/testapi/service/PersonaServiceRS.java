package com.bitsteam.testapi.service;

import com.bitsteam.testapi.data.IPersonaDao;
import com.bitsteam.testapi.model.Persona;
import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;

@Stateless
@Path("/ServicePersona")
public class PersonaServiceRS {

    @Inject
    private IPersonaDao personaDao;

    @GET
    @Produces(value = MediaType.APPLICATION_JSON)
    public List<Persona> obtenerPersonas() {
        return personaDao.obtenerPersonas();
    }

    @GET
    @Produces(value = MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Persona obtenerPersona(@PathParam("id") int id) {
        return personaDao.obtenerPersona(id);
    }

    @POST
    @Consumes(value = MediaType.APPLICATION_JSON)
    @Produces(value = MediaType.APPLICATION_JSON)
    public Object crearPersona(Persona persona) {
        if (personaDao.crearPersona(persona)) {
            return persona;
        } else {
            return "Error en la creación de persona";
        }
    }

    @PUT
    @Consumes(value = MediaType.APPLICATION_JSON)
    @Produces(value = MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response modificarPersona(@PathParam("id") int id, Persona persona) {
        persona.setIdPersona(id);
        if (personaDao.obtenerPersona(id) != null) {
            personaDao.modificarPersona(persona);
            return Response.ok()
                    .entity(persona)
                    .build();
        } else {
            return Response.status(Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Consumes(value = MediaType.APPLICATION_JSON)
    @Produces(value = MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response eliminarPersona(@PathParam("id") int id) {
        Persona persona = personaDao.obtenerPersona(id);

        if (persona != null) {
            personaDao.eliminarPersona(persona);
            return Response.ok().build();
        } else {
            return Response.status(Status.NOT_FOUND).build();
        }
    }

}
