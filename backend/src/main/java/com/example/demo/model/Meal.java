package com.example.demo.model;

import com.example.demo.model.enums.Type;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "app_meal")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The id of the meal")
    private Long id;

    @Column(nullable = false, length = 64)
    @Schema(description = "The name of the meal")
    private String name;

    @Column(nullable = false,length = 64)
    @Enumerated(EnumType.STRING)
    @Schema(description = "The type of the meal")
    private Type type;

    @Column(nullable = false)
    @Schema(description = "The calories of the meal")
    private int calories;

    @Column(nullable = false)
    @Schema(description = "The date of the meal")
    private LocalDate date;

    @Column(nullable = false, length = 64)
    @Schema(description = "The description of the meal")
    private String description;

    @Schema(description = "The user of the meal")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Meal(String name, Type type, int calories, LocalDate date, String description, User user) {
        this.name = name;
        this.type = type;
        this.calories = calories;
        this.date = date;
        this.description = description;
        this.user = user;
    }
}