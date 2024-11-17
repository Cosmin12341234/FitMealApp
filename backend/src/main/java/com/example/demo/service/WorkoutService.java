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
    public WorkoutResponse save(WorkoutRequest workoutRequest){
        Workout workoutToSave = new Workout(workoutRequest.type(),workoutRequest.duration(),workoutRequest.date(),workoutRequest.caloriesBurned(),workoutRequest.user());
        return WorkoutMapper.entityToDto(workoutRepository.save(workoutToSave));
    }

    @Transactional
    public void deleteWorkout(Long id){
        Workout workout = findById(id);
        workoutRepository.delete(workout);
    }

    @Transactional
    public WorkoutResponse update(Long id, WorkoutRequest workoutRequest) {
        Workout workout = findById(id);
        workout.setType(workoutRequest.type());
        workout.setDuration(workoutRequest.duration());
        workout.setDate(workoutRequest.date());
        workout.setCaloriesBurned(workoutRequest.caloriesBurned());
        return WorkoutMapper.entityToDto(workoutRepository.save(workout));
    }

    public Workout findById(Long id) {
        return workoutRepository.findById(id)
                .orElseThrow(() -> new AuthException.NotFoundException("Workout not found with id: " + id));
    }

    public WorkoutResponse findResponseById(Long id) {
        return WorkoutMapper.entityToDto(findById(id));
    }

    public List<Workout> findAll() {
        return workoutRepository.findAll();
    }

    public List<WorkoutResponse> getAllWorkoutResponses() {
        return WorkoutMapper.entityListToDto(findAll());
    }
}
