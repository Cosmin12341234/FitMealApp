package com.example.demo.dto.user;

import com.example.demo.dto.meal.MealResponse;
import com.example.demo.dto.workout.WorkoutResponse;
import com.example.demo.model.enums.ActivityLevel;
import com.example.demo.model.enums.Gender;
import com.example.demo.model.enums.Goals;
import com.example.demo.model.enums.Role;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.util.List;

public record UserResponse(

        @Schema(description = "The id of the user")
        Long id,

        @Schema(description = "The role of the user")
        Role role,

        @Schema(description = "The username of the user")
        String username,

        @Schema(description = "The email of the user")
        String email,

        @Schema(description = "The first name of the user")
        String firstName,

        @Schema(description = "The last name of the user")
        String lastName,

        @Schema(description = "The dob of the user")
        LocalDate dob,

        @Schema(description = "Gender of the user")
        Gender gender,

        @Schema(description = "The height of the user")
        double height,

        @Schema(description = "The weight of the user")
        double weight,

        @Schema(description = "The fitness goals of the user")
        Goals goals,

        @Schema(description = "The activity level of the user")
        ActivityLevel activityLevel,

        @Schema(description = "The list of workouts of the user")
        List<WorkoutResponse> workouts,

        @Schema(description = "The list of meals of the user")
        List<MealResponse> meals
) {
    public UserResponse(
            Long id,
            Role role,
            String username,
            String email,
            String firstName,
            String lastName,
            LocalDate dob,
            Gender gender,
            double height,
            double weight,
            Goals goals,
            ActivityLevel activityLevel,
            List<WorkoutResponse> workouts,
            List<MealResponse> meals
    ) {
        this.id = id;
        this.role = role;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.goals = goals;
        this.activityLevel = activityLevel;
        this.workouts = workouts;
        this.meals = meals;
    }
}