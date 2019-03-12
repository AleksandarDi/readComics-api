package project.web.readComics.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.web.readComics.model.User;

public interface UsersRepository extends JpaRepository<User,Integer> {
    User findByUserName(String username);



}
