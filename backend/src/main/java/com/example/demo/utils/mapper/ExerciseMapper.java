package com.example.demo.utils.mapper;

import com.example.demo.dto.exercise.ExerciseResponse;
import com.example.demo.dto.meal.MealResponse;
import com.example.demo.model.Exercise;
import com.example.demo.model.Meal;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
public final class ExerciseMapper {

    public static ExerciseResponse entityToDto(Exercise exercise) {
        return new ExerciseResponse(
                exercise.getId(),
                exercise.getName(),
                exercise.getPrimaryMuscle(),
                exercise.getSecondaryMuscles(),
                exercise.getEquipment(),
                exercise.getDifficulty(),
                exercise.getInstructions()
        );
    }

    public static List<ExerciseResponse> entityListToDto(List<Exercise> exercises) {
        return exercises.stream()
                .map(ExerciseMapper::entityToDto)
                .collect(Collectors.toList());
    }
}
