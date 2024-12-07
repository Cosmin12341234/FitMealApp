export type User = {
    id: number;
    role:Role
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: Gender;
    height: number;
    weight: number;
    fitnessGoals: Goals;
    activityLevel: ActivityLevel;
    workouts:Workout[];
    meals:Meal[];

};

export type UserRequest = {
    role:Role
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: Gender;
    height: number|null;
    weight: number|null;
    fitnessGoals: Goals;
    activityLevel: ActivityLevel;

};

export type UserResponse = {
    id: number;
    role:Role
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: Gender;
    height: number;
    weight: number;
    fitnessGoals: Goals;
    activityLevel: ActivityLevel;
    workouts:Workout[];
    meals:Meal[];

};

export type LoginRequest = {
    username: string;
    password: string;
}

export type Workout = {
    id: number;
    type:string;
    duration:number;
    date:string;
    caloriesBurned:number;
    user: {
        id: number;
    };
};

export type WorkoutRequest = {
    type: string;
    duration: number;
    date: string;
    caloriesBurned: number;
    user: {
        id: number;
    };
};

export type WorkoutResponse = {
    id: number;
    type: string;
    duration: number;
    date: string;
    caloriesBurned: number;
    userId: number;
};

export type Meal = {
    id: number;
    name:string;
    type:Type;
    calories:number;
    date:string;
    description:string;
    user: {
        id: number;
    };
};

export type MealRequest = {
    name:string;
    type:Type;
    calories:number;
    date:string;
    description:string;
    user: {
        id: number;
    };
};

export type MealResponse = {
    id: number;
    name:string;
    type:Type;
    calories:number;
    date:string;
    description:string;
    userId:number;
};

export type Exercise = {
    id:number;
    name:string;
    primaryMuscle:Muscle;
    secondaryMuscles:Muscle[];
    equipment:Equipment;
    difficulty:Difficulty;
    instructions:string;
};

export type ExerciseRequest = {
    name:string;
    primaryMuscle:Muscle;
    secondaryMuscles:Muscle[];
    equipment:Equipment;
    difficulty:Difficulty;
    instructions:string;
}

export type ExerciseResponse = {
    id:number;
    name:string;
    primaryMuscle:Muscle;
    secondaryMuscles:Muscle[];
    equipment:Equipment;
    difficulty:Difficulty;
    instructions:string;
};

export type WorkoutPlan={
    id:number;
    user:{
        id:number
    };
    name:string;
    frequency:number;
    experience:Difficulty;
    goals:WorkoutGoals;
    gender:Gender;
    dateCreated:string;
    equipment:Equipment[];
    workoutDays:WorkoutDay[];
}

export type WorkoutPlanRequest={
    user:{
        id:number
    };
    name:string;
    frequency:number;
    experience:Difficulty;
    goal:WorkoutGoals;
    gender:Gender;
    equipment:Equipment[];
};

export type WorkoutPlanResponse={
    id:number;
    name:string;
    frequency:number;
    dateCreated:string;
    workoutDays:WorkoutDayResponse[];
};

export type WorkoutDay={
    id:number
    dayName:string;
    exercises:Exercise[];
    workoutPlan:{
        id:number
    };
};

export type WorkoutDayResponse={
    id:number
    dayName:string;
    exercises:ExerciseResponse[];
};

export enum WorkoutGoals { GAIN_STRENGTH = "GAIN_STRENGTH", GAIN_MUSCLE = "GAIN_MUSCLE"}

export enum Role { USER = "USER", ADMIN = "ADMIN" }

export enum Gender { MALE = "MALE", FEMALE = "FEMALE" }

export enum Goals { LOSE = "LOSE", GAIN = "GAIN", MAINTAIN = "MAINTAIN" }

export enum ActivityLevel { SEDENTARY = "SEDENTARY", LIGHTLY_ACTIVE = "LIGHTLY_ACTIVE", MODERATELY_ACTIVE = "MODERATELY_ACTIVE", VERY_ACTIVE = "VERY_ACTIVE", SUPER_ACTIVE = "SUPER_ACTIVE" }

