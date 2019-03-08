package project.web.readComics.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.web.readComics.model.Comic;

import java.util.List;
import java.util.Optional;

public interface ComicsRepository extends JpaRepository<Comic,Integer> {

    List<Comic> findByCategory(String category);

    @Query("Select c from Comic c inner join Favourite f" +
            " on c.id = f.c_id" +
            " where f.u_id = :id")
    List<Comic> getFavourites(@Param("id") int id);
}
