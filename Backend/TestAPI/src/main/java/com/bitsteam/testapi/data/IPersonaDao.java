package com.bitsteam.testapi.data;

import com.bitsteam.testapi.model.Persona;
import java.util.List;

public interface IPersonaDao {

    public abstract List<Persona> obtenerPersonas();
    
    public abstract Persona obtenerPersona(int id);

    public abstract boolean crearPersona(Persona persona);

    public abstract boolean modificarPersona(Persona persona);

    public abstract boolean eliminarPersona(Persona persona);

}
