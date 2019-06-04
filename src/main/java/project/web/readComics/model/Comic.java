package project.web.readComics.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name ="comic")
public class Comic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="comic_id")
    private int id;

    @Column(name="comic_name")
    private String name;

    @Column(name="category")
    private String category;

    @Column(name="comic_pdf")
    private String pdf;

    @Column(name="comic_img")
    private String img;

    @ManyToMany(mappedBy="favourites")
    private Collection<User> users;

    public Comic(String name, String category, String pdf, String img) {
        this.name = name;
        this.category = category;
        this.pdf = pdf;
        this.img = img;
    }
    public Comic(){

    }

    public String getPdf() {
        return pdf;
    }

    public void setPdf(String pdf) {
        this.pdf = pdf;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
