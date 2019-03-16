package project.web.readComics.resource;


import org.springframework.web.bind.annotation.*;
import project.web.readComics.model.Comic;
import project.web.readComics.model.User;
import project.web.readComics.service.UserService;

import java.util.List;
import java.util.Map;
import java.util.Set;

@CrossOrigin("*")
@RequestMapping("/")
@RestController
public class UserResource {

    private final UserService userServices;

    public UserResource(UserService userServices) {
        this.userServices = userServices;
    }

    @PostMapping("/sign_up")
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
