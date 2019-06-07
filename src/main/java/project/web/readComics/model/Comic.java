package project.web.readComics.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Date;
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

    @Column(name="writer")
    private String writer;

    @Column(name="cover_artist")
    private String coverArtist;

    @Column(name="description")
    private String description;

    @Column(name="published")
    private Date published;


    @ManyToMany(mappedBy="favourites")
    private Collection<User> users;

    public Comic(String name, String category, String pdf, String img,String writer, String coverArtist, String description, Date published) {
        this.name = name;
        this.category = category;
        this.pdf = pdf;
        this.img = img;
        this.writer = writer;
        this.coverArtist = coverArtist;
        this.description = description;
        this.published = published;
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

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getCoverArtist() {
        return coverArtist;
    }

    public void setCoverArtist(String coverArtist) {
        this.coverArtist = coverArtist;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getPublished() {
        return published;
    }

    public void setPublished(Date published) {
        this.published = published;
    }
}
