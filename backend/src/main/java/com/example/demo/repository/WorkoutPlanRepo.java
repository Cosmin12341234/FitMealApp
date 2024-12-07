package com.example.demo.repository;

import com.example.demo.model.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutPlanRepo extends JpaRepository<WorkoutPlan, Long> {
}
