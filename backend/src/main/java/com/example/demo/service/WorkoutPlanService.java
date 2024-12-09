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

        if (workoutPlan.getFrequency() == 1){
            if (workoutPlan.getGender().equals(Gender.MALE)){
                return fullBodyWorkoutOneDayMale(workoutPlan);
            } else {
                return fullBodyWorkoutOneDayFemaile(workoutPlan);
            }
        }
        else if(workoutPlan.getFrequency()==2){
            if(workoutPlan.getGender().equals(Gender.MALE)){
                return upperLowerTwoDaysMale(workoutPlan);
            } else {
                return upperLowerTwoDaysFemale(workoutPlan);
            }
        }
        else if(workoutPlan.getFrequency()==3){
            if (workoutPlan.getGender().equals(Gender.MALE)){
                return pushPullLegsThreeDaysMale(workoutPlan);
            } else {
                return threeDaysFemale(workoutPlan);
            }
        }
        else return broSplitFiveDays(workoutPlan);
    }

    public List<Exercise> getExercisesForMuscleGroup(WorkoutPlan workoutPlan, Muscle muscle) {
        return exerciseService.getExercisesByEquipmentAndMuscle(workoutPlan.getEquipment(), muscle);
    }

    public List<WorkoutDay> fullBodyWorkoutOneDayFemaile(WorkoutPlan workoutPlan) {
        List<Exercise> fullBodyExercises = new ArrayList<>();
        List<Exercise> quadsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.QUADS);
        List<Exercise> randomQuadsExercises = exerciseService.getRandomExercises(quadsExercises, 1);

        List<Exercise> hamstringsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.HAMSTRINGS);
        List<Exercise> randomHamstringsExercises = exerciseService.getRandomExercises(hamstringsExercises, 1);

        List<Exercise> glutesExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.GLUTES);
        List<Exercise> randomGlutesExercises = exerciseService.getRandomExercises(glutesExercises, 1);

        List<Exercise> chestExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.CHEST);
        List<Exercise> randomChestExercises = exerciseService.getRandomExercises(chestExercises, 1);

        List<Exercise> backExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.LATS);
        List<Exercise> randomBackExercises = exerciseService.getRandomExercises(backExercises, 1);

        List<Exercise> shouldersExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.LATERAL_DELTOID);
        List<Exercise> randomShouldersExercises = exerciseService.getRandomExercises(shouldersExercises, 1);

        fullBodyExercises.addAll(randomQuadsExercises);
        fullBodyExercises.addAll(randomHamstringsExercises);
        fullBodyExercises.addAll(randomGlutesExercises);
        fullBodyExercises.addAll(randomChestExercises);
        fullBodyExercises.addAll(randomBackExercises);
        fullBodyExercises.addAll(randomShouldersExercises);

        return List.of(
                new WorkoutDay(
                        "Full Body Day",
                        workoutPlan,
                        fullBodyExercises
                )
        );

    }

    public List<WorkoutDay> fullBodyWorkoutOneDayMale(WorkoutPlan workoutPlan){
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

    public List<WorkoutDay> upperLowerTwoDaysMale(WorkoutPlan workoutPlan){
        List<Exercise> upperBodyExercises = new ArrayList<>();
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

        upperBodyExercises.addAll(randomChestExercises);
        upperBodyExercises.addAll(randomBackExercises);
        upperBodyExercises.addAll(randomShouldersExercises);
        upperBodyExercises.addAll(randomTricepsExercises);
        upperBodyExercises.addAll(randomBicepsExercises);

        List<Exercise> lowerBodyExercises = new ArrayList<>();
        List<Exercise> quadsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.QUADS);
        List<Exercise> randomQuadsExercises = exerciseService.getRandomExercises(quadsExercises, 1);

        List<Exercise> hamstringsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.HAMSTRINGS);
        List<Exercise> randomHamstringsExercises = exerciseService.getRandomExercises(hamstringsExercises, 1);

        List<Exercise> calvesExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.CALVES);
        List<Exercise> randomCalvessExercises = exerciseService.getRandomExercises(calvesExercises, 1);

        List<Exercise> innerThighExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.INNER_THIGH);
        List<Exercise> randomInnerTightExercises = exerciseService.getRandomExercises(innerThighExercises, 1);

        List<Exercise> outerTightsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.OUTER_QUADRICEP);
        List<Exercise> randomOuterTightExercises = exerciseService.getRandomExercises(outerTightsExercises, 1);

        lowerBodyExercises.addAll(randomQuadsExercises);
        lowerBodyExercises.addAll(randomHamstringsExercises);
        lowerBodyExercises.addAll(randomCalvessExercises);
        lowerBodyExercises.addAll(randomInnerTightExercises);
        lowerBodyExercises.addAll(randomOuterTightExercises);

        return List.of(
                new WorkoutDay(
                        "Upper Body Day",
                        workoutPlan,
                        upperBodyExercises
                ),
                new WorkoutDay(
                        "Lower Body Day",
                        workoutPlan,
                        lowerBodyExercises
                )
        );

    }

    public List<WorkoutDay> upperLowerTwoDaysFemale(WorkoutPlan workoutPlan){
        List<Exercise> upperBodyExercises = new ArrayList<>();
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

        upperBodyExercises.addAll(randomChestExercises);
        upperBodyExercises.addAll(randomBackExercises);
        upperBodyExercises.addAll(randomShouldersExercises);
        upperBodyExercises.addAll(randomTricepsExercises);
        upperBodyExercises.addAll(randomBicepsExercises);

        List<Exercise> lowerBodyExercises = new ArrayList<>();
        List<Exercise> quadsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.QUADS);
        List<Exercise> randomQuadsExercises = exerciseService.getRandomExercises(quadsExercises, 1);

        List<Exercise> hamstringsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.HAMSTRINGS);
        List<Exercise> randomHamstringsExercises = exerciseService.getRandomExercises(hamstringsExercises, 1);

        List<Exercise> calvesExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.GLUTES);
        List<Exercise> randomCalvessExercises = exerciseService.getRandomExercises(calvesExercises, 1);

        List<Exercise> innerThighExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.INNER_THIGH);
        List<Exercise> randomInnerTightExercises = exerciseService.getRandomExercises(innerThighExercises, 1);

        List<Exercise> outerTightsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.OUTER_QUADRICEP);
        List<Exercise> randomOuterTightExercises = exerciseService.getRandomExercises(outerTightsExercises, 1);

        lowerBodyExercises.addAll(randomQuadsExercises);
        lowerBodyExercises.addAll(randomHamstringsExercises);
        lowerBodyExercises.addAll(randomCalvessExercises);
        lowerBodyExercises.addAll(randomInnerTightExercises);
        lowerBodyExercises.addAll(randomOuterTightExercises);

        return List.of(
                new WorkoutDay(
                        "Upper Body Day",
                        workoutPlan,
                        upperBodyExercises
                ),
                new WorkoutDay(
                        "Lower Body Day",
                        workoutPlan,
                        lowerBodyExercises
                )
        );

    }

    public List<WorkoutDay> pushPullLegsThreeDaysMale(WorkoutPlan workoutPlan){
        List<Exercise> pushExercises = new ArrayList<>();

        List<Exercise> chestExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.CHEST);
        List<Exercise> randomChestExercises = exerciseService.getRandomExercises(chestExercises, 2);

        List<Exercise> lowerChestExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.MID_AND_LOWER_CHEST);
        List<Exercise> randomLowerChestExercises = exerciseService.getRandomExercises(lowerChestExercises, 1);

        List<Exercise> shouldersExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.LATERAL_DELTOID);
        List<Exercise> randomShouldersExercises = exerciseService.getRandomExercises(shouldersExercises, 1);

        List<Exercise> posteriorDeltoidExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.POSTERIOR_DELTOID);
        List<Exercise> randomPosteriorDeltoidExercises = exerciseService.getRandomExercises(posteriorDeltoidExercises, 1);

        List<Exercise> tricepsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.TRICEPS);
        List<Exercise> randomTricepsExercises = exerciseService.getRandomExercises(tricepsExercises, 2);

        pushExercises.addAll(randomChestExercises);
        pushExercises.addAll(randomLowerChestExercises);
        pushExercises.addAll(randomShouldersExercises);
        pushExercises.addAll(randomPosteriorDeltoidExercises);
        pushExercises.addAll(randomTricepsExercises);

        List<Exercise> pullExercises = new ArrayList<>();

        List<Exercise> backExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.LATS);
        List<Exercise> randomBackExercises = exerciseService.getRandomExercises(backExercises, 2);

        List<Exercise> latsMidBackExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.TRAPS_MID_BACK);
        List<Exercise> randomLatsMidBackExercises = exerciseService.getRandomExercises(latsMidBackExercises, 1);

        List<Exercise> bicepsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.BICEPS);
        List<Exercise> randomBicepsExercises = exerciseService.getRandomExercises(bicepsExercises, 2);

        pullExercises.addAll(randomBackExercises);
        pullExercises.addAll(randomBicepsExercises);
        pullExercises.addAll(randomLatsMidBackExercises);

        List<Exercise> lowerBodyExercises = new ArrayList<>();
        List<Exercise> quadsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.QUADS);
        List<Exercise> randomQuadsExercises = exerciseService.getRandomExercises(quadsExercises, 1);

        List<Exercise> hamstringsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.HAMSTRINGS);
        List<Exercise> randomHamstringsExercises = exerciseService.getRandomExercises(hamstringsExercises, 1);

        List<Exercise> calvesExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.CALVES);
        List<Exercise> randomCalvessExercises = exerciseService.getRandomExercises(calvesExercises, 1);

        List<Exercise> innerThighExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.INNER_THIGH);
        List<Exercise> randomInnerTightExercises = exerciseService.getRandomExercises(innerThighExercises, 1);

        List<Exercise> outerTightsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.OUTER_QUADRICEP);
        List<Exercise> randomOuterTightExercises = exerciseService.getRandomExercises(outerTightsExercises, 1);

        lowerBodyExercises.addAll(randomQuadsExercises);
        lowerBodyExercises.addAll(randomHamstringsExercises);
        lowerBodyExercises.addAll(randomCalvessExercises);
        lowerBodyExercises.addAll(randomInnerTightExercises);
        lowerBodyExercises.addAll(randomOuterTightExercises);

        return List.of(
                new WorkoutDay(
                        "Push Day",
                        workoutPlan,
                        pushExercises
                ),
                new WorkoutDay(
                        "Pull Day",
                        workoutPlan,
                        pullExercises
                ),
                new WorkoutDay(
                        "Legs Day",
                        workoutPlan,
                        lowerBodyExercises
                )
        );
    }

    public List<WorkoutDay> threeDaysFemale(WorkoutPlan workoutPlan){

        List<Exercise> lowerBodyExercises1 = new ArrayList<>();
        List<Exercise> quadsExercises1 = getExercisesForMuscleGroup(workoutPlan,Muscle.QUADS);
        List<Exercise> randomQuadsExercises1 = exerciseService.getRandomExercises(quadsExercises1, 2);

        List<Exercise> hamstringsExercises1 = getExercisesForMuscleGroup(workoutPlan,Muscle.HAMSTRINGS);
        List<Exercise> randomHamstringsExercises1 = exerciseService.getRandomExercises(hamstringsExercises1, 2);

        List<Exercise> innerThighExercises1 = getExercisesForMuscleGroup(workoutPlan,Muscle.INNER_THIGH);
        List<Exercise> randomInnerTightExercises1 = exerciseService.getRandomExercises(innerThighExercises1, 1);

        List<Exercise> outerTightsExercises1 = getExercisesForMuscleGroup(workoutPlan,Muscle.OUTER_QUADRICEP);
        List<Exercise> randomOuterTightExercises1 = exerciseService.getRandomExercises(outerTightsExercises1, 1);

        lowerBodyExercises1.addAll(randomQuadsExercises1);
        lowerBodyExercises1.addAll(randomHamstringsExercises1);
        lowerBodyExercises1.addAll(randomInnerTightExercises1);
        lowerBodyExercises1.addAll(randomOuterTightExercises1);

        List<Exercise> upperBodyExercises = new ArrayList<>();
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

        upperBodyExercises.addAll(randomChestExercises);
        upperBodyExercises.addAll(randomBackExercises);
        upperBodyExercises.addAll(randomShouldersExercises);
        upperBodyExercises.addAll(randomTricepsExercises);
        upperBodyExercises.addAll(randomBicepsExercises);

        List<Exercise> lowerBodyExercises = new ArrayList<>();
        List<Exercise> quadsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.QUADS);
        List<Exercise> randomQuadsExercises = exerciseService.getRandomExercises(quadsExercises, 1);

        List<Exercise> hamstringsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.HAMSTRINGS);
        List<Exercise> randomHamstringsExercises = exerciseService.getRandomExercises(hamstringsExercises, 1);

        List<Exercise> calvesExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.GLUTES);
        List<Exercise> randomCalvessExercises = exerciseService.getRandomExercises(calvesExercises, 2);

        List<Exercise> innerThighExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.INNER_THIGH);
        List<Exercise> randomInnerTightExercises = exerciseService.getRandomExercises(innerThighExercises, 1);

        List<Exercise> outerTightsExercises = getExercisesForMuscleGroup(workoutPlan,Muscle.OUTER_QUADRICEP);
        List<Exercise> randomOuterTightExercises = exerciseService.getRandomExercises(outerTightsExercises, 1);

        lowerBodyExercises.addAll(randomQuadsExercises);
        lowerBodyExercises.addAll(randomHamstringsExercises);
        lowerBodyExercises.addAll(randomCalvessExercises);
        lowerBodyExercises.addAll(randomInnerTightExercises);
        lowerBodyExercises.addAll(randomOuterTightExercises);

        return List.of(
                new WorkoutDay(
                        "Lower Body Day",
                        workoutPlan,
                        lowerBodyExercises1
                ),
                new WorkoutDay(
                        "Upper Body Day",
                        workoutPlan,
                        upperBodyExercises
                ),
                new WorkoutDay(
                        "LegGlutes Day",
                        workoutPlan,
                        lowerBodyExercises
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

