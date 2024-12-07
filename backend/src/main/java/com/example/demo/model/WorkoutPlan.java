package com.example.demo.model;

import com.example.demo.model.enums.*;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "app_workoutPlan")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The id of the workout plan")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @Schema(description = "The user of the workout plan")
    private User user;

    @Column(nullable = false, length = 64)
    @Schema(description = "The name of the workout plan")
    private String name;

    @Column(nullable = false)
    @Schema(description = "The frequency of the workout plan")
    private int frequency;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "The experience of the workout plan")
    Difficulty experience;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "The goal of the workout plan")
    WorkoutGoals goal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Schema(description = "The gender of the workout plan")
    private Gender gender;

    @Column(nullable = false)
    @Schema(description = "When the workout plan was created")
    private LocalDate dateCreated;

    @Column(nullable = false,name = "Equipment")
    @Enumerated(EnumType.STRING)
    @ElementCollection
    @Schema(description = "The equipment for the workout plan")
    private List<Equipment> equipment;

    @OneToMany(mappedBy = "workoutPlan", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Schema(description = "The workout days of the workout plan(its like a map with key=dayName and value=List<Exercise>)")
    private List<WorkoutDay> workoutDays;

    public WorkoutPlan(User user,String name, int frequency, Difficulty experience,WorkoutGoals goal,Gender gender ,LocalDate dateCreated, List<Equipment> equipment, List<WorkoutDay> workoutDays) {
        this.user = user;
        this.name = name;
        this.frequency = frequency;
        this.experience = experience;
        this.goal = goal;
        this.gender=gender;
        this.dateCreated = dateCreated;
        this.equipment = equipment;
        this.workoutDays = workoutDays;
    }
}
