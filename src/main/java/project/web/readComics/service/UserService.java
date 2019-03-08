package project.web.readComics.service;

import project.web.readComics.model.Comic;
import project.web.readComics.model.User;

import java.util.List;
import java.util.Set;

public interface UserService {
    void AddUser(String email,String password,String userName,String fullName);

    List<User> getAllUsers();

   // void AddFavourite(String user_id, String comic_id);

    List<Comic> getAllFavourites(int id);

    /*Set<Comic> getAllFavourites();*/
}
