package com.example.demo.controller;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.meal.MealRequest;
import com.example.demo.dto.meal.MealResponse;
import com.example.demo.dto.workout.WorkoutRequest;
import com.example.demo.dto.workout.WorkoutResponse;
import com.example.demo.service.MealService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/meals")
@Validated
public class MealController {

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @Operation(summary = "Create a new meal", description = "This endpoint is used to create a new meal." +
            "The details of the meal to be created are passed in the request body. " +
            "The response body contains the details of the created meal.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Meal created successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = MealResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PostMapping
    public ResponseEntity<MealResponse> save(@Valid @RequestBody MealRequest mealRequest) {
        MealResponse createdMeal = mealService.saveMeal(mealRequest);
        return ResponseEntity.ok(createdMeal);
    }

    @Operation(summary = "Delete a meal", description = "This endpoint is used to delete an existing meal.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Meal deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "The meal with the given id does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @DeleteMapping("/{mealId}")
    public ResponseEntity<?> deleteMeal(@PathVariable("mealId") Long mealId) {
        mealService.deleteMeal(mealId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Update a meal", description = "This endpoint is used to update an existing meal." +
            "The details of the meal to be updated are passed in the request body. " +
            "The response body contains the details of the updated meal.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meal updated successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = MealResponse.class))}),
            @ApiResponse(responseCode = "404", description = "The meal with the given id does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PutMapping("/{mealId}")
    public ResponseEntity<MealResponse> updateMeal(@PathVariable("mealId") Long mealId,
                                                         @Valid @RequestBody MealRequest mealRequest) {
        MealResponse updatedMeal = mealService.updateMeal(mealId, mealRequest);
        return ResponseEntity.ok(updatedMeal);
    }

    @Operation(summary = "Get a meal by id", description = "This endpoint is used to get details of a meal by id.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meal found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = MealResponse.class))}),
            @ApiResponse(responseCode = "404", description = "The meal with the given id does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/{mealId}")
    public ResponseEntity<MealResponse> getMealById(@PathVariable("mealId") Long mealId) {
        MealResponse mealResponse = mealService.findMealResponseById(mealId);
        return ResponseEntity.ok(mealResponse);
    }

    @Operation(summary = "Get all meals", description = "This endpoint is used to get details of all meals.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meals found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = MealResponse.class))}),
            @ApiResponse(responseCode = "404", description = "No meals found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping
    public ResponseEntity<List<MealResponse>> getAllMeals() {
        List<MealResponse> mealsResponses = mealService.getAllMealsResponse();
        return ResponseEntity.ok(mealsResponses);
    }
}
