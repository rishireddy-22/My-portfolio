package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "education")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String degree;

    @Column(nullable = false, length = 200)
    private String institution;

    @Column(length = 200)
    private String university;

    @Column(nullable = false)
    private Integer startYear;

    private Integer endYear; // nullable for ONGOING

    @Column(nullable = false, length = 20)
    private String status; // "ONGOING" or "COMPLETED"

    @Column(length = 30)
    private String score; // nullable

    @Column(length = 30)
    private String scoreType; // "CGPA" or "PERCENTAGE"

    @Column(name = "display_order")
    private Integer displayOrder;
}
