package project.web.readComics.service;

import project.web.readComics.model.Comic;
import project.web.readComics.model.User;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface UserService {
    void AddUser(String email,String password,String userName,String fullName);

    List<User> getAllUsers();

    List<User> getUserByRole(String role);

    void AddFavourite(int user_id, int comic_id) throws Exception;

    void AddStillReading(int user_id, int comic_id) throws Exception;

    void editUser(int id, String email, String password, String userName, String fullName) throws Exception;

    Collection<Comic> getAllFavourites(int id) throws Exception;

    Collection<Comic> getAllStillReading(int id) throws Exception;

    String Exists(String userName, String email);
}
