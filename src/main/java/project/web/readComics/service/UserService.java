package project.web.readComics.service;

import project.web.readComics.model.Comic;
import project.web.readComics.model.User;

import java.util.List;
import java.util.Set;

public interface UserService {
    void AddUser(String email,String password,String userName,String fullName);

    List<User> getAllUsers();

    List<User> getUserByRole(String role);

    void AddFavourite(int user_id, int comic_id) throws Exception;
/*
    List<Comic> getAllFavourites(int id);*/

}
