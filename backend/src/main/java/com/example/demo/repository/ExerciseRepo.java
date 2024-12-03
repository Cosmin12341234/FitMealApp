package com.example.demo.repository;

import com.example.demo.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseRepo extends JpaRepository<Exercise,Long> {
}
