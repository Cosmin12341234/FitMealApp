import {
    handleAddMeal,
    handleDeleteMeal, handleGetCaloriesByDateByUsername,
    handleGetMealById,
    handleGetMeals, handleGetMealsByUsername,
    handleUpdateMeal
} from "@/apis/meal/mealAPI.tsx";
import {MealRequest} from "@/utils/types.tsx";

const getMeals=()=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleGetMeals(username!,password!)
        .then((response)=>{return response;
        })
};

const addMeal=(meal:MealRequest)=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleAddMeal(meal,username!,password!)
        .then((response)=>{return response;
        })
}

const deleteMeal=(id:number)=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleDeleteMeal(id,username!,password!)
        .then((response)=>{return response;
        })
}

const updateMeal=(id:number,meal:MealRequest)=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleUpdateMeal(id,meal,username!,password!)
        .then((response)=>{return response;
        })
}

const getMealById=(id:number)=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleGetMealById(id,username!,password!)
        .then((response)=>{return response;
        })
}

const getMealsByUsername=()=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleGetMealsByUsername(username!,password!)
        .then((response)=>{return response;
        })
}

const getCaloriesByDateByUsername=(date:string)=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleGetCaloriesByDateByUsername(date,username!,password!)
        .then((response)=>{return response;
        })
}
export const MealService={
    getMeals,
    addMeal,
    deleteMeal,
    updateMeal,
    getMealById,
    getMealsByUsername,
    getCaloriesByDateByUsername
}