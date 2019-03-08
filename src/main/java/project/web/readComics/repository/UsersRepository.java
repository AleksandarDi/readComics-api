package project.web.readComics.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.web.readComics.model.Comic;
import project.web.readComics.model.User;
import project.web.readComics.model.Favourite;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<User,Integer> {
    User findByUserName(String username);



}
