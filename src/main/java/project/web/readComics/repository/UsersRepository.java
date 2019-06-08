package project.web.readComics.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import project.web.readComics.model.Role;
import project.web.readComics.model.User;

import java.util.Collection;
import java.util.List;

public interface UsersRepository extends JpaRepository<User,Integer> {
    User findByUserName(String username);
    List<User> findByRoles(Collection<Role> roles);
    boolean existsByUserName(String username);
    boolean existsByEmail(String email);
}
