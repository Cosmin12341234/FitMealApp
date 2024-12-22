"use client"

import { useEffect, useState } from 'react'
import { Difficulty, Equipment, Exercise, ExerciseRequest, Muscle } from "@/utils/types.tsx"
import { ExerciseService } from "@/features/exercise/services/ExerciseService.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card.tsx"
import { Button } from "@/features/shared/components/ui/button.tsx"
import { Label } from "@/features/shared/components/ui/label.tsx"
import { Input } from "@/features/shared/components/ui/input.tsx"
import { MuscleSelect } from "@/features/exercise/components/ui/muscle-select.tsx"
import { EquipmentSelect } from "@/features/exercise/components/ui/equipment-select.tsx"
import { DifficultySelect } from "@/features/exercise/components/ui/difficulty-select.tsx"
import { AxiosError } from 'axios'
import { toast } from "sonner"

const initialExerciseState: ExerciseRequest = {
    name: '',
    primaryMuscle: Muscle.SELECT,
    secondaryMuscles: [Muscle.SELECT, Muscle.SELECT],
    equipment: Equipment.BARBELL,
    difficulty: Difficulty.BEGINNER,
    instructions: ''
}

export function ExercisesTab() {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [newExercise, setNewExercise] = useState<ExerciseRequest>(initialExerciseState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        loadExercises()
    }, [])

    const loadExercises = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const exercisesData = await ExerciseService.getExercises()
            setExercises(exercisesData)
        } catch (error) {
            setError('Failed to load exercises. Please try again later.')
            console.error('Failed to load exercises:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteExercise = async (exerciseId: number) => {
        try {
            await ExerciseService.deleteExercise(exerciseId)
            setExercises(exercises.filter(exercise => exercise.id !== exerciseId))
            toast.success("Exercise deleted successfully")
        } catch (error) {
            if ((error as AxiosError).response?.status === 409) {
                toast.error("This exercise cannot be deleted as it's currently part of an active workout plan")
            } else {
                toast.error("Failed to delete exercise")
                console.error('Failed to delete exercise:', error)
            }
        }
    }

    const handleAddExercise = async () => {
        if (newExercise.name && newExercise.primaryMuscle && newExercise.instructions) {
            try {
                const addedExercise = await ExerciseService.addExercise(newExercise)
                setExercises([...exercises, addedExercise])
                setNewExercise(initialExerciseState)
            } catch (error) {
                console.error('Failed to add exercise:', error)
            }
        }
    }

    const handleSecondaryMuscleChange = (index: number, value: Muscle) => {
        const updatedSecondaryMuscles = [...newExercise.secondaryMuscles]
        updatedSecondaryMuscles[index] = value
        setNewExercise({ ...newExercise, secondaryMuscles: updatedSecondaryMuscles })
    }

    const handlePopulateExercises = async () => {
        try {
            await ExerciseService.populateExercises();
            toast.success("Database populated with basic exercises");
            await loadExercises();
        } catch (error) {
            toast.error("Failed to populate exercises");
            console.error('Failed to populate exercises:', error);
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-semibold text-[#900020]">Exercises</CardTitle>
                    <Button
                        onClick={handlePopulateExercises}
                        className="bg-[#900020] hover:bg-[#DC143C] text-white"
                    >
                        Populate Basic Exercises
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-[#900020]">Add New Exercise</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="exerciseName">Exercise Name</Label>
                                <Input
                                    id="exerciseName"
                                    value={newExercise.name}
                                    onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                                    className="border-[#900020] focus:ring-[#DC143C]"
                                    placeholder="Enter the name of the exercise" // Added placeholder
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Primary Muscle</Label>
                                <MuscleSelect
                                    value={newExercise.primaryMuscle}
                                    onChange={(value) => setNewExercise({
                                        ...newExercise,
                                        primaryMuscle: value as Muscle
                                    })}
                                    label="Please select the Primary Muscle"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Secondary Muscle 1</Label>
                                <MuscleSelect
                                    value={newExercise.secondaryMuscles[0] || Muscle.SELECT}
                                    onChange={(value) => handleSecondaryMuscleChange(0, value as Muscle)}
                                    label="Please select Secondary Muscle"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Secondary Muscle 2</Label>
                                <MuscleSelect
                                    value={newExercise.secondaryMuscles[1] || Muscle.SELECT}
                                    onChange={(value) => handleSecondaryMuscleChange(1, value as Muscle)}
                                    label="Please select Secondary Muscle"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Equipment</Label>
                                <EquipmentSelect
                                    value={newExercise.equipment}
                                    onChange={(value) => setNewExercise({
                                        ...newExercise,
                                        equipment: value as Equipment
                                    })}
                                    label="Please select Equipment" // Updated placeholder
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Difficulty</Label>
                                <DifficultySelect
                                    value={newExercise.difficulty}
                                    onChange={(value) => setNewExercise({
                                        ...newExercise,
                                        difficulty: value as Difficulty
                                    })}
                                    label="Please select Difficulty"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="instructions">Instruction Video Link</Label>
                                <Input
                                    id="instructions"
                                    value={newExercise.instructions}
                                    onChange={(e) => setNewExercise({...newExercise, instructions: e.target.value})}
                                    className="border-[#900020] focus:ring-[#DC143C]"
                                    placeholder="Put the link to the instruction video! (e.g., https://youtube.com/...)"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Button
                                    onClick={handleAddExercise}
                                    className="w-full bg-[#900020] hover:bg-[#DC143C] text-white"
                                >
                                    Add Exercise
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {isLoading && <div>Loading exercises...</div>}
                {error && <div className="text-red-500">{error}</div>}
                {!isLoading && !error && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {exercises.map(exercise => (
                            <Card key={exercise.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="bg-[#F5E6E0]">
                                <CardTitle
                                        className="text-lg font-semibold text-[#900020]">{exercise.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="space-y-2">
                                        <p><strong>Primary Muscle:</strong> {exercise.primaryMuscle.replace(/_/g, ' ')}</p>
                                        <p><strong>Secondary Muscles:</strong> {exercise.secondaryMuscles.map(m => m.replace(/_/g, ' ')).join(', ')}</p>
                                        <p><strong>Equipment:</strong> {exercise.equipment.replace(/_/g, ' ')}</p>
                                        <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
                                        <p><strong>Instructions:</strong></p>
                                        <p className="text-sm text-gray-600">{exercise.instructions}</p>
                                    </div>
                                    <Button
                                        onClick={() => handleDeleteExercise(exercise.id)}
                                        variant="destructive"
                                        size="sm"
                                        className="mt-4 w-full bg-[#DC143C] hover:bg-[#900020] text-white"
                                    >
                                        Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}