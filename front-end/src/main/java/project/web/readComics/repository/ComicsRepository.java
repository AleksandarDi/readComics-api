package project.web.readComics.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.web.readComics.model.Comic;

import java.util.List;
import java.util.Optional;

public interface ComicsRepository extends JpaRepository<Comic,Integer> {

    List<Comic> findByCategory(String category);
   // Optional<Comic> findById(int id);

}
