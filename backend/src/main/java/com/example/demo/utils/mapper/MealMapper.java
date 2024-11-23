package com.example.demo.utils.mapper;

import com.example.demo.dto.meal.MealResponse;
import com.example.demo.dto.workout.WorkoutResponse;
import com.example.demo.model.Meal;
import com.example.demo.model.Workout;

import java.util.List;
import java.util.stream.Collectors;

public final class MealMapper {

    public static MealResponse entityToDto(Meal meal) {
        return new MealResponse(
                meal.getId(),
                meal.getName(),
                meal.getType(),
                meal.getCalories(),
                meal.getDate(),
                meal.getDescription()
        );
    }

    public static List<MealResponse> entityListToDto(List<Meal> meals) {
        return meals.stream()
                .map(MealMapper::entityToDto)
                .collect(Collectors.toList());
    }
}