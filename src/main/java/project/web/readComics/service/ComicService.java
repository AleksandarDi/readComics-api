package project.web.readComics.service;

import project.web.readComics.model.Comic;

import java.util.List;
import java.util.Optional;

public interface ComicService {

    List<Comic> getComicByCategory(String category);

    Optional<Comic> getComicById(int id);
}
