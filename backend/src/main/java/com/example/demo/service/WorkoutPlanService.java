package com.example.demo.service;

import com.example.demo.dto.workout.WorkoutRequest;
import com.example.demo.dto.workoutPlan.WorkoutPlanRequest;
import com.example.demo.dto.workoutPlan.WorkoutPlanResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.model.*;
import com.example.demo.model.enums.*;
import com.example.demo.repository.WorkoutPlanRepo;
import com.example.demo.utils.mapper.WorkoutPlanMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class WorkoutPlanService {

    private final WorkoutPlanRepo workoutPlanRepository;
    private final ExerciseService exerciseService;

    public WorkoutPlanService(WorkoutPlanRepo workoutPlanRepository, ExerciseService exerciseService) {
        this.workoutPlanRepository = workoutPlanRepository;
        this.exerciseService = exerciseService;
    }

    @Transactional
    public WorkoutPlanResponse generateWorkoutPlan(WorkoutPlanRequest workoutPlanRequest) {
        WorkoutPlan workoutPlan = new WorkoutPlan(
                workoutPlanRequest.user(),
                workoutPlanRequest.name(),
                workoutPlanRequest.frequency(),
                workoutPlanRequest.experience(),
                workoutPlanRequest.goal(),
                workoutPlanRequest.gender(),
                LocalDate.now(),
                workoutPlanRequest.equipment(),
                null
        );

        List<WorkoutDay> workoutDays = createWorkout(workoutPlan);
        workoutPlan.setWorkoutDays(workoutDays);

        return WorkoutPlanMapper.entityToDto(workoutPlanRepository.save(workoutPlan));
    }

    @Transactional
    public void deleteWorkoutPlan(Long id){
        WorkoutPlan workoutPlan = findWorkoutPlanById(id);
        workoutPlanRepository.delete(workoutPlan);
    }

    private WorkoutPlan findWorkoutPlanById(Long id) {
        return workoutPlanRepository.findById(id)
                .orElseThrow(() -> new AuthException.NotFoundException("WorkoutPlan not found with id: " + id));
    }

    public List<WorkoutDay> createWorkout(WorkoutPlan workoutPlan) {
        return fullBodyWorkoutOneDay(workoutPlan);
    }


    public List<Exercise> getExercisesForMuscleGroup(WorkoutPlan workoutPlan, Muscle muscle) {
        return exerciseService.getExercisesByEquipmentAndMuscle(workoutPlan.getEquipment(), muscle);
    }

    public List<WorkoutDay> fullBodyWorkoutOneDay(WorkoutPlan workoutPlan){
        List<Exercise> fullBodyExercises = new ArrayList<>();
        List<Exercise> quadsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.QUADS);
        List<Exercise> randomQuadsExercises = exerciseService.getRandomExercises(quadsExercises, 1);

        List<Exercise> chestExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.CHEST);
        List<Exercise> randomChestExercises = exerciseService.getRandomExercises(chestExercises, 1);

        List<Exercise> backExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.LATS);
        List<Exercise> randomBackExercises = exerciseService.getRandomExercises(backExercises, 1);

        List<Exercise> shouldersExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.LATERAL_DELTOID);
        List<Exercise> randomShouldersExercises = exerciseService.getRandomExercises(shouldersExercises, 1);

        List<Exercise> tricepsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.TRICEPS);
        List<Exercise> randomTricepsExercises = exerciseService.getRandomExercises(tricepsExercises, 1);

        List<Exercise> bicepsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.BICEPS);
        List<Exercise> randomBicepsExercises = exerciseService.getRandomExercises(bicepsExercises, 1);

        fullBodyExercises.addAll(randomQuadsExercises);
        fullBodyExercises.addAll(randomChestExercises);
        fullBodyExercises.addAll(randomBackExercises);
        fullBodyExercises.addAll(randomShouldersExercises);
        fullBodyExercises.addAll(randomTricepsExercises);
        fullBodyExercises.addAll(randomBicepsExercises);

        return List.of(
                new WorkoutDay(
                        "Full Body Day",
                        workoutPlan,
                        fullBodyExercises
                )
        );

    }

    public List<WorkoutDay> broSplitFiveDays(WorkoutPlan workoutPlan) {
        List<Exercise> legsExercises = new ArrayList<>();
        List<Exercise> quadsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.QUADS);
        List<Exercise> randomQuadsExercises = exerciseService.getRandomExercises(quadsExercises, 2);

        List<Exercise> hamstringsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.HAMSTRINGS);
        List<Exercise> randomHamstringsExercises = exerciseService.getRandomExercises(hamstringsExercises, 2);

        List<Exercise> calvesExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.CALVES);
        List<Exercise> randomCalvessExercises = exerciseService.getRandomExercises(calvesExercises, 1);

        legsExercises.addAll(randomQuadsExercises);
        legsExercises.addAll(randomHamstringsExercises);
        legsExercises.addAll(randomCalvessExercises);

        List<Exercise> chestExercises = new ArrayList<>();
        List<Exercise> midChestExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.MID_AND_LOWER_CHEST);
        List<Exercise> randomMidChestExercises = exerciseService.getRandomExercises(midChestExercises, 3);

        List<Exercise> upperChesttExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.UPPER_PECTORALIS);
        List<Exercise> randomUpperChestExercises = exerciseService.getRandomExercises(upperChesttExercises, 2);

        chestExercises.addAll(randomMidChestExercises);
        chestExercises.addAll(randomUpperChestExercises);

        List<Exercise> backExercises = new ArrayList<>();
        List<Exercise> latsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.LATS);
        List<Exercise> randomLatsExercises = exerciseService.getRandomExercises(latsExercises, 3);

        List<Exercise> lowerBackExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.LOWER_BACK);
        List<Exercise> randomLowerBackExercises = exerciseService.getRandomExercises(lowerBackExercises, 2);

        backExercises.addAll(randomLatsExercises);
        backExercises.addAll(randomLowerBackExercises);

        List<Exercise> shouldersExercises = new ArrayList<>();
        List<Exercise> lateralDeltoidExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.LATERAL_DELTOID);
        List<Exercise> randomLateralDeltoidExercises = exerciseService.getRandomExercises(lateralDeltoidExercises, 2);

        List<Exercise> anteriorDeltoidExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.ANTERIOR_DELTOID);
        List<Exercise> randomAnteriorDeltoidExercises = exerciseService.getRandomExercises(anteriorDeltoidExercises, 1);

        List<Exercise> posteriorDeltoidExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.POSTERIOR_DELTOID);
        List<Exercise> randomPosteriorDeltoidExercises = exerciseService.getRandomExercises(posteriorDeltoidExercises, 2);

        shouldersExercises.addAll(randomLateralDeltoidExercises);
        shouldersExercises.addAll(randomAnteriorDeltoidExercises);
        shouldersExercises.addAll(randomPosteriorDeltoidExercises);

        List<Exercise> armExercises = new ArrayList<>();
        List<Exercise> bicepsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.BICEPS);
        List<Exercise> randomBicepsExercises = exerciseService.getRandomExercises(bicepsExercises, 2);

        List<Exercise> tricepsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.TRICEPS);
        List<Exercise> randomTricepsExercises = exerciseService.getRandomExercises(tricepsExercises, 3);

        armExercises.addAll(randomBicepsExercises);
        armExercises.addAll(randomTricepsExercises);

        return List.of(
                new WorkoutDay(
                        "Chest Day",
                        workoutPlan,
                        chestExercises
                ),
                new WorkoutDay(
                        "Back Day",
                        workoutPlan,
                        backExercises
                ),
                new WorkoutDay(
                        "Legs Day",
                        workoutPlan,
                        legsExercises
                ),
                new WorkoutDay(
                        "Shoulders Day",
                        workoutPlan,
                        shouldersExercises
                ),
                new WorkoutDay(
                        "Arms Day",
                        workoutPlan,
                        armExercises
                )

        );
    }
}

