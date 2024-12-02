package com.example.demo.controller;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.meal.MealResponse;
import com.example.demo.dto.user.UserRequest;
import com.example.demo.dto.user.UserResponse;
import com.example.demo.dto.workout.WorkoutResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
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

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@Validated
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Create a new user", description = "This endpoint is used to create a new user." +
            "The details of the user to be created are passed in the request body. " +
            "The response body contains the details of the created user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest userRequest) {
        UserResponse createdUser = userService.save(userRequest);
        return ResponseEntity.ok(createdUser);
    }


    @Operation(summary = "Delete a user", description = "This endpoint is used to delete an existing user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "User deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "The user with the given id does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") Long userId) {
        userService.delete(userId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Update a user", description = "This endpoint is used to update an existing user.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "The user with the given id does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PutMapping("/{userId}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable("userId") Long userId,
                                                   @Valid @RequestBody UserRequest userRequest) {
        UserResponse updatedUser = userService.update(userId, userRequest);
        return ResponseEntity.ok(updatedUser);
    }

    @Operation(summary = "Get user with specified username", description = "This endpoint is used to retrieve a user with " +
            "specified username.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/byUsername/{username}")
    public ResponseEntity<UserResponse> getUserByUsername(@PathVariable("username") String username) {
        UserResponse user = userService.findResponseByUsername(username);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "Get user with specified id", description = "This endpoint is used to retrieve a user with " +
            "specified id.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/byId/{userId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable("userId") Long userId) {
        UserResponse user = userService.findResponseById(userId);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "Get all users", description = "This endpoint is used to retrieve all users.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Users found successfully",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = UserResponse.class)))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUserResponses();
        return ResponseEntity.ok(users);
    }

    @Operation(summary = "Get the age of the user with specified id", description = "This endpoint is used to retrieve the age of a user with a specified id.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Age found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/ageById/{userId}")
    public ResponseEntity<Integer> getAgeById(@PathVariable("userId") Long userId) {
        int age = userService.getAgeById(userId);
        return ResponseEntity.ok(age);
    }


    @Operation(summary = "Get all workouts of a user by username", description = "This endpoint is used to retrieve all workouts of a user by username.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Workouts found successfully",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = WorkoutResponse.class)))}),
            @ApiResponse(responseCode = "404", description = "No workouts found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/workouts/{username}")
    public ResponseEntity<List<WorkoutResponse>> getAllWorkoutsByUsername(@PathVariable("username") String username) {
        List<WorkoutResponse> workouts = userService.getWorkoutsByUsername(username);
        return ResponseEntity.ok(workouts);
    }

    @Operation(summary = "Get all meals of a user by username", description = "This endpoint is used to retrieve all meals of a user by username.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meals found successfully",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = MealResponse.class)))}),
            @ApiResponse(responseCode = "404", description = "No meals found",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/meals/{username}")
    public ResponseEntity<List<MealResponse>> getAllMealsByUsername(@PathVariable("username") String username) {
        List<MealResponse> meals = userService.getMealsByUsername(username);
        return ResponseEntity.ok(meals);
    }

    @Operation(summary = "Get the calories intake by id", description = "This endpoint is used to retrieve the calories intake for a user by id.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Calories found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/caloriesById/{userId}")
    public ResponseEntity<Integer> getCaloriesById(@PathVariable("userId") Long userId) {
        int calories = userService.getTDEEById(userId);
        return ResponseEntity.ok(calories);
    }

    @Operation(summary = "Get the calories intake by username", description = "This endpoint is used to retrieve the calories intake for a user by username.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Calories found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/caloriesByUsername/{username}")
    public ResponseEntity<Integer> getCaloriesByUsername(@PathVariable("username") String username) {
        int calories = userService.getTDEEByUsername(username);
        return ResponseEntity.ok(calories);
    }

    @Operation(summary = "Get the calories consumed by date and username", description = "This endpoint is used to retrieve the calories consumed for a user in a date by username.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Calories found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/caloriesConsumed/{username}")
    public ResponseEntity<Integer> getCaloriesBurnedByDateByUsername(@PathVariable("username") String username,
                                                                     @RequestParam("date") String date) {
        LocalDate d = LocalDate.parse(date);
        int calories = userService.getCaloriesConsumedByDateByUsername(username, d);
        return ResponseEntity.ok(calories);

    }

    @Operation(summary = "Get the calories burned in a interval of dates and username", description = "This endpoint is used to retrieve the calories bruned for a user in a period of time by username.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Calories found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/caloriesBurnedByDates/{username}")
    public ResponseEntity<Map<String,Integer>> getCaloriesBurnedByDateByUsername(@PathVariable("username") String username,
                                                                                 @RequestParam("startDate") String startDate,
                                                                                 @RequestParam("endDate") String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        Map<String,Integer> caloriesBurnedByDate = userService.getCaloriesBurnedByDatesByUsername(username, start, end);
        return ResponseEntity.ok(caloriesBurnedByDate);

    }

    @Operation(summary = "Get the calories consumed in a interval of dates and username", description = "This endpoint is used to retrieve the calories consumed for a user in a period of time by username.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Calories found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/caloriesConsumedByDates/{username}")
    public ResponseEntity<Map<String,Integer>> getCaloriesConsumedByDatesByUsername(@PathVariable("username") String username,
                                                                                 @RequestParam("startDate") String startDate,
                                                                                 @RequestParam("endDate") String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        Map<String,Integer> caloriesConsumedByDate = userService.getCaloriesConsumedByDatesByUsername(username, start, end);
        return ResponseEntity.ok(caloriesConsumedByDate);

    }


}