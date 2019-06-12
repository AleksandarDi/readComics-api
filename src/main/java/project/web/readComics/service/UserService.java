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

    void removeFavourite(int userId,int comicId) throws Exception;

    void removeStillReading(int userId,int comicId) throws Exception;

    Collection<Comic> getAllStillReading(int id) throws Exception;

    Collection<Comic> getAllSaved(int id) throws Exception;

    void AddSaved(int user_id,int comic_id)  throws Exception;

    void removeSaved(int user_id,int comic_id)  throws Exception;

    String Exists(String userName, String email);

    String containsComicInStillReading(int user_id, int comic_id) throws Exception;

    String containsComicInSaved(int user_id, int comic_id) throws Exception;

    String containsComicInFavorites(int user_id, int comic_id) throws Exception;
}
