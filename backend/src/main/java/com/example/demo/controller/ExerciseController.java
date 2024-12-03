package com.example.demo.controller;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.exercise.ExerciseRequest;
import com.example.demo.dto.exercise.ExerciseResponse;
import com.example.demo.dto.meal.MealRequest;
import com.example.demo.dto.meal.MealResponse;
import com.example.demo.service.ExerciseService;
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
@Validated
@RequestMapping("/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @Operation(summary = "Create a new exercise", description = "This endpoint is used to create a new exercise." +
            "The details of the exercise to be created are passed in the request body. " +
            "The response body contains the details of the created exercise.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Exercise created successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExerciseResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PostMapping
    public ResponseEntity<ExerciseResponse> saveExercise(@Valid @RequestBody ExerciseRequest exerciseRequest) {
        ExerciseResponse createdExercise = exerciseService.saveExercise(exerciseRequest);
        return ResponseEntity.ok(createdExercise);
    }

    @Operation(summary = "Delete a exercise", description = "This endpoint is used to delete an existing exercise.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Exercise deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "The exercise with the given id does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @DeleteMapping("/{exerciseId}")
    public ResponseEntity<?> deleteExercise(@PathVariable("exerciseId") Long exerciseId) {
        exerciseService.deleteExercise(exerciseId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Get all exercises", description = "This endpoint is used to get details of all exercises.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Exercises found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ExerciseResponse.class))}),
            @ApiResponse(responseCode = "404", description = "No exercises found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping
    public ResponseEntity<List<ExerciseResponse>> getAllExercises() {
        List<ExerciseResponse> exercisesResponses = exerciseService.getAllExercisesResponse();
        return ResponseEntity.ok(exercisesResponses);
    }
}
