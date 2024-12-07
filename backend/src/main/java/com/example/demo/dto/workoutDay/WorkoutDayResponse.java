package com.example.demo.dto.workoutDay;

import com.example.demo.dto.exercise.ExerciseResponse;
import com.example.demo.model.Exercise;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record WorkoutDayResponse(
        @Schema(description = "The id of the workout day")
        Long id,

        @Schema(description = "This will be the key of the map from the workout plan,eg: Day 1:List<Exercise>,this will be Day 1")
        String dayName,

        @Schema(description = "These will be the values of the map from the workout plan,eg: Day 1:List<Exercise>,this will be List<Exercise>")
        List<ExerciseResponse> exercises
) {
    public WorkoutDayResponse(
            Long id,
            String dayName,
            List<ExerciseResponse> exercises
    ) {
        this.id = id;
        this.dayName = dayName;
        this.exercises = exercises;
    }
}
