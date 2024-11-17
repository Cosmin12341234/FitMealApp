package com.example.demo.model;

import com.example.demo.model.enums.ActivityLevel;
import com.example.demo.model.enums.Gender;
import com.example.demo.model.enums.Goals;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "app_user")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "The id of the user")
    private Long id;

    @Column(nullable = false, length = 64)
    @Schema(description = "The username of the user")
    private String username;

    @Column(nullable = false, length = 64)
    @Schema(description = "The email of the user")
    private String email;

    @Column(nullable = false, length = 64)
    @Schema(description = "The password of the user")
    private String password;

    @Column(nullable = false, length = 64)
    @Schema(description = "The first name of the user")
    private String firstName;

    @Column(nullable = false, length = 64)
    @Schema(description = "The last name of the user")
    private String lastName;

    @Column(nullable = false)
    @Schema(description = "The age of the user")
    private int age;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Schema(description = "The gender of the user")
    private Gender gender;

    @Column(nullable = false)
    @Schema(description = "The height of the user")
    private double height;

    @Column(nullable = false)
    @Schema(description = "The weight of the user")
    private double weight;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Schema(description = "The fitness goals of the user")
    private Goals fitnessGoals;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Schema(description = "The activity level of the user")
    private ActivityLevel activityLevel;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Schema(description = "The workouts of the user")
    private List<Workout> workouts;

    public User(String username, String email, String password, String firstName, String lastName, int age, Gender gender, double height, double weight, Goals fitnessGoals, ActivityLevel activityLevel) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.fitnessGoals = fitnessGoals;
        this.activityLevel = activityLevel;
    }
}