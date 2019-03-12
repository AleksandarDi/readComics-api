package project.web.readComics.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.web.readComics.model.Comic;

import java.util.List;

public interface ComicsRepository extends JpaRepository<Comic,Integer> {

    List<Comic> findByCategory(String category);

}
