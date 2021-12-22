package danandla;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@ManagedBean(name = "pointbean", eager = true)
@ApplicationScoped
public class pointBean implements Serializable {
    private float x;
    private float y;
    private float r;
    private boolean hit;
    private LocalDateTime stime;
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss dd-MM-yyyy");;
    private float extime;

    public pointBean(){

    }

    public pointBean(float x, float y, float r, boolean hit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
    }

    public void addPoint(){
        long entrytime = System.nanoTime();
        if(!validation()){
            return; //TODO add invalid values message
        }
        this.r = 1f;
        this.hit = areacheck();
        this.stime = LocalDateTime.now();
        this.extime = (System.nanoTime()-entrytime)/1000000f;
        postgreutil psqlutil = new postgreutil();
        psqlutil.addPointDB(this);
    }

    public void clearTable(){
        postgreutil psqlutil = new postgreutil();
        psqlutil.clearTableDB();
    }

    public List<mypoint> getHitTable(){
        postgreutil psqlutil = new postgreutil();
        return psqlutil.getTable();
    }

    public boolean validation(){
        return true;
    }

    public boolean areacheck(){
        return true;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public float getR() {
        return r;
    }

    public boolean isHit() {
        return hit;
    }

    public LocalDateTime getStime() {
        return stime;
    }

    public String getStimeStr(){
        return stime.format(formatter);
    }

    public float getExtime() {
        return extime;
    }

    public void setX(float x) {
        this.x = x;
    }

    public void setY(float y) {
        this.y = y;
    }

    public void setR(float r) {
        this.r = r;
    }
}
