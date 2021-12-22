package danandla;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.List;

public class postgreutil {
    private EntityManagerFactory emf;
    private EntityManager em;
    private EntityTransaction tr;

    public postgreutil(){ }

    public void initconnect(){
        emf = Persistence.createEntityManagerFactory("hittableunit");
        em = emf.createEntityManager();
        tr = em.getTransaction();
    }

    public void addPointDB(pointBean pointToAdd){
        mypoint newpoint = new mypoint(pointToAdd);
        initconnect();
        tr.begin();
        //List<mypoint> array = (List<mypoint>) em.createQuery("SELECT c FROM mypoint c", mypoint.class).getResultList();
        //array.add(newpoint);
        em.persist(newpoint);
        tr.commit();
        em.close();
    }

    public List<mypoint> getTable(){
        initconnect();
        List<mypoint> hitTable = (List<mypoint>) em.createQuery("select c from mypoint c", mypoint.class).getResultList();
        em.close();
        return hitTable;
    }

    public void clearTableDB(){
        initconnect();
        tr.begin();
        em.createQuery("delete from mypoint c", mypoint.class).executeUpdate();
        tr.commit();
        em.close();
    }
}
