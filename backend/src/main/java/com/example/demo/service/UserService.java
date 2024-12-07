package com.example.demo.service;

import com.example.demo.dto.meal.MealResponse;
import com.example.demo.dto.user.UserRequest;
import com.example.demo.dto.user.UserResponse;
import com.example.demo.dto.workout.WorkoutResponse;
import com.example.demo.dto.workoutPlan.WorkoutPlanResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.model.Meal;
import com.example.demo.model.User;
import com.example.demo.model.Workout;
import com.example.demo.model.enums.ActivityLevel;
import com.example.demo.model.enums.Gender;
import com.example.demo.model.enums.Goals;
import com.example.demo.repository.UserRepo;
import com.example.demo.utils.mapper.MealMapper;
import com.example.demo.utils.mapper.UserMapper;
import com.example.demo.utils.mapper.WorkoutMapper;
import com.example.demo.utils.mapper.WorkoutPlanMapper;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepository, PasswordEncoder passwordEncoder) {  // Inject it
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse save(UserRequest userRequest) {
        User userToSave = new User(
                userRequest.role(),
                userRequest.username(),
                userRequest.email(),
                passwordEncoder.encode(userRequest.password()),  // Encode password here
                userRequest.firstName(),
                userRequest.lastName(),
                userRequest.dob(),
                userRequest.gender(),
                userRequest.height(),
                userRequest.weight(),
                userRequest.fitnessGoals(),
                userRequest.activityLevel()
        );
        return UserMapper.entityToDto(userRepository.save(userToSave));
    }

    @Transactional
    public void delete(Long id){
        User user = findById(id);
        userRepository.delete(user);
    }

    @Transactional
    public UserResponse update(Long id, UserRequest userRequest) {
        User user = findById(id);
        user.setRole(userRequest.role());
        user.setUsername(userRequest.username());
        user.setEmail(userRequest.email());
        if (userRequest.password() != null && !userRequest.password().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userRequest.password()));
        }
        user.setFirstName(userRequest.firstName());
        user.setLastName(userRequest.lastName());
        user.setDob(userRequest.dob());
        user.setGender(userRequest.gender());
        user.setHeight(userRequest.height());
        user.setWeight(userRequest.weight());
        user.setFitnessGoals(userRequest.fitnessGoals());
        user.setActivityLevel(userRequest.activityLevel());
        return UserMapper.entityToDto(userRepository.save(user));
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new AuthException.NotFoundException("User not found with id: " + id));
    }

    public UserResponse findResponseById(Long id) {
        return UserMapper.entityToDto(findById(id));
    }


    public UserResponse findResponseByUsername(String username) {
        return UserMapper.entityToDto(findByUsername(username));
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new AuthException.NotFoundException("User not found with username: " + username));
    }

    public List<UserResponse> getAllUserResponses() {
        return UserMapper.entityListToDto(getAllUsers());
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean checkIfUsernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public int getAgeById(Long id) {
        User user = findById(id);
        LocalDate bod = user.getDob();
        return Period.between(bod, LocalDate.now()).getYears();
    }

    public List<WorkoutResponse> getWorkoutsByUsername(String username) {
        User user = findByUsername(username);
        return WorkoutMapper.entityListToDto(user.getWorkouts());
    }

    public List<MealResponse> getMealsByUsername(String username) {
        User user = findByUsername(username);
        return MealMapper.entityListToDto(user.getMeals());
    }

    public List<WorkoutPlanResponse> getWorkoutsGeneratedByUsername(String username) {
        User user = findByUsername(username);
        return WorkoutPlanMapper.entityListToDto(user.getWorkoutPlans());
    }

    public int getBMRById(Long id) {
        User user = findById(id);
        double bmr = 10*user.getWeight() + 6.25*user.getHeight() - 5*getAgeById(id);
        if (user.getGender().equals(Gender.MALE)) {
            bmr += 5;
        } else {
            bmr -= 161;
        }
        return (int) bmr;
    }


    public int getTDEEById(Long id) {
        User user = findById(id);
        double bmrUser = getBMRById(id);
        if(user.getActivityLevel().equals(ActivityLevel.SEDENTARY)) {
             bmrUser=bmrUser * 1.2;
        } else if(user.getActivityLevel().equals(ActivityLevel.LIGHTLY_ACTIVE)) {
            bmrUser=bmrUser * 1.375;
        } else if(user.getActivityLevel().equals(ActivityLevel.MODERATELY_ACTIVE)) {
            bmrUser=bmrUser * 1.55;
        } else if(user.getActivityLevel().equals(ActivityLevel.VERY_ACTIVE)) {
            bmrUser=bmrUser * 1.725;
        } else {
            bmrUser=bmrUser * 1.9;
        }
        if(user.getFitnessGoals().equals(Goals.LOSE))
        {
            bmrUser=bmrUser-500;
        }
        else if(user.getFitnessGoals().equals(Goals.GAIN))
        {
            bmrUser=bmrUser+500;
        }
        return (int) bmrUser;
    }

    public int getTDEEByUsername(String username){
        User user = findByUsername(username);
        int tdeeUser = getTDEEById(user.getId());
        return tdeeUser;

    }

    public Map<String,Integer> getCaloriesBurnedByDatesByUsername(String username,LocalDate startDate, LocalDate endDate){
        User user = findByUsername(username);
        List<Workout> workouts = user.getWorkouts();
        Map<String, Integer> caloriesBurnedByDate = new HashMap<>();

        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)){
            caloriesBurnedByDate.put(currentDate.toString(),0);
            currentDate = currentDate.plusDays(1);
        }

        for(Workout workout:workouts){
            LocalDate workoutDate = workout.getDate();
            if(workoutDate.isEqual(startDate) || workoutDate.isAfter(startDate) && (workoutDate.isEqual(endDate) || workoutDate.isBefore(endDate))){
                String dateKey = workoutDate.toString();
                int currentCalories = caloriesBurnedByDate.getOrDefault(dateKey, 0);
                int workoutCalories = (int)workout.getCaloriesBurned();
                caloriesBurnedByDate.put(dateKey, currentCalories + workoutCalories);
            }
        }
        return caloriesBurnedByDate;
    }

    public Map<String,Integer> getCaloriesConsumedByDatesByUsername(String username,LocalDate startDate, LocalDate endDate){
        User user = findByUsername(username);
        List<Meal> meals = user.getMeals();
        Map<String, Integer> caloriesConsumedByDate = new HashMap<>();

        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)){
            caloriesConsumedByDate.put(currentDate.toString(),0);
            currentDate = currentDate.plusDays(1);
        }

        for(Meal meal:meals){
            LocalDate mealDate = meal.getDate();
            if(mealDate.isEqual(startDate) || mealDate.isAfter(startDate) && (mealDate.isEqual(endDate) || mealDate.isBefore(endDate))){
                String dateKey = mealDate.toString();
                int currentCalories = caloriesConsumedByDate.getOrDefault(dateKey, 0);
                int mealCalories = (int)meal.getCalories();
                caloriesConsumedByDate.put(dateKey, currentCalories + mealCalories);
            }
        }
        return caloriesConsumedByDate;
    }

    public int getCaloriesConsumedByDateByUsername(String username, LocalDate date) {
        User user = findByUsername(username);
        List<Meal> meals = user.getMeals();
        int caloriesConsumed = 0;
        for (Meal meal : meals) {
            if (meal.getDate().isEqual(date)) {
                caloriesConsumed += meal.getCalories();
            }
        }
        return caloriesConsumed;
    }
}
