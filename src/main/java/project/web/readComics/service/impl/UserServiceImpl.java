package project.web.readComics.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.web.readComics.model.Comic;
import project.web.readComics.model.Role;
import project.web.readComics.model.User;
import project.web.readComics.repository.ComicsRepository;
import project.web.readComics.repository.RolesRepository;
import project.web.readComics.repository.UsersRepository;
import project.web.readComics.service.UserService;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;


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
            u.setUserName(userName);
            u.setFullName(fullName);
            u.setPassword(p);
            u.setRoles(Arrays.asList(rolesRepository.findByRole("User")));
            //User us = new User(email,p,userName,fullName);
            repository.save(u);

    }

    @Override
    public List<User> getAllUsers(){
        return repository.findAll();
    }


    @Override
    public List<User> getUserByRole(String role){
        Collection<Role> roles = Arrays.asList(rolesRepository.findByRole(role));
        return repository.findByRoles(roles);
    }
    @Override
    public void editUser(int id, String email, String password, String userName, String fullName) throws Exception {
        User us = repository.findById(id).orElseThrow(Exception::new);
        us.setEmail(email);
        if(!password.equals("")) {
            String p = passwordEncoder.encode(password);
            us.setPassword(p);
        }
        us.setUserName(userName);
        us.setFullName(fullName);
        repository.save(us);
    }
    @Override
    public void AddFavourite(int user_id, int comic_id) throws Exception{

            User us = repository.findById(user_id).orElseThrow(Exception::new);
            Collection<Comic> comics = us.getFavourites();
            Comic com = rep.findById(comic_id).orElseThrow(Exception::new);
            comics.add(com);
            repository.save(us);

    }
    @Override
    public void AddStillReading(int user_id, int comic_id) throws Exception{

        User us = repository.findById(user_id).orElseThrow(Exception::new);
        Collection<Comic> comics = us.getFavourites();
        Comic com = rep.findById(comic_id).orElseThrow(Exception::new);
        comics.add(com);
        repository.save(us);

    }


    @Override
    public Collection<Comic> getAllFavourites(int id) throws Exception {
        User us = repository.findById(id).orElseThrow(Exception::new);
        return us.getFavourites();

    }
    @Override
    public Collection<Comic> getAllStillReading(int id) throws Exception {
        User us = repository.findById(id).orElseThrow(Exception::new);
        return us.getStillReading();

    }
    @Override
    public String Exists(String userName,String email){
        //User us = repository.findByUserName(userName);
        if(repository.existsByUserName(userName)){
            return "Username already exists";
        }
        else if(repository.existsByEmail(email)){
            return "Email already exists";
        }
        else return "Valid";
    }
}
