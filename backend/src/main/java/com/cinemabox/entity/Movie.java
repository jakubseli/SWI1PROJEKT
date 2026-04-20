package com.cinemabox.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "movies")
@Data
@NoArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String director;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private String genre;

    @Column(length = 500)
    private String description;

    @Column(name = "poster_url")
    private String posterUrl;
}