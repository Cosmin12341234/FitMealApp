package com.example.demo.service;

import com.example.demo.dto.workout.WorkoutRequest;
import com.example.demo.dto.workout.WorkoutResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.model.Workout;
import com.example.demo.repository.WorkoutRepo;
import com.example.demo.utils.mapper.WorkoutMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {
    private final WorkoutRepo workoutRepository;

    public WorkoutService(WorkoutRepo workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    @Transactional
    public WorkoutResponse createWorkout(WorkoutRequest workoutRequest){
        Workout workoutToSave = new Workout(workoutRequest.type(),workoutRequest.duration(),workoutRequest.date(),workoutRequest.caloriesBurned(),workoutRequest.user());
        return WorkoutMapper.entityToDto(workoutRepository.save(workoutToSave));
    }

    @Transactional
    public void deleteWorkout(Long id){
        Workout workout = findWorkoutById(id);
        workoutRepository.delete(workout);
    }

    @Transactional
    public WorkoutResponse updateWorkout(Long id, WorkoutRequest workoutRequest) {
        Workout workout = findWorkoutById(id);
        workout.setType(workoutRequest.type());
        workout.setDuration(workoutRequest.duration());
        workout.setDate(workoutRequest.date());
        workout.setCaloriesBurned(workoutRequest.caloriesBurned());
        return WorkoutMapper.entityToDto(workoutRepository.save(workout));
    }

    public Workout findWorkoutById(Long id) {
        return workoutRepository.findById(id)
                .orElseThrow(() -> new AuthException.NotFoundException("Workout not found with id: " + id));
    }

    public WorkoutResponse findWorkoutResponseById(Long id) {
        return WorkoutMapper.entityToDto(findWorkoutById(id));
    }

    public List<Workout> getALlWorkouts() {
        return workoutRepository.findAll();
    }

    public List<WorkoutResponse> getAllWorkoutResponses() {
        return WorkoutMapper.entityListToDto(getALlWorkouts());
    }
}
