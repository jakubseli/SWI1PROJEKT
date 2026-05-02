package com.cinemabox.controller;

import com.cinemabox.dto.MovieDto;
import com.cinemabox.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<MovieDto>> getAllMovies(Authentication auth) {
        return ResponseEntity.ok(movieService.getAllMovies(auth.getName()));
    }

    @GetMapping("/liked")
    public ResponseEntity<List<MovieDto>> getLikedMovies(Authentication auth) {
        return ResponseEntity.ok(movieService.getLikedMovies(auth.getName()));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<MovieDto> likeMovie(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.ok(movieService.likeMovie(id, auth.getName()));
    }

    @DeleteMapping("/{id}/like")
    public ResponseEntity<MovieDto> unlikeMovie(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.ok(movieService.unlikeMovie(id, auth.getName()));
    }
}