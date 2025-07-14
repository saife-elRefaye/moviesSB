package com.movieapp.service;

import com.movieapp.model.Rating;
import com.movieapp.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    public Rating rateMovie(Long userId, Long movieId, int score) {
        Optional<Rating> existing = ratingRepository.findByUserIdAndMovieId(userId, movieId);
        Rating rating = existing.orElse(new Rating(userId, movieId, score));
        rating.setScore(score);
        return ratingRepository.save(rating);
    }

    public Optional<Rating> getRating(Long userId, Long movieId) {
        return ratingRepository.findByUserIdAndMovieId(userId, movieId);
    }
}
