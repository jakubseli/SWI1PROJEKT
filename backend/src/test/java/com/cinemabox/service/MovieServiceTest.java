package com.cinemabox.service;

import com.cinemabox.dto.MovieDto;
import com.cinemabox.entity.Movie;
import com.cinemabox.entity.User;
import com.cinemabox.repository.MovieRepository;
import com.cinemabox.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MovieServiceTest {

    @Mock
    private MovieRepository movieRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private MovieService movieService;

    private User testUser;
    private Movie testMovie;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setEmail("test@test.com");
        testUser.setPassword("password");
        testUser.setLikedMovies(new HashSet<>());

        testMovie = new Movie();
        testMovie.setId(1L);
        testMovie.setTitle("The Matrix");
        testMovie.setDirector("Lana Wachowski");
        testMovie.setYear(1999);
        testMovie.setGenre("Sci-Fi");
        testMovie.setDescription("A hacker discovers reality is a simulation.");
        testMovie.setPosterUrl("http://example.com/matrix.jpg");
    }

    @Test
    void getAllMovies_returnsAllMoviesWithLikedStatus() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(movieRepository.findAll()).thenReturn(List.of(testMovie));

        List<MovieDto> result = movieService.getAllMovies("testuser");

        assertEquals(1, result.size());
        assertEquals("The Matrix", result.get(0).getTitle());
        assertFalse(result.get(0).isLiked());
        verify(movieRepository, times(1)).findAll();
    }

    @Test
    void likeMovie_addsMovieToUserLikedList() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(movieRepository.findById(1L)).thenReturn(Optional.of(testMovie));
        when(userRepository.save(testUser)).thenReturn(testUser);

        MovieDto result = movieService.likeMovie(1L, "testuser");

        assertTrue(result.isLiked());
        assertTrue(testUser.getLikedMovies().contains(testMovie));
        verify(userRepository, times(1)).save(testUser);
    }

    @Test
    void unlikeMovie_removesMovieFromUserLikedList() {
        testUser.getLikedMovies().add(testMovie);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(movieRepository.findById(1L)).thenReturn(Optional.of(testMovie));
        when(userRepository.save(testUser)).thenReturn(testUser);

        MovieDto result = movieService.unlikeMovie(1L, "testuser");

        assertFalse(result.isLiked());
        assertFalse(testUser.getLikedMovies().contains(testMovie));
        verify(userRepository, times(1)).save(testUser);
    }
}