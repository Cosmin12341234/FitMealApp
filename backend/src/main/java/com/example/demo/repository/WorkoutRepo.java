package com.example.demo.repository;

import com.example.demo.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutRepo extends JpaRepository<Workout, Long> {
}
