package com.movieapp.controller;

import com.movieapp.model.Movie;
import com.movieapp.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.movieapp.service.OmdbService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private OmdbService omdbService;

    @GetMapping("/admin/search")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> searchOmdb(@RequestParam String query, @RequestParam(defaultValue = "1") int page) {
        System.out.println("OMDB Search called: query=" + query + ", page=" + page);
        JsonNode result = omdbService.searchOmdbRaw(query, page);
        return ResponseEntity.ok(result);
    }
    // ✅ List all movies (paginated)
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public Page<Movie> getAllMovies(Pageable pageable) {
        return movieService.getAllMovies(pageable);
    }

    // ✅ Add single movie (admin only)
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.saveMovie(movie));
    }

    // ✅ Delete single movie (admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteMovie(@PathVariable Long id) {
        Optional<Movie> movie = movieService.getMovieById(id);
        if (movie.isPresent()) {
            movieService.deleteMovie(id);
            return ResponseEntity.ok("Movie deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/batch-add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addMoviesBatch(@RequestBody List<Movie> movies) {
        movieService.saveAll(movies); // Important!
        return ResponseEntity.ok("Batch added successfully");
    }


    // ✅ Batch delete movies (admin only)
    @DeleteMapping("/batch")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteMoviesBatch(@RequestBody List<Long> ids) {
        movieService.deleteAllByIds(ids);
        return ResponseEntity.ok("Movies deleted.");
    }
}
