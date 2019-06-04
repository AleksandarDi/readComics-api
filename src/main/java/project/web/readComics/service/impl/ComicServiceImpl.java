package project.web.readComics.service.impl;

import org.springframework.stereotype.Service;
import project.web.readComics.model.Comic;
import project.web.readComics.repository.ComicsRepository;
import project.web.readComics.service.ComicService;

import java.sql.Blob;
import java.util.List;
import java.util.Optional;

@Service
public class ComicServiceImpl implements ComicService {

    private final ComicsRepository comicsRepository;

    public ComicServiceImpl(ComicsRepository comicsRepository) {
        this.comicsRepository = comicsRepository;
    }

    @Override
    public List<Comic> getComicByCategory(String category){
        return comicsRepository.findByCategory(category);
    }
    @Override
    public Optional<Comic> getComicById(int id){
        return comicsRepository.findById(id);
    }

    @Override
    public List<Comic> getAllComics(){
        return comicsRepository.findAll();
    }
}
