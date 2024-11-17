package com.example.demo.dto.workout;

import com.example.demo.model.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record WorkoutRequest(

        @Schema(description = "The type of the workout (required)")
        @NotBlank(message = "Workout type cannot be blank")
        @Size(min = 3, max = 64, message = "Workout type must be between 3 and 64 characters")
        String type,

        @Schema(description = "The duration of the workout in minutes (required)")
        @NotNull(message = "Duration cannot be null")
        int duration,

        @Schema(description = "The date and time of the workout (required)")
        @NotNull(message = "Date cannot be null")
        LocalDateTime date,

        @Schema(description = "The calories burned during the workout (required)")
        @NotNull(message = "Calories burned cannot be null")
        double caloriesBurned,

        @Schema(description = "The user that performed the workout")
        @NotNull(message = "User cannot be null")
        User user

) {
    public WorkoutRequest(String type, int duration, LocalDateTime date, double caloriesBurned,User user){
        this.type=type;
        this.duration=duration;
        this.date=date;
        this.caloriesBurned=caloriesBurned;
        this.user=user;
}
}