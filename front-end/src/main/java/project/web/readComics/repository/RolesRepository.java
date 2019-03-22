package project.web.readComics.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.web.readComics.model.Role;

public interface RolesRepository extends JpaRepository<Role,Integer> {
    Role findByRole(String role);



}
