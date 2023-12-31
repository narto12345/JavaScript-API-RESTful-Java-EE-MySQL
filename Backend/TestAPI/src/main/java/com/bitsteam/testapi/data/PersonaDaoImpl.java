package com.bitsteam.testapi.data;

import com.bitsteam.testapi.model.Persona;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class PersonaDaoImpl implements IPersonaDao {

    @PersistenceContext(unitName = "TestPU")
    EntityManager em;

    @Override
    public List<Persona> obtenerPersonas() {
        List<Persona> personas = em.createQuery("SELECT p FROM Persona p").getResultList();
        for (Persona persona : personas) {
            em.refresh(persona);
        }
        return personas;
    }

    @Override
    public Persona obtenerPersona(int id) {
        Persona persona = em.find(Persona.class, id);
        em.refresh(persona);
        return persona;
    }

    @Override
    public boolean crearPersona(Persona persona) {
        boolean resultado = false;

        try {
            em.persist(persona);
            em.flush();
            resultado = true;
        } catch (Exception ex) {
            ex.printStackTrace(System.out);
        }

        return resultado;
    }

    @Override
    public boolean modificarPersona(Persona persona) {
        boolean resultado = false;

        try {
            em.merge(persona);
            resultado = true;
        } catch (Exception ex) {
            ex.printStackTrace(System.out);
        }

        return resultado;
    }

    @Override
    public boolean eliminarPersona(Persona persona) {
        boolean resultado = false;

        try {
            em.remove(em.merge(persona));
            resultado = true;
        } catch (Exception ex) {
            ex.printStackTrace(System.out);
        }

        return resultado;
    }

}
