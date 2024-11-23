package com.example.demo.service;

import com.example.demo.dto.meal.MealResponse;
import com.example.demo.dto.user.UserRequest;
import com.example.demo.dto.user.UserResponse;
import com.example.demo.dto.workout.WorkoutResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;
import com.example.demo.utils.mapper.MealMapper;
import com.example.demo.utils.mapper.UserMapper;
import com.example.demo.utils.mapper.WorkoutMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class UserService {

    private final UserRepo userRepository;

    public UserService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserResponse save(UserRequest userRequest){
        User userToSave = new User(userRequest.role(),userRequest.username(),userRequest.email(),userRequest.password(),
                userRequest.firstName(),userRequest.lastName(),userRequest.dob(),userRequest.gender(),userRequest.height(),userRequest.weight(),userRequest.fitnessGoals(),userRequest.activityLevel());
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
        user.setPassword(userRequest.password());
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

}
