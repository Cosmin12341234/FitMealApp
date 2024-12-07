package com.example.demo.utils.mapper;

import com.example.demo.dto.workout.WorkoutResponse;
import com.example.demo.dto.workoutDay.WorkoutDayResponse;
import com.example.demo.model.Workout;
import com.example.demo.model.WorkoutDay;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
public final class WorkoutDayMapper {
    public static WorkoutDayResponse entityToDto(WorkoutDay workoutDay) {
        return new WorkoutDayResponse(
                workoutDay.getId(),
                workoutDay.getDayName(),
                workoutDay.getExercises() != null ? ExerciseMapper.entityListToDto(workoutDay.getExercises()) : null
        );
    }

    public static List<WorkoutDayResponse> entityListToDto(List<WorkoutDay> workoutsDays) {
        return workoutsDays.stream()
                .map(WorkoutDayMapper::entityToDto)
                .collect(Collectors.toList());
    }
}
