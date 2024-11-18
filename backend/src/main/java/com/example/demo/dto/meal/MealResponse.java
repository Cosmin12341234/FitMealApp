package com.example.demo.dto.meal;

import com.example.demo.model.enums.Type;
import io.swagger.v3.oas.annotations.media.Schema;

public record MealResponse(

        @Schema(description = "The id of the meal")
        Long id,

        @Schema(description = "The name of the meal")
        String name,

        @Schema(description = "The type of the meal")
        Type type,

        @Schema(description = "The calories of the meal")
        int calories,

        @Schema(description = "The description of the meal")
        String description
) {
    public MealResponse(
            Long id,
            String name,
            Type type,
            int calories,
            String description
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.calories = calories;
        this.description = description;
    }
}