package project.web.readComics.resource;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import project.web.readComics.model.User;
import project.web.readComics.service.UserService;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserResource {

    private final UserService userServices;

    @Autowired
    public UserResource(UserService userServices) {
        this.userServices = userServices;
    }

    @PostMapping("/sign_up")
    @ResponseStatus(HttpStatus.CREATED)
    public void AddUser(@RequestBody Map<String,String> body) {
        userServices.AddUser(
                body.get("email"),
                body.get("password"),
                body.get("userName"),
                body.get("fullName")
        );
    }

    @GetMapping("/user")
    public List<User> getUsers()
    {
        return userServices.getAllUsers();
    }

    /*@PostMapping("/pota")
    public void AddFavourite(@RequestBody Map<String,String> body){
        userServices.AddFavourite(
          body.get("user_id"),
          body.get("comic_id")
        );
    }
    @GetMapping("/potato/{id}")
    public List<Comic> getAllFavourites(@PathVariable("id") int id){
        return userServices.getAllFavourites(id);
    }
    */

}