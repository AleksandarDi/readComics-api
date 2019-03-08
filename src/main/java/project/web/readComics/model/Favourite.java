package project.web.readComics.model;

import javax.persistence.*;

@Entity
@Table(name="favourites")
public class Favourite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="user_id")
    public int u_id;
    @Column(name="comic_id")
    public int c_id;

    public Favourite(int u_id, int c_id) {
        this.u_id = u_id;
        this.c_id = c_id;
    }
    public Favourite(){

    }
}
