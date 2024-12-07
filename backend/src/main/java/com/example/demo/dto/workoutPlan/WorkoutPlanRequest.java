package com.example.demo.dto.workoutPlan;

import com.example.demo.model.User;
import com.example.demo.model.enums.*;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record WorkoutPlanRequest(

        @NotNull(message = "User cannot be null")
        @Schema(description = "The user of the workout plan")
        User user,

        @NotBlank(message = "Name cannot be blank")
        @Schema(description = "The name of the workout plan")
        String name,

        @NotNull(message = "Frequency cannot be null")
        @Schema(description = "The frequency of the workout plan")
        int frequency,

        @NotNull(message = "Experience cannot be null")
        @Schema(description = "The experience of the workout plan")
        Difficulty experience,

        @NotNull(message = "Goal cannot be null")
        @Schema(description = "The goal of the workout plan")
        WorkoutGoals goal,

        @NotNull(message = "The gender of the workout plan cannot be null")
        @Schema(description = "The gender of the workout plan")
        Gender gender,

        @NotNull(message = "Date equipment cannot be null")
        @Schema(description = "The equipment for the workout plan")
        List<Equipment> equipment


) {
    public WorkoutPlanRequest(User user, String name, int frequency, Difficulty experience, WorkoutGoals goal,Gender gender, List<Equipment> equipment) {
        this.user = user;
        this.name = name;
        this.frequency = frequency;
        this.experience = experience;
        this.goal = goal;
        this.gender=gender;
        this.equipment = equipment;
}}
