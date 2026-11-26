package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 150)
    private String title;

    @Column(length = 500)
    private String tagline;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(length = 255)
    private String photoUrl;

    @Column(nullable = false, length = 120)
    private String email;

    @Column(length = 40)
    private String phone;

    @Column(length = 150)
    private String location;

    @Column(length = 255)
    private String linkedin;

    @Column(length = 255)
    private String github;
}
