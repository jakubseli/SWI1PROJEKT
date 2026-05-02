package com.cinemabox.dto;

import com.cinemabox.entity.Movie;

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
        dto.id = movie.getId();
        dto.title = movie.getTitle();
        dto.director = movie.getDirector();
        dto.year = movie.getYear();
        dto.genre = movie.getGenre();
        dto.description = movie.getDescription();
        dto.posterUrl = movie.getPosterUrl();
        dto.liked = liked;
        return dto;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPosterUrl() { return posterUrl; }
    public void setPosterUrl(String posterUrl) { this.posterUrl = posterUrl; }
    public boolean isLiked() { return liked; }
    public void setLiked(boolean liked) { this.liked = liked; }
}