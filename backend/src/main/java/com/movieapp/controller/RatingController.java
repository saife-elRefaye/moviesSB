package com.movieapp.controller;

import com.movieapp.model.Rating;
import com.movieapp.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "*")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @PostMapping
    public Rating rateMovie(@RequestParam Long userId,
                            @RequestParam Long movieId,
                            @RequestParam int score) {
        return ratingService.rateMovie(userId, movieId, score);
    }

    @GetMapping
    public Optional<Rating> getRating(@RequestParam Long userId,
                                      @RequestParam Long movieId) {
        return ratingService.getRating(userId, movieId);
    }
}
