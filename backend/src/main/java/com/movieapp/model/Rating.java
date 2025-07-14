
package com.movieapp.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "ratings", uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "movieId"}))
public class Rating implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long movieId;
    private int score;

    public Rating() {}

    public Rating(Long userId, Long movieId, int score) {
        this.userId = userId;
        this.movieId = movieId;
        this.score = score;
    }

    public Long getId() { return id; }

    public Long getUserId() { return userId; }

    public void setUserId(Long userId) { this.userId = userId; }

    public Long getMovieId() { return movieId; }

    public void setMovieId(Long movieId) { this.movieId = movieId; }

    public int getScore() { return score; }

    public void setScore(int score) { this.score = score; }
}
