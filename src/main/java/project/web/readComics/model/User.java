package project.web.readComics.model;


import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

@Entity
@Table(name = "user")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "full_name")
    private String fullName;


    @OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Collection<Role> roles;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "favourites", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "comic_id"))
    private Collection<Comic> favourites;



    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "still_reading", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "comic_id"))
    private Collection<Comic> stillReading;

    public User(String email, String password, String userName, String fullName){
        this.email = email;
        this.password = password;
        this.userName =  userName;
        this.fullName = fullName;

    }
    public User(){

    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    public Collection<Comic> getFavourites() {
        return favourites;
    }

    public void setFavourites(Collection<Comic> favourites) {
        this.favourites = favourites;
    }

    public Collection<Comic> getStillReading() {
        return stillReading;
    }

    public void setStillReading(Collection<Comic> stillReading) {
        this.stillReading = stillReading;
    }
}
