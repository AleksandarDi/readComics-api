package project.web.readComics.resource;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import project.web.readComics.model.Comic;
import project.web.readComics.service.ComicService;

import java.util.List;
import java.util.Optional;

@RestController
public class ComicResource {

    private final ComicService comicService;

    @Autowired
    public ComicResource(ComicService comicService) {
        this.comicService = comicService;
    }

    @GetMapping("/{category}")
    public List<Comic> getComicByCategory(@PathVariable("category") String category)
    {
        return comicService.getComicByCategory(category);
    }
    @GetMapping("/comic/{id}")
    public Optional<Comic> getComicById(@PathVariable("id") int id)
    {
        return comicService.getComicById(id);
    }


}
