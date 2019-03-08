package project.web.readComics.model;


import javax.persistence.*;
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


   /* @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;
*/
   private TestRole roles;

    public TestRole getRoles() {
        return roles;
    }

    public void setRoles(TestRole roles) {
        this.roles = roles;
    }
/*@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "favourites", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "comic_id"))
    private List<Comic> favourites;*/



    /*public User(User users) {

            this.id = users.id;
            this.email = users.email;
            this.name = users.name;
            this.lastName =users.lastName;
            this.password = users.password;
        }*/
    public User(String email, String password, String userName, String fullName){
        this.email = email;
        this.password = password;
        this.userName =  userName;
        this.fullName = fullName;

      //  this.favourites = favourites;
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

    public String getName() {
        return userName;
    }

    public void setName(String name) {
        this.userName = name;
    }

    public String getLastName() {
        return fullName;
    }

    public void setLastName(String lastName) {
        this.fullName = lastName;
    }


  /*  public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }*/

}
