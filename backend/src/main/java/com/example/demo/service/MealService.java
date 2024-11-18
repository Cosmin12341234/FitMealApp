package com.example.demo.service;

import com.example.demo.dto.meal.MealRequest;
import com.example.demo.dto.meal.MealResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.model.Meal;
import com.example.demo.repository.MealRepo;
import com.example.demo.utils.mapper.MealMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MealService {

    private final MealRepo mealRepository;

    public MealService(MealRepo mealRepository) {
        this.mealRepository = mealRepository;
    }

    @Transactional
    public MealResponse saveMeal(MealRequest mealRequest){
        Meal meal = new Meal(mealRequest.name(),mealRequest.type(),mealRequest.calories(),mealRequest.date(),mealRequest.description(),mealRequest.user());
        return MealMapper.entityToDto(mealRepository.save(meal));
    }

    @Transactional
    public void deleteMeal(Long id){
        Meal meal = findMealById(id);
        mealRepository.delete(meal);
    }

    @Transactional
    public MealResponse updateMeal(Long id, MealRequest mealRequest) {
        Meal meal = findMealById(id);
        meal.setName(mealRequest.name());
        meal.setType(mealRequest.type());
        meal.setCalories(mealRequest.calories());
        meal.setDate(mealRequest.date());
        meal.setDescription(mealRequest.description());
        meal.setUser(mealRequest.user());
        return MealMapper.entityToDto(mealRepository.save(meal));
    }

    public Meal findMealById(Long id) {
        return mealRepository.findById(id)
                .orElseThrow(() -> new AuthException.NotFoundException("Meal not found with id: " + id));
    }

    public MealResponse findMealResponseById(Long id) {
        return MealMapper.entityToDto(findMealById(id));
    }

    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    public List<MealResponse> getAllMealsResponse() {
        return MealMapper.entityListToDto(getAllMeals());
    }
}
