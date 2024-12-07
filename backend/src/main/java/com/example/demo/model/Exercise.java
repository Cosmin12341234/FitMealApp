package com.example.demo.model;

import com.example.demo.model.enums.Difficulty;
import com.example.demo.model.enums.Equipment;
import com.example.demo.model.enums.Muscle;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "app_exercise")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The id of the exercise")
    private Long id;

    @Column(nullable = false, length = 64)
    @Schema(description = "The name of the exercise")
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Schema(description = "The primary muscle of the exercise")
    private Muscle primaryMuscle;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @ElementCollection
    @Schema(description = "The secondary muscles of the exercise")
    private List<Muscle> secondaryMuscles;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Schema(description = "The equipment of the exercise")
    private Equipment equipment;

    @Column(nullable = false)
    @Schema(description = "The difficulty of the exercise")
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Column(nullable = false, length = 256)
    @Schema(description = "The instructions of the exercise")
    private String instructions;

    @ManyToMany(mappedBy = "exercises", fetch = FetchType.LAZY,cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @Schema(description = "The workout days this exercise belongs to")
    @JsonIgnore
    private List<WorkoutDay> workoutDays = new ArrayList<>();

    public Exercise(String name, Muscle primaryMuscle, List<Muscle> secondaryMuscles, Equipment equipment, Difficulty difficulty, String instructions) {
        this.name = name;
        this.primaryMuscle = primaryMuscle;
        this.secondaryMuscles = secondaryMuscles;
        this.equipment = equipment;
        this.difficulty = difficulty;
        this.instructions = instructions;
    }
}
