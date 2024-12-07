package com.example.demo.service;

import com.example.demo.dto.exercise.ExerciseRequest;
import com.example.demo.dto.exercise.ExerciseResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.exceptions.DeletionException;
import com.example.demo.model.Exercise;
import com.example.demo.model.enums.Equipment;
import com.example.demo.model.enums.Muscle;
import com.example.demo.repository.ExerciseRepo;
import com.example.demo.repository.WorkoutDayRepo;
import com.example.demo.utils.mapper.ExerciseMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ExerciseService {
    private final ExerciseRepo exerciseRepository;
    private final WorkoutDayRepo workoutDayRepo;

    public ExerciseService(ExerciseRepo exerciseRepository, WorkoutDayRepo workoutDayRepo) {
        this.exerciseRepository = exerciseRepository;
        this.workoutDayRepo = workoutDayRepo;
    }

    @Transactional
    public ExerciseResponse saveExercise(ExerciseRequest exerciseRequest) {
        Exercise exercise = new Exercise(exerciseRequest.name(), exerciseRequest.primaryMuscle(), exerciseRequest.secondaryMuscles(), exerciseRequest.equipment(), exerciseRequest.difficulty(), exerciseRequest.instructions());
        return ExerciseMapper.entityToDto(exerciseRepository.save(exercise));
    }

    @Transactional
    public void deleteExercise(Long id) {
        Exercise exercise = findExerciseById(id);

        if (workoutDayRepo.existsByExercisesId(id)) {
            throw new DeletionException(
                    "Cannot delete exercise with ID " + id +
                            " because it is being used in one or more workout plans"
            );
        }

        exerciseRepository.delete(exercise);
    }

    public Exercise findExerciseById(Long id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new AuthException.NotFoundException("Exercise not found with id: " + id));
    }

    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    public List<ExerciseResponse> getAllExercisesResponse() {
        return ExerciseMapper.entityListToDto(getAllExercises());
    }

    public List<Exercise> getExercisesByEquipmentAndMuscle(List<Equipment> equipment, Muscle muscle) {
        List<Exercise> exercises = exerciseRepository.findAll();
        List<Exercise> filteredExercises = new ArrayList<>();

        for (Exercise exercise : exercises) {
            if (equipment.contains(exercise.getEquipment()) &&
                    exercise.getPrimaryMuscle().equals(muscle)) {
                filteredExercises.add(exercise);
            }
        }

        return filteredExercises;
    }

    public List<Exercise> getRandomExercises(List<Exercise> exercises, int count) {
        count = Math.min(count, exercises.size());
        List<Exercise> shuffled = new ArrayList<>(exercises);
        Collections.shuffle(shuffled);
        return shuffled.subList(0, count);
    }
}
