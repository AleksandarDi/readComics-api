package project.web.readComics.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Blob;
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
    @JsonIgnore
    @Column(name="comic_pdf")
    private Blob pdf;
    @JsonIgnore
    @Column(name="comic_img")
    private Blob img;

    @ManyToMany(mappedBy="favourites")
    private Collection<User> users;

    public Comic(String name, String category, Blob pdf, Blob img) {
        this.name = name;
        this.category = category;
        this.pdf = pdf;
        this.img = img;
    }
    public Comic(){

    }

    public Blob getPdf() {
        return pdf;
    }

    public void setPdf(Blob pdf) {
        this.pdf = pdf;
    }

    public Blob getImg() {
        return img;
    }

    public void setImg(Blob img) {
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
