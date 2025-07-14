package com.movieapp.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.movieapp.service.OmdbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class OmdbController {

    @Autowired
    private OmdbService omdbService;

    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<JsonNode> searchOmdb(
            @RequestParam String query,
            @RequestParam(defaultValue = "1") int page) {

        JsonNode response = omdbService.searchOmdbRaw(query, page);
        return ResponseEntity.ok(response);
    }
}
