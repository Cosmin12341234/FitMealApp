package com.example.demo.dto.exercise;

import com.example.demo.model.enums.Difficulty;
import com.example.demo.model.enums.Equipment;
import com.example.demo.model.enums.Muscle;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record ExerciseResponse(

        @Schema(description = "The id of the exercise")
        Long id,

        @Schema(description = "The name of the exercise")
        String name,

        @Schema(description = "The primary muscle of the exercise")
        Muscle primaryMuscle,

        @Schema(description = "The secondary muscles of the exercise")
        List<Muscle> secondaryMuscles,

        @Schema(description = "The equipment of the exercise")
        Equipment equipment,

        @Schema(description = "The difficulty of the exercise")
        Difficulty difficulty,

        @Schema(description = "The instructions of the exercise")
        String instructions


) {
    public ExerciseResponse(
            Long id,
            String name,
            Muscle primaryMuscle,
            List<Muscle> secondaryMuscles,
            Equipment equipment,
            Difficulty difficulty,
            String instructions
    ) {
        this.id = id;
        this.name = name;
        this.primaryMuscle = primaryMuscle;
        this.secondaryMuscles = secondaryMuscles;
        this.equipment = equipment;
        this.difficulty = difficulty;
        this.instructions = instructions;
    }
}
