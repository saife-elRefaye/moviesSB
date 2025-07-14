
package com.movieapp.service;

import com.movieapp.model.Movie;
import com.movieapp.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public Page<Movie> getAllMovies(Pageable pageable) {
        return movieRepository.findAll(pageable);
    }

    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public List<Movie> saveAll(List<Movie> movies) {
        return movieRepository.saveAll(movies);
    }

    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }

    public void deleteAllByIds(List<Long> movieIds) {
        movieRepository.deleteAllById(movieIds);
    }
}
