package com.example.demo.repository;

import com.example.demo.model.WorkoutDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutDayRepo extends JpaRepository<WorkoutDay, Long> {
    boolean existsByExercisesId(Long exerciseId);
}
