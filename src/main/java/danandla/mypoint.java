package danandla;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "HitTable")
public class mypoint implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "X")
    private float x;

    @Column(name = "Y")
    private float y;

    @Column(name = "R")
    private float r;

    @Column(name = "HitResult")
    private String hit;

    @Column(name = "ExecutionTime", precision = 10, scale = 4)
    private BigDecimal extime;

    @Column(name = "SystemTime")
    private String stime;

    public mypoint(){}

    public mypoint(pointBean beanpoint){
        this.x = beanpoint.getX();
        this.y = beanpoint.getY();
        this.r = beanpoint.getR();
        if(beanpoint.isHit()) this.hit = "hit";
        else this.hit = "nohit";
        this.extime = new BigDecimal(Float.toString(beanpoint.getExtime()));
        System.out.println(this.extime);
        this.stime =  beanpoint.getStimeStr();
    }

    public int getId() {
        return id;
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

    public String getHit() {
        return hit;
    }

    public BigDecimal getExtime() {
        return extime;
    }

    public String getStime() {
        return stime;
    }

    @Override
    public String toString() {
        return "mypoint{" +
                "id=" + id +
                ", x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", hit='" + hit + '\'' +
                ", extime=" + extime +
                ", stime='" + stime + '\'' +
                '}';
    }
}
