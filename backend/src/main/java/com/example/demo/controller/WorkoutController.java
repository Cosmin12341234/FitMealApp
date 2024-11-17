package com.example.demo.controller;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.workout.WorkoutRequest;
import com.example.demo.dto.workout.WorkoutResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.service.WorkoutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/workouts")
public class WorkoutController {

    private final WorkoutService workoutService;

    @Autowired
    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @Operation(summary = "Create a new workout", description = "This endpoint is used to create a new workout." +
            "The details of the workout to be created are passed in the request body. " +
            "The response body contains the details of the created workout.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Workout created successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = WorkoutResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PostMapping
    public ResponseEntity<WorkoutResponse> createWorkout(@Valid @RequestBody WorkoutRequest workoutRequest) {
        WorkoutResponse createdWorkout = workoutService.save(workoutRequest);
        return ResponseEntity.ok(createdWorkout);
    }

    @Operation(summary = "Delete a workout", description = "This endpoint is used to delete an existing workout.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Workout deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "The workout with the given id does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @DeleteMapping("/{workoutId}")
    public ResponseEntity<?> deleteUser(@PathVariable("workoutId") Long workoutId) {
        workoutService.deleteWorkout(workoutId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Update a workout", description = "This endpoint is used to update an existing workout." +
            "The details of the workout to be updated are passed in the request body. " +
            "The response body contains the details of the updated workout.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Workout updated successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = WorkoutResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "The workout with the given id does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PutMapping("/{workoutId}")
    public ResponseEntity<WorkoutResponse> updateWorkout(@PathVariable("workoutId") Long workoutId,
                                                         @Valid @RequestBody WorkoutRequest workoutRequest) {
        WorkoutResponse updatedWorkout = workoutService.update(workoutId, workoutRequest);
        return ResponseEntity.ok(updatedWorkout);
    }

    @Operation(summary = "Get a workout by id", description = "This endpoint is used to get details of a workout by id.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Workout found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = WorkoutResponse.class))}),
            @ApiResponse(responseCode = "404", description = "The workout with the given id does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/{workoutId}")
    public ResponseEntity<WorkoutResponse> getWorkoutById(@PathVariable("workoutId") Long workoutId) {
        WorkoutResponse workoutResponse = workoutService.findResponseById(workoutId);
        return ResponseEntity.ok(workoutResponse);
    }

    @Operation(summary = "Get all workouts", description = "This endpoint is used to get details of all workouts.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Workouts found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = WorkoutResponse.class))}),
            @ApiResponse(responseCode = "404", description = "No workouts found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping
    public ResponseEntity<List<WorkoutResponse>> getAllWorkouts() {
        List<WorkoutResponse> workoutResponses = workoutService.getAllWorkoutResponses();
        return ResponseEntity.ok(workoutResponses);
    }
}
