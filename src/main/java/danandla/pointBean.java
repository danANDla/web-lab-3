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
        boolean rect = false;
        boolean circle = false;
        boolean triangle = false;
        float epsilon = 0.000000001f;
        // in rect
            rect = ( (x>-0.5*r || Math.abs(0.5*r + x) <= epsilon) && (x < 0  || Math.abs(x - 0) <= epsilon)
                    && (y < 0 || Math.abs(y - 0) <= epsilon) && (y > -r || Math.abs(y + r) <= epsilon) );
        // in circle
            circle = ( (r*r*0.25 >= x*x+y*y || Math.abs(r*r*0.25 - x*x+y*y) <= epsilon)
                    && (x < 0 || Math.abs(x) <= epsilon) && (y > 0 || Math.abs(y) <= epsilon) );
        // in triangle
            triangle = ( (x > 0 || Math.abs(x-0)<=epsilon) && (x<r || Math.abs(x-r)<=epsilon)
                    && (y < 0 || Math.abs(y-0)<=epsilon) && (y>(x-r) || Math.abs(y-(x-r))<=epsilon) );
        return (rect || circle || triangle);
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
