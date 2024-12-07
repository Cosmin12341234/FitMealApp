package com.example.demo.controller;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.workout.WorkoutRequest;
import com.example.demo.dto.workout.WorkoutResponse;
import com.example.demo.dto.workoutPlan.WorkoutPlanRequest;
import com.example.demo.dto.workoutPlan.WorkoutPlanResponse;
import com.example.demo.service.WorkoutPlanService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/generate")
public class WorkoutPlanController {
    private final WorkoutPlanService workoutPlanService;

    public WorkoutPlanController(WorkoutPlanService workoutPlanService) {
        this.workoutPlanService = workoutPlanService;
    }

    @Operation(summary = "Generate a new workout plan", description = "This endpoint is used to create a new workout plan." +
            "The preferences from the client for the  workout plan to be created are passed in the request body. " +
            "The response body contains the details of the created workout plan.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Workout plan created successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = WorkoutPlanResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PostMapping
    public ResponseEntity<WorkoutPlanResponse> generateWorkoutPlan(@Valid @RequestBody WorkoutPlanRequest workoutPlanRequest) {
        WorkoutPlanResponse createdWorkoutPlan = workoutPlanService.generateWorkoutPlan(workoutPlanRequest);
        return ResponseEntity.ok(createdWorkoutPlan);
    }

    @Operation(summary = "Delete a workout plan", description = "This endpoint is used to delete an existing workout plan.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Workout plan deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "The workout plan with the given id does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @DeleteMapping("/{workoutPlanId}")
    public ResponseEntity<?> deleteWorkoutPlan(@PathVariable("workoutPlanId") Long workoutPlanId) {
        workoutPlanService.deleteWorkoutPlan(workoutPlanId);
        return ResponseEntity.ok().build();
    }
}
