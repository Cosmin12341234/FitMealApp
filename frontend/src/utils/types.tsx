export type User = {
    id: number;
    role:Role
    username: string;
    name: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: Gender;
    height: number;
    weight: number;
    fitnessGoal: Goals;
    activityLevel: ActivityLevel;
    workouts:Workout[];
    meals:Meal[];

};

export type UserRequest = {
    role:Role
    username: string;
    name: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: Gender;
    height: number;
    weight: number;
    fitnessGoal: Goals;
    activityLevel: ActivityLevel;

};

export type UserResponse = {
    id: number;
    role:Role
    username: string;
    name: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: Gender;
    height: number;
    weight: number;
    fitnessGoal: Goals;
    activityLevel: ActivityLevel;
    workouts:Workout[];
    meals:Meal[];

};

export type LoginRequest = {
    username: string;
    password: string;
}
export enum Role { USER = "USER", ADMIN = "ADMIN" }

export enum Gender { MALE = "MALE", FEMALE = "FEMALE" }

export enum Goals { LOSE = "LOSE", GAIN = "GAIN", MAINTAIN = "MAINTAIN" }

export enum ActivityLevel { SEDENTARY = "SEDENTARY", LIGHTLY_ACTIVE = "LIGHTLY_ACTIVE", MODERATELY_ACTIVE = "MODERATELY_ACTIVE", VERY_ACTIVE = "VERY_ACTIVE", SUPER_ACTIVE = "SUPER_ACTIVE" }

export enum Type {BREAKFAST = "BREAKFAST", LUNCH = "LUNCH", DINNER = "DINNER", SNACK = "SNACK", DESSERT = "DESSERT", DRINK = "DRINK", OTHER = "OTHER"}

export type Workout = {
    id: number;
    type:string;
    duration:number;
    date:string;
    caloriesBurnt:number;
    user:User;
};

export type WorkoutRequest = {
    type:string;
    duration:number;
    date:string;
    caloriesBurnt:number;
    userId:number;
};

export type WorkoutResponse = {
    id: number;
    type:string;
    duration:number;
    date:string;
    caloriesBurnt:number;
    userId:number;
};

export type Meal = {
    id: number;
    name:string;
    type:Type;
    calories:number;
    date:string;
    description:string;
    user:User;
};