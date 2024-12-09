package com.example.demo.service;

import com.example.demo.dto.exercise.ExerciseRequest;
import com.example.demo.dto.exercise.ExerciseResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.exceptions.DeletionException;
import com.example.demo.model.Exercise;
import com.example.demo.model.enums.Difficulty;
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

    public void populateTheDatabase(){
            exerciseRepository.save(new Exercise(
                    "Bodyweight Squats",
                    Muscle.QUADS,
                    List.of(Muscle.GLUTES, Muscle.HAMSTRINGS),
                    Equipment.BODYWEIGHT,
                    Difficulty.BEGINNER,
                    "https://youtu.be/YaXPRqUwItQ"
            ));
            exerciseRepository.save(new Exercise(
                    "Barbell Back Squats",
                    Muscle.QUADS,
                    List.of(Muscle.GLUTES, Muscle.HAMSTRINGS),
                    Equipment.BARBELL,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/bEv6CCg2BC8"
            ));

        exerciseRepository.save(new Exercise(
                    "Lying Leg Curls",
                    Muscle.HAMSTRINGS,
                    List.of(Muscle.CALVES),
                    Equipment.MACHINE,
                    Difficulty.BEGINNER,
                    "https://youtu.be/1Tq3QdYUuHs"
            ));
        exerciseRepository.save(new Exercise(
                    "Romanian Deadlift",
                    Muscle.HAMSTRINGS,
                    List.of(Muscle.LOWER_BACK, Muscle.GLUTES),
                    Equipment.BARBELL,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/hCDzSR6bW10"
            ));

        exerciseRepository.save(new Exercise(
                    "Glute Bridges",
                    Muscle.GLUTES,
                    List.of(Muscle.HAMSTRINGS),
                    Equipment.BODYWEIGHT,
                    Difficulty.BEGINNER,
                    "https://youtu.be/OUgsJ8-Vi0E"
            ));
        exerciseRepository.save(new Exercise(
                    "Hip Thrust",
                    Muscle.GLUTES,
                    List.of(Muscle.HAMSTRINGS),
                    Equipment.BARBELL,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/SEdqd1n0cvg"
            ));

        exerciseRepository.save(new Exercise(
                    "Push-Ups",
                    Muscle.CHEST,
                    List.of(Muscle.TRICEPS, Muscle.ANTERIOR_DELTOID),
                    Equipment.BODYWEIGHT,
                    Difficulty.BEGINNER,
                    "https://youtu.be/IODxDxX7oi4"
            ));
        exerciseRepository.save(new Exercise(
                    "Barbell Bench Press",
                    Muscle.CHEST,
                    List.of(Muscle.TRICEPS, Muscle.ANTERIOR_DELTOID),
                    Equipment.BARBELL,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/rT7DgCr-3pg"
            ));

        exerciseRepository.save(new Exercise(
                    "Lat Pulldowns",
                    Muscle.LATS,
                    List.of(Muscle.BICEPS, Muscle.TRAPS),
                    Equipment.CABLES,
                    Difficulty.BEGINNER,
                    "https://youtu.be/CAwf7n6Luuc"
            ));
        exerciseRepository.save(new Exercise(
                    "Weighted Pull-Ups",
                    Muscle.LATS,
                    List.of(Muscle.BICEPS, Muscle.TRAPS),
                    Equipment.BODYWEIGHT,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/l8vvvO8oN7c"
            ));

        exerciseRepository.save(new Exercise(
                    "Lateral Raises",
                    Muscle.LATERAL_DELTOID,
                    List.of(Muscle.SHOULDERS),
                    Equipment.DUMBBELLS,
                    Difficulty.BEGINNER,
                    "https://youtu.be/3VcKaXpzqRo"
            ));
        exerciseRepository.save(new Exercise(
                    "Cable Lateral Raises",
                    Muscle.LATERAL_DELTOID,
                    List.of(Muscle.SHOULDERS),
                    Equipment.CABLES,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/PPrzBWZDOhA"
            ));

        exerciseRepository.save(new Exercise(
                    "Tricep Pushdowns",
                    Muscle.TRICEPS,
                    List.of(Muscle.LATERAL_HEAD_TRICEPS),
                    Equipment.CABLES,
                    Difficulty.BEGINNER,
                    "https://youtu.be/2-LAMcpzODU"
            ));
        exerciseRepository.save(new Exercise(
                    "Close-Grip Bench Press",
                    Muscle.TRICEPS,
                    List.of(Muscle.CHEST, Muscle.SHOULDERS),
                    Equipment.BARBELL,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/nEF0bv2FW94"
            ));

        exerciseRepository.save(new Exercise(
                    "Dumbbell Curls",
                    Muscle.BICEPS,
                    List.of(Muscle.FOREARMS),
                    Equipment.DUMBBELLS,
                    Difficulty.BEGINNER,
                    "https://youtu.be/ykJmrZ5v0Oo"
            ));
        exerciseRepository.save(new Exercise(
                    "Barbell Preacher Curls",
                    Muscle.BICEPS,
                    List.of(Muscle.FOREARMS),
                    Equipment.BARBELL,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/fIWP-FRFNU0"
            ));

        exerciseRepository.save(new Exercise(
                    "Standing Calf Raises",
                    Muscle.CALVES,
                    List.of(Muscle.SOLEUS),
                    Equipment.BODYWEIGHT,
                    Difficulty.BEGINNER,
                    "https://youtu.be/gwLzBJYoWlI"
            ));
        exerciseRepository.save(new Exercise(
                    "Seated Calf Raises",
                    Muscle.CALVES,
                    List.of(Muscle.SOLEUS),
                    Equipment.MACHINE,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/JbyjNymZOt0"));

        exerciseRepository.save(new Exercise(
                            "Sumo Squats",
                            Muscle.INNER_THIGH,
                            List.of(Muscle.QUADS, Muscle.GLUTES),
                            Equipment.BODYWEIGHT,
                            Difficulty.BEGINNER,
                            "https://youtu.be/Z2F0bArQH5s"
                    ));
        exerciseRepository.save(new Exercise(
                    "Cable Hip Adduction",
                    Muscle.INNER_THIGH,
                    List.of(Muscle.QUADS),
                    Equipment.CABLES,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/dZYDPDZV1Qw"
            ));

        exerciseRepository.save(new Exercise(
                    "Lateral Step-Ups",
                    Muscle.OUTER_QUADRICEP,
                    List.of(Muscle.QUADS, Muscle.GLUTES),
                    Equipment.BODYWEIGHT,
                    Difficulty.BEGINNER,
                    "https://youtu.be/LXxA7y6O6_Q"
            ));
        exerciseRepository.save(new Exercise(
                    "Bulgarian Split Squats",
                    Muscle.OUTER_QUADRICEP,
                    List.of(Muscle.QUADS, Muscle.GLUTES),
                    Equipment.DUMBBELLS,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/2C-uNgKwPLE"
            ));

        exerciseRepository.save(new Exercise(
                    "Decline Push-Ups",
                    Muscle.MID_AND_LOWER_CHEST,
                    List.of(Muscle.TRICEPS, Muscle.ANTERIOR_DELTOID),
                    Equipment.BODYWEIGHT,
                    Difficulty.BEGINNER,
                    "https://youtu.be/SKPab2YC8BE"
            ));
        exerciseRepository.save(new Exercise(
                    "Decline Bench Press",
                    Muscle.MID_AND_LOWER_CHEST,
                    List.of(Muscle.TRICEPS, Muscle.ANTERIOR_DELTOID),
                    Equipment.BARBELL,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/LfyQBUKR8SE"
            ));

        exerciseRepository.save(new Exercise(
                    "Reverse Fly",
                    Muscle.POSTERIOR_DELTOID,
                    List.of(Muscle.TRAPS, Muscle.REAR_SHOULDERS),
                    Equipment.DUMBBELLS,
                    Difficulty.BEGINNER,
                    "https://youtu.be/lPt0GqwaqEw"
            ));
        exerciseRepository.save(new Exercise(
                    "Face Pulls",
                    Muscle.POSTERIOR_DELTOID,
                    List.of(Muscle.TRAPS, Muscle.REAR_SHOULDERS),
                    Equipment.CABLES,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/V8dZ3pyiCBo"
            ));

        exerciseRepository.save(new Exercise(
                    "Dumbbell Shrugs",
                    Muscle.TRAPS_MID_BACK,
                    List.of(Muscle.UPPER_TRAPS, Muscle.LOWER_TRAPS),
                    Equipment.DUMBBELLS,
                    Difficulty.BEGINNER,
                    "https://youtu.be/cJRVVxmytaM"
            ));
        exerciseRepository.save(new Exercise(
                    "Barbell Rows",
                    Muscle.TRAPS_MID_BACK,
                    List.of(Muscle.LATS, Muscle.BICEPS),
                    Equipment.BARBELL,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/FWJR5Ve8bnQ"
            ));

        exerciseRepository.save(new Exercise(
                    "Incline Push-Ups",
                    Muscle.UPPER_PECTORALIS,
                    List.of(Muscle.ANTERIOR_DELTOID, Muscle.TRICEPS),
                    Equipment.BODYWEIGHT,
                    Difficulty.BEGINNER,
                    "https://youtu.be/3YvfRx31xDE"
            ));
        exerciseRepository.save(new Exercise(
                    "Incline Bench Press",
                    Muscle.UPPER_PECTORALIS,
                    List.of(Muscle.ANTERIOR_DELTOID, Muscle.TRICEPS),
                    Equipment.BARBELL,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/SrqOu55lrYU"
            ));

        exerciseRepository.save(new Exercise(
                    "Superman Hold",
                    Muscle.LOWER_BACK,
                    List.of(Muscle.GLUTES),
                    Equipment.BODYWEIGHT,
                    Difficulty.BEGINNER,
                    "https://youtu.be/z6PJMT2y8GQ"
            ));
        exerciseRepository.save(new Exercise(
                    "Deadlift",
                    Muscle.LOWER_BACK,
                    List.of(Muscle.HAMSTRINGS, Muscle.GLUTES),
                    Equipment.BARBELL,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/op9kVnSso6Q"
            ));

        exerciseRepository.save(new Exercise(
                    "Front Raises",
                    Muscle.ANTERIOR_DELTOID,
                    List.of(Muscle.SHOULDERS),
                    Equipment.DUMBBELLS,
                    Difficulty.BEGINNER,
                    "https://youtu.be/sxzM-g4LYrE"
            ));
        exerciseRepository.save(new Exercise(
                    "Military Press",
                    Muscle.ANTERIOR_DELTOID,
                    List.of(Muscle.SHOULDERS, Muscle.TRICEPS),
                    Equipment.BARBELL,
                    Difficulty.INTERMEDIATE_ADVANCED,
                    "https://youtu.be/QAQ64hK4Xxs"
            ));


        }
    }
