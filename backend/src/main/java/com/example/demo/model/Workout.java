package com.example.demo.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "app_workout")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The id of the workout")
    private Long id;

    @Column(nullable = false, length = 64)
    @Schema(description = "The type of the workout")
    private String type;

    @Column(nullable = false)
    @Schema(description = "The duration of the workout")
    private int duration;

    @Column(nullable = false)
    @Schema(description = "The date of the workout")
    private LocalDateTime date;

    @Column(nullable = false)
    @Schema(description = "The calories burned during the workout")
    private double caloriesBurned;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Workout(String type, int duration, LocalDateTime date, double caloriesBurned, User user) {
        this.type = type;
        this.duration = duration;
        this.date = date;
        this.caloriesBurned = caloriesBurned;
        this.user = user;
    }
}