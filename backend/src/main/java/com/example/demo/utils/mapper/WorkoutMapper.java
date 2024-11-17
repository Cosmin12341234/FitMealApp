package com.example.demo.utils.mapper;

import com.example.demo.dto.workout.WorkoutResponse;
import com.example.demo.model.Workout;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public final class WorkoutMapper {

    public static WorkoutResponse entityToDto(Workout workout) {
        return new WorkoutResponse(
                workout.getId(),
                workout.getType(),
                workout.getDuration(),
                workout.getDate(),
                workout.getCaloriesBurned()
        );
    }

    public static List<WorkoutResponse> entityListToDto(List<Workout> workouts) {
        return workouts.stream()
                .map(WorkoutMapper::entityToDto)
                .collect(Collectors.toList());
    }
}