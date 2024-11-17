package com.example.demo.dto.workout;

import com.example.demo.model.User;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

public record WorkoutResponse(

        @Schema(description = "The id of the workout")
        Long id,

        @Schema(description = "The type of the workout")
        String type,

        @Schema(description = "The duration of the workout in minutes")
        int duration,

        @Schema(description = "The date and time of the workout")
        LocalDateTime date,

        @Schema(description = "The calories burned during the workout")
        double caloriesBurned

) {
    public WorkoutResponse(
            Long id,
            String type,
            int duration,
            LocalDateTime date,
            double caloriesBurned
    ) {
        this.id = id;
        this.type = type;
        this.duration = duration;
        this.date = date;
        this.caloriesBurned = caloriesBurned;
    }
}