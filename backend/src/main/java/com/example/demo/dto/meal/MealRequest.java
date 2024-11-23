package com.example.demo.dto.meal;

import com.example.demo.model.User;
import com.example.demo.model.enums.Type;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record MealRequest(

        @Schema(description = "The name of the meal")
        @NotBlank(message = "Name cannot be blank")
        @Size(min = 3, max = 64, message = "Name must be between 3 and 64 characters")
        String name,

        @Schema(description = "The type of the meal")
        @NotNull(message = "Type cannot be null")
        Type type,

        @Schema(description = "The calories of the meal")
        @NotNull(message = "Calories cannot be null")
        int calories,

        @Schema(description = "The date of the meal")
        @NotNull(message = "Date cannot be null")
        LocalDate date,

        @Schema(description = "The description of the meal")
        @NotBlank(message = "Description cannot be blank")
        @Size(min = 3, max = 64, message = "Description must be between 3 and 64 characters")
        String description,

        @Schema(description = "The user of the meal")
        @NotNull(message = "User cannot be null")
        User user
) {
    public MealRequest(
            String name,
            Type type,
            int calories,
            LocalDate date,
            String description,
            User user
    ) {
        this.name = name;
        this.type = type;
        this.calories = calories;
        this.date = date;
        this.description = description;
        this.user = user;
    }
}
