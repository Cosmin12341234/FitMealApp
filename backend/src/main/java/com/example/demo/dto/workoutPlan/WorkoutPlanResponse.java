package com.example.demo.dto.workoutPlan;

import com.example.demo.dto.workoutDay.WorkoutDayResponse;
import com.example.demo.model.WorkoutDay;
import com.example.demo.model.enums.Difficulty;
import com.example.demo.model.enums.WorkoutGoals;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.util.List;

public record WorkoutPlanResponse(

        @Schema(description = "The id of the workout plan")
        Long id,

        @Schema(description = "The name of the workout plan")
        String name,

        @Schema(description = "The frequency of the workout plan")
        int frequency,

        @Schema(description = "The date of the workout plan")
        LocalDate dateCreated,

        @Schema
        List<WorkoutDayResponse> workoutDays
) {
    public WorkoutPlanResponse(Long id,String name,int frequency,LocalDate dateCreated,List<WorkoutDayResponse> workoutDays) {
        this.id = id;
        this.name = name;
        this.frequency = frequency;
        this.dateCreated = dateCreated;
        this.workoutDays = workoutDays;

    }
}
