package com.example.demo.utils.mapper;

import com.example.demo.dto.meal.MealResponse;
import com.example.demo.dto.workout.WorkoutResponse;
import com.example.demo.dto.workoutPlan.WorkoutPlanResponse;
import com.example.demo.model.Meal;
import com.example.demo.model.Workout;
import com.example.demo.model.WorkoutPlan;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
public final class WorkoutPlanMapper {

    public static WorkoutPlanResponse entityToDto(WorkoutPlan workoutPlan) {
        return new WorkoutPlanResponse(
                workoutPlan.getId(),
                workoutPlan.getName(),
                workoutPlan.getFrequency(),
                workoutPlan.getDateCreated(),
                workoutPlan.getWorkoutDays() != null ? WorkoutDayMapper.entityListToDto(workoutPlan.getWorkoutDays()) : null
        );
    }

    public static List<WorkoutPlanResponse> entityListToDto(List<WorkoutPlan> workoutPlans) {
        return workoutPlans.stream()
                .map(WorkoutPlanMapper::entityToDto)
                .collect(Collectors.toList());
    }
}