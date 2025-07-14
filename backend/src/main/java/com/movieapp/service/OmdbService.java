package com.movieapp.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.movieapp.model.Movie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class OmdbService {

    @Value("${omdb.api.url}")
    private String omdbApiUrl;

    @Value("${omdb.api.key}")
    private String omdbApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    /**
     * Search OMDB and return the raw JSON response as a JsonNode.
     */
    public JsonNode searchOmdbRaw(String query, int page) {
        String url = omdbApiUrl + "?apikey=" + omdbApiKey + "&s=" + query + "&page=" + page;

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return mapper.readTree(response.getBody());
        } catch (Exception e) {
            System.err.println("OMDB fetch failed: " + e.getMessage());
            return mapper.createObjectNode(); // return empty JSON object
        }
    }

    /**
     * Search OMDB and map results to Movie objects.
     */
    public List<Movie> searchMovies(String query, int page) {
        String url = omdbApiUrl + "?apikey=" + omdbApiKey + "&s=" + query + "&page=" + page;

        List<Movie> movies = new ArrayList<>();

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            JsonNode root = mapper.readTree(response.getBody());

            if (root.has("Search")) {
                for (JsonNode node : root.get("Search")) {
                    Movie movie = new Movie();
                    movie.setTitle(node.get("Title").asText());
                    movie.setYear(node.get("Year").asText());
                    movie.setImdbId(node.get("imdbID").asText());
                    movie.setType(node.get("Type").asText());
                    movie.setPoster(node.get("Poster").asText());
                    movies.add(movie);
                }
            }

        } catch (Exception e) {
            System.err.println("OMDB mapping failed: " + e.getMessage());
        }

        return movies;
    }

    public String getOmdbApiUrl() {
        return omdbApiUrl;
    }

    public String getOmdbApiKey() {
        return omdbApiKey;
    }
}
