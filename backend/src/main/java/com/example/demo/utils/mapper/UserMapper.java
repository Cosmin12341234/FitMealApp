package com.example.demo.utils.mapper;

import com.example.demo.dto.user.UserResponse;
import com.example.demo.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public final class UserMapper {
    public static UserResponse entityToDto(User user) {
        return new UserResponse(
                user.getId(),
                user.getRole(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getDob(),
                user.getGender(),
                user.getHeight(),
                user.getWeight(),
                user.getFitnessGoals(),
                user.getActivityLevel(),
                user.getWorkouts() != null ? WorkoutMapper.entityListToDto(user.getWorkouts()) : null,
                user.getMeals() != null ? MealMapper.entityListToDto(user.getMeals()) : null,
                user.getWorkoutPlans() != null ? WorkoutPlanMapper.entityListToDto(user.getWorkoutPlans()) : null
        );
    }

    public static List<UserResponse> entityListToDto(List<User> users) {
        return users.stream()
                .map(UserMapper::entityToDto)
                .collect(Collectors.toList());
    }
}