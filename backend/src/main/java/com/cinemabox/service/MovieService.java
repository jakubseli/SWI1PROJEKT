package com.cinemabox.service;

import com.cinemabox.dto.MovieDto;
import com.cinemabox.entity.Movie;
import com.cinemabox.entity.User;
import com.cinemabox.repository.MovieRepository;
import com.cinemabox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    public List<MovieDto> getAllMovies(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return movieRepository.findAll().stream()
                .map(movie -> MovieDto.from(movie, user.getLikedMovies().contains(movie)))
                .collect(Collectors.toList());
    }

    public List<MovieDto> getLikedMovies(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getLikedMovies().stream()
                .map(movie -> MovieDto.from(movie, true))
                .collect(Collectors.toList());
    }

    public MovieDto likeMovie(Long movieId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        user.getLikedMovies().add(movie);
        userRepository.save(user);
        return MovieDto.from(movie, true);
    }

    public MovieDto unlikeMovie(Long movieId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        user.getLikedMovies().remove(movie);
        userRepository.save(user);
        return MovieDto.from(movie, false);
    }
}