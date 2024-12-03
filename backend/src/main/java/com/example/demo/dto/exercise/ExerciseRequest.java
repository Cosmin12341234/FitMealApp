package com.example.demo.dto.exercise;

import com.example.demo.model.enums.Difficulty;
import com.example.demo.model.enums.Equipment;
import com.example.demo.model.enums.Muscle;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ExerciseRequest(

        @Schema(description = "The name of the exercise")
        @NotBlank(message = "Name cannot be blank")
        @Size(min = 3, max = 64, message = "Name must be between 3 and 64 characters")
        String name,

        @Schema(description = "The primary muscle of the exercise")
        @NotNull(message = "Primary muscle cannot be blank")
        Muscle primaryMuscle,

        @Schema(description = "The secondary muscles of the exercise")
        @NotNull(message = "Secondary muscles cannot be blank")
        List<Muscle> secondaryMuscles,

        @Schema(description = "The equipment of the exercise")
        @NotNull(message = "Equipment cannot be blank")
        Equipment equipment,

        @Schema(description = "The difficulty of the exercise")
        @NotNull(message = "Difficulty cannot be blank")
        Difficulty difficulty,

        @Schema(description = "The instructions of the exercise")
        @NotBlank(message = "Instructions cannot be blank")
        @Size(min = 3, max = 256, message = "Instructions must be between 3 and 256 characters")
        String instructions

) {
    public ExerciseRequest(
            String name,
            Muscle primaryMuscle,
            List<Muscle> secondaryMuscles,
            Equipment equipment,
            Difficulty difficulty,
            String instructions
    ) {
        this.name = name;
        this.primaryMuscle = primaryMuscle;
        this.secondaryMuscles = secondaryMuscles;
        this.equipment = equipment;
        this.difficulty = difficulty;
        this.instructions = instructions;
    }
}