export enum Type {BREAKFAST = "BREAKFAST", LUNCH = "LUNCH", DINNER = "DINNER", SNACK = "SNACK", DESSERT = "DESSERT", DRINK = "DRINK", OTHER = "OTHER"}

export enum Difficulty { BEGINNER = "BEGINNER", INTERMEDIATE_ADVANCED = "INTERMEDIATE_ADVANCED"}

export enum Equipment {
    BARBELL = "BARBELL",
    DUMBBELLS = "DUMBBELLS",
    BODYWEIGHT = "BODYWEIGHT",
    MACHINE = "MACHINE",
    MEDICINE_BALL = "MEDICINE_BALL",
    KETTLEBELLS = "KETTLEBELLS",
    STRETCHES = "STRETCHES",
    CABLES = "CABLES",
    BAND = "BAND",
    PLATE = "PLATE",
    TRX = "TRX",
    YOGA = "YOGA",
    BOSU_BALL = "BOSU_BALL",
    VITRUVIAN = "VITRUVIAN",
    CARDIO = "CARDIO",
    SMITH_MACHINE = "SMITH_MACHINE",
    RECOVERY = "RECOVERY",
}

export enum Muscle {
    SELECT= "SELECT",
    // Arms
    BICEPS = "BICEPS",
    LONG_HEAD_BICEP = "LONG_HEAD_BICEP",
    SHORT_HEAD_BICEP = "SHORT_HEAD_BICEP",
    TRICEPS = "TRICEPS",
    LONG_HEAD_TRICEP = "LONG_HEAD_TRICEP",
    LATERAL_HEAD_TRICEPS = "LATERAL_HEAD_TRICEPS",
    MEDIAL_HEAD_TRICEPS = "MEDIAL_HEAD_TRICEPS",
    FOREARMS = "FOREARMS",
    WRIST_EXTENSORS = "WRIST_EXTENSORS",
    WRIST_FLEXORS = "WRIST_FLEXORS",

    // Shoulders
    SHOULDERS = "SHOULDERS",
    LATERAL_DELTOID = "LATERAL_DELTOID",
    ANTERIOR_DELTOID = "ANTERIOR_DELTOID",
    POSTERIOR_DELTOID = "POSTERIOR_DELTOID",
    FRONT_SHOULDERS = "FRONT_SHOULDERS",
    REAR_SHOULDERS = "REAR_SHOULDERS",

    // Back
    TRAPS = "TRAPS",
    UPPER_TRAPS = "UPPER_TRAPS",
    LOWER_TRAPS = "LOWER_TRAPS",
    TRAPS_MID_BACK = "TRAPS_MID_BACK",
    LOWER_BACK = "LOWER_BACK",
    LATS = "LATS",

    // Chest
    CHEST = "CHEST",
    UPPER_PECTORALIS = "UPPER_PECTORALIS",
    MID_AND_LOWER_CHEST = "MID_AND_LOWER_CHEST",

    // Core
    ABDOMINALS = "ABDOMINALS",
    LOWER_ABDOMINALS = "LOWER_ABDOMINALS",
    UPPER_ABDOMINALS = "UPPER_ABDOMINALS",
    OBLIQUES = "OBLIQUES",

    // Legs
    CALVES = "CALVES",
    TIBIALIS = "TIBIALIS",
    SOLEUS = "SOLEUS",
    GASTROCNEMIUS = "GASTROCNEMIUS",
    QUADS = "QUADS",
    INNER_THIGH = "INNER_THIGH",
    INNER_QUADRICEPS = "INNER_QUADRICEPS",
    OUTER_QUADRICEP = "OUTER_QUADRICEP",
    RECTUS_FEMORIS = "RECTUS_FEMORIS",
    HAMSTRINGS = "HAMSTRINGS",
    MEDIAL_HAMSTRINGS = "MEDIAL_HAMSTRINGS",
    LATERAL_HAMSTRINGS = "LATERAL_HAMSTRINGS",

    // Glutes
    GLUTES = "GLUTES",
    GLUTEUS_MEDIUS = "GLUTEUS_MEDIUS",
    GLUTEUS_MAXIMUS = "GLUTEUS_MAXIMUS",

    // Other
    HANDS = "HANDS",
    FEET = "FEET",
    NECK = "NECK",
    GROIN = "GROIN"
}