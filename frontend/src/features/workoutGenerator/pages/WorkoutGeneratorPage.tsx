"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { generateWorkoutPlan, deleteWorkoutPlan, getWorkoutPlanByUsername } from '@/features/workoutGenerator/services/WorkoutPlanService'
import { UserService } from '@/features/user/services/UserService'
import { toast } from "sonner"
import {
    WorkoutPlanRequest,
    WorkoutPlanResponse,
    ExerciseResponse,
    Gender
} from '@/utils/types'
import { Layout } from "@/features/shared/components/Layout"
import {WorkoutPlanList} from "@/features/workoutGenerator/components/ui/WorkoutPlanList.tsx";
import {ExerciseInstructionsDialog} from "@/features/workoutGenerator/components/ui/exerciseInstructionsDialog.tsx";
import {WorkoutPlanForm} from "@/features/workoutGenerator/components/WorkoutPlanForm.tsx";

export default function WorkoutGeneratorPage() {
    const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlanResponse[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isInitializing, setIsInitializing] = useState(true)
    const [userId, setUserId] = useState<number | null>(null)
    const [userGender, setUserGender] = useState<Gender | null>(null)
    const [selectedExercise, setSelectedExercise] = useState<ExerciseResponse | null>(null)

    useEffect(() => {
        const loadData = async () => {
            setIsInitializing(true)
            try {
                const userResponse = await UserService.getByUsername()
                if (!userResponse || !userResponse.id || !userResponse.gender) {
                    throw new Error('Invalid user data received')
                }
                setUserId(userResponse.id)
                setUserGender(userResponse.gender)
                await loadWorkoutPlans()
            } catch (error) {
                console.error('Error initializing data:', error)
                toast.error('Failed to load necessary data. Please try logging in again.')
            } finally {
                setIsInitializing(false)
            }
        }

        loadData()
    }, [])

    const loadWorkoutPlans = async () => {
        try {
            const response = await getWorkoutPlanByUsername()
            setWorkoutPlans(response)
        } catch (error) {
            console.error('Error loading workout plans:', error)
            toast.error('Failed to load workout plans')
        }
    }

    const handleGenerateWorkout = async (workoutPlanRequest: WorkoutPlanRequest) => {
        setLoading(true)
        try {
            await generateWorkoutPlan(workoutPlanRequest)
            await loadWorkoutPlans()
            toast.success('Workout plan generated successfully!')
        } catch (error) {
            console.error('Error generating workout plan:', error)
            toast.error('Failed to generate workout plan')
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteWorkout = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this workout plan?')) {
            try {
                await deleteWorkoutPlan(id)
                await loadWorkoutPlans()
                toast.success('Workout plan deleted successfully!')
            } catch (error) {
                console.error('Error deleting workout plan:', error)
                toast.error('Failed to delete workout plan')
            }
        }
    }

    if (isInitializing) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-[#E9DDD4]">Loading...</div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-b from-[#E9DDD4] to-[#F5E6E0] p-8">
                <Card className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl">
                    <CardHeader className="bg-[#900020] text-white p-6">
                        <CardTitle className="text-3xl font-bold text-center">Workout Generator</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <WorkoutPlanForm
                            userId={userId}
                            userGender={userGender}
                            loading={loading}
                            onSubmit={handleGenerateWorkout}
                        />

                        <WorkoutPlanList
                            workoutPlans={workoutPlans}
                            onDelete={handleDeleteWorkout}
                            onExerciseSelect={setSelectedExercise}
                        />
                    </CardContent>
                </Card>
            </div>

            <ExerciseInstructionsDialog
                exercise={selectedExercise}
                onClose={() => setSelectedExercise(null)}
            />
        </Layout>
    )
}