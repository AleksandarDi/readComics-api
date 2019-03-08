package project.web.readComics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.web.readComics.model.Comic;
import project.web.readComics.model.TestRole;
import project.web.readComics.model.User;
import project.web.readComics.repository.ComicsRepository;
import project.web.readComics.repository.UsersRepository;
import project.web.readComics.service.UserService;

import java.util.List;


@Service
public class UserServiceImpl implements UserService {

    private final UsersRepository repository;
    private final ComicsRepository rep;


    @Autowired
    private PasswordEncoder passwordEncoder;

  // private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserServiceImpl(UsersRepository repository, ComicsRepository rep) {
        this.repository = repository;
        this.rep = rep;
    }

    @Override
    public void AddUser(String email,String password,String userName,String fullName){
            String p = passwordEncoder.encode(password);
            User u = new User();
            u.setEmail(email);
            u.setName(userName);
            u.setLastName(fullName);
            u.setPassword(p);
            u.setRoles(TestRole.ROLE_WEB_USER);
            //User us = new User(email,p,userName,fullName);
            repository.save(u);

    }

    @Override
    public List<User> getAllUsers(){
        return repository.findAll();
    }

   /* @Override
    public void AddFavourite(String user_id, String comic_id){

    }*/

    @Override
    public List<Comic> getAllFavourites(int id){
       return rep.getFavourites(id);
    }

}
