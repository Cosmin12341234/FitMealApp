package com.example.demo.dto.user;

import com.example.demo.model.enums.ActivityLevel;
import com.example.demo.model.enums.Gender;
import com.example.demo.model.enums.Goals;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRequest(

        @Schema(description = "The username of the user (required)")
        @NotBlank(message = "Username cannot be blank")
        @Size(min = 3, max = 64, message = "Username must be between 3 and 64 characters")
        String username,

        @Schema(description = "The email of the user (required)")
        @NotBlank(message = "Email cannot be blank")
        @Size(min = 3, max = 64, message = "Email must be between 3 and 64 characters")
        String email,

        @Schema(description = "The password of the user (required)")
        @NotBlank(message = "Password cannot be blank")
        @Size(min = 3, max = 64, message = "Password must be between 3 and 64 characters")
        String password,

        @Schema(description = "The first name of the user (required)")
        @NotBlank(message = "First name cannot be blank")
        @Size(min = 3, max = 64, message = "First name must be between 3 and 64 characters")
        String firstName,

        @Schema(description = "The last name of the user (required)")
        @NotBlank(message = "Last name cannot be blank")
        @Size(min = 3, max = 64, message = "Last name must be between 3 and 64 characters")
        String lastName,

        @Schema(description = "The age of the user (required)")
        @NotNull(message = "Age cannot be null")
        int age,

        @Schema(description = "Gender of the user (required)")
        @NotNull(message = "Gender cannot be null")
        Gender gender,

        @Schema(description = "The height of the user (required)")
        @NotNull(message = "Height cannot be null")
        double height,

        @Schema(description = "The weight of the user (required)")
        @NotNull(message = "Weight cannot be null")
        double weight,

        @Schema(description = "The fitness goals of the user")
        @NotNull(message = "Fitness goals cannot be null")
        Goals fitnessGoals,

        @Schema(description = "The activity level of the user")
        @NotNull(message = "Activity level cannot be null")
        ActivityLevel activityLevel

) {
    public UserRequest(
            String username,
            String email,
            String password,
            String firstName,
            String lastName,
            int age,
            Gender gender,
            double height,
            double weight,
            Goals fitnessGoals,
            ActivityLevel activityLevel
    ) {
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




