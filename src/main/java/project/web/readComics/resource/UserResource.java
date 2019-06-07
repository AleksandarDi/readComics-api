package project.web.readComics.resource;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import project.web.readComics.model.Comic;
import project.web.readComics.model.User;
import project.web.readComics.service.UserService;

import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import java.util.Collection;
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

    @PatchMapping("/user")
    public void editUser(@RequestBody Map<String,String> body) throws Exception {
        userServices.editUser(
                Integer.parseInt(body.get("id")),
                body.get("email"),
                body.get("password"),
                body.get("userName"),
                body.get("fullName")
        );
    }

    @GetMapping("/user/{role}")
    public List<User> getUserByRole(@PathVariable("role") String role){
        return userServices.getUserByRole(role);
    }

    @GetMapping("/favourite/{id}")
    public Collection<Comic> getAllFavourites(@PathVariable("id") int id) throws Exception {

        return userServices.getAllFavourites(id);
    }

    @PostMapping("/favourite")
    public void AddFavourite(@RequestBody Map<String,String> body) throws Exception {
        userServices.AddFavourite(
          Integer.parseInt(body.get("user_id")),
          Integer.parseInt(body.get("comic_id"))
        );
    }

    @DeleteMapping("/favourite/delete")
    public void DeleteFavourite(@RequestBody Map<String,String> body) throws Exception {

        userServices.removeFavourite(Integer.parseInt(body.get("userId")),Integer.parseInt(body.get("comicId")));
    }

    @GetMapping("/still_reading/{id}")
    public Collection<Comic> getAllStillReading(@PathVariable("id") int id) throws Exception {
        return userServices.getAllStillReading(id);
    }



    @PostMapping("/still_reading")
    public void AddStillReading(@RequestBody Map<String,String> body) throws Exception{
        userServices.AddStillReading(
                Integer.parseInt(body.get("user_id")),
                Integer.parseInt(body.get("comic_id"))
        );
    }

    @DeleteMapping("/still_reading/delete")
    public void DeleteStillReading(@RequestBody Map<String,String> body) throws Exception {

        userServices.removeStillReading(Integer.parseInt(body.get("userId")),Integer.parseInt(body.get("comicId")));
    }

    @GetMapping("/saved/{id}")
    public Collection<Comic> getAllSaved(@PathVariable("id") int id) throws Exception {
        return userServices.getAllSaved(id);
    }



    @PostMapping("/saved")
    public void AddSaved(@RequestBody Map<String,String> body) throws Exception{
        userServices.AddSaved(
                Integer.parseInt(body.get("user_id")),
                Integer.parseInt(body.get("comic_id"))
        );
    }

    @DeleteMapping("/saved/delete")
    public void DeleteSaved(@RequestBody Map<String,String> body) throws Exception {

        userServices.removeSaved(Integer.parseInt(body.get("userId")),Integer.parseInt(body.get("comicId")));
    }


    @GetMapping("/user/exists")
    public String DoesItExist(@RequestParam("userName") String userName, @RequestParam("email") String email){
        return userServices.Exists(
                userName,
                email
        );
    }

}