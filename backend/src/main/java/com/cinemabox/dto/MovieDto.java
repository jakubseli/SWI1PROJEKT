package com.cinemabox.dto;

import com.cinemabox.entity.Movie;
import lombok.Data;

@Data
public class MovieDto {
    private Long id;
    private String title;
    private String director;
    private Integer year;
    private String genre;
    private String description;
    private String posterUrl;
    private boolean liked;

    public static MovieDto from(Movie movie, boolean liked) {
        MovieDto dto = new MovieDto();
        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDirector(movie.getDirector());
        dto.setYear(movie.getYear());
        dto.setGenre(movie.getGenre());
        dto.setDescription(movie.getDescription());
        dto.setPosterUrl(movie.getPosterUrl());
        dto.setLiked(liked);
        return dto;
    }
}