package project.web.readComics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.web.readComics.model.Comic;
import project.web.readComics.model.User;
import project.web.readComics.repository.ComicsRepository;
import project.web.readComics.repository.RolesRepository;
import project.web.readComics.repository.UsersRepository;
import project.web.readComics.service.UserService;

import java.util.Arrays;
import java.util.List;


@Service
public class UserServiceImpl implements UserService {

    private final UsersRepository repository;
    private final ComicsRepository rep;
    private final RolesRepository rolesRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UsersRepository repository, ComicsRepository rep, RolesRepository rolesRepository) {
        this.repository = repository;
        this.rep = rep;
        this.rolesRepository = rolesRepository;
    }

    @Override
    public void AddUser(String email,String password,String userName,String fullName){
            String p = passwordEncoder.encode(password);
            User u = new User();
            u.setEmail(email);
            u.setName(userName);
            u.setLastName(fullName);
            u.setPassword(p);
            u.setRoles(Arrays.asList(rolesRepository.findByRole("User")));
            //User us = new User(email,p,userName,fullName);
            repository.save(u);

    }

    @Override
    public List<User> getAllUsers(){
        return repository.findAll();
    }

   /* @Override
    public void AddFavourite(String user_id, String comic_id){

    }

    @Override
    public List<Comic> getAllFavourites(int id){
       return rep.getFavourites(id);
    }
        */
}
