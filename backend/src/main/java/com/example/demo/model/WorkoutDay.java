package com.example.demo.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "app_workoutDay")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The id of the workout day")
    private Long id;

    @Column(nullable = false, length = 64)
    @Schema(description = "This will be the key of the map from the workout plan,eg: Day 1:List<Exercise>,this will be Day 1")
    private String dayName;


    @ManyToMany(fetch = FetchType.LAZY,    cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH,
            CascadeType.DETACH
    })
    @JoinTable(
            name = "workout_day_exercises",
            joinColumns = @JoinColumn(name = "workout_day_id"),
            inverseJoinColumns = @JoinColumn(name = "exercise_id")
    )
    @Schema(description = "These will be the values of the map from the workout plan,eg: Day 1:List<Exercise>,this will be List<Exercise>")
    private List<Exercise> exercises = new ArrayList<>();


    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "workout_plan_id", nullable = false)
    @Schema(description = "The workout plan of the workout day")
    private WorkoutPlan workoutPlan;



    public WorkoutDay(String dayName, WorkoutPlan workoutPlan, List<Exercise> exercises) {
        this.dayName = dayName;
        this.workoutPlan = workoutPlan;
        this.exercises = exercises;
    }
}
