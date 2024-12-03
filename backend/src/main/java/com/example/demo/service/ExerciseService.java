package com.example.demo.service;

import com.example.demo.dto.exercise.ExerciseRequest;
import com.example.demo.dto.exercise.ExerciseResponse;
import com.example.demo.model.Exercise;
import com.example.demo.model.enums.Muscle;
import com.example.demo.repository.ExerciseRepo;
import com.example.demo.utils.mapper.ExerciseMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {
    private final ExerciseRepo exerciseRepository;

    public ExerciseService(ExerciseRepo exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public ExerciseResponse saveExercise(ExerciseRequest exerciseRequest){
        Exercise exercise = new Exercise(exerciseRequest.name(),exerciseRequest.primaryMuscle(),exerciseRequest.secondaryMuscles(),exerciseRequest.equipment(),exerciseRequest.difficulty(),exerciseRequest.instructions());
        return ExerciseMapper.entityToDto(exerciseRepository.save(exercise));
    }

    public void deleteExercise(Long id){
        Exercise exercise = findExerciseById(id);
        exerciseRepository.delete(exercise);
    }

    public Exercise findExerciseById(Long id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found with id: " + id));
    }

    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    public List<ExerciseResponse> getAllExercisesResponse() {
        return ExerciseMapper.entityListToDto(getAllExercises());
    }
}
