import {ExerciseRequest} from "@/utils/types.tsx";
import {
    handleAddExercise,
    handleDeleteExercise,
    handleGetExercises,
    handlePopulateExercises
} from "@/apis/exercise/exerciseAPI.tsx";

const addExercise=(exercise:ExerciseRequest)=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleAddExercise(exercise,username!,password!)
        .then((response)=> {
            return response;
        })
}

const deleteExercise = (id:number) => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return handleDeleteExercise(id,username!, password!)
        .then((response) => {
            return response;
        })
}

const getExercises=()=>{
    const username=localStorage.getItem('username');
    const password=localStorage.getItem('password');
    return handleGetExercises(username!,password!)
        .then((response)=>{return response;
        })
}

const populateExercises = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return handlePopulateExercises(username!, password!)
        .then((response) => {
            return response;
        });
}

export const ExerciseService={
    addExercise,
    deleteExercise,
    getExercises,
    populateExercises
}