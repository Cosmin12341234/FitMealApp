"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { DaySelector } from "@/features/shared/components/ui/day-selector"
import { WorkoutForm } from "@/features/workout/components/ui/form"
import { WorkoutList } from "@/features/workout/components/ui/list"
import { WorkoutRequest, WorkoutResponse, User } from "@/utils/types"
import { toast } from "sonner"
import { useNavigate } from 'react-router-dom'
import { UserService } from "@/features/user/services/UserService"
import { WorkoutService } from "@/features/workout/services/WorkoutService"
import axios from 'axios'

export default function WorkoutTracker() {
    const [workouts, setWorkouts] = useState<WorkoutResponse[]>([])
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const username = localStorage.getItem('username')
        const password = localStorage.getItem('password')

        if (!username || !password) {
            toast.error("Please login first")
            navigate('/signin')
            return
        }

        const fetchUserProfile = async () => {
            try {
                const userProfile = await UserService.getByUsername()
                setUser(userProfile) // Store the entire user object
                fetchWorkouts()
            } catch (error) {
                console.error('Error fetching user profile:', error)
                toast.error("Failed to fetch user profile")
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    navigate('/signin')
                }
            }
        }

        fetchUserProfile()
    }, [navigate])

    const fetchWorkouts = async () => {
        try {
            setIsLoading(true)
            const response = await WorkoutService.getWorkoutsByUsername()
            setWorkouts(response)
        } catch (error) {
            toast.error("Failed to fetch workouts")
            console.error(error)
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                navigate('/signin')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddWorkout = async (workoutData: Omit<WorkoutRequest, 'user'>) => {
        if (!user) {
            toast.error("User not available")
            return
        }

        try {
            setIsLoading(true)
            const workoutRequest: WorkoutRequest = {
                ...workoutData,
                user: { id: user.id } // Pass user object with id
            }
            console.log('Sending workout request:', workoutRequest)
            await WorkoutService.addWorkout(workoutRequest)
            toast.success("Workout added successfully")
            fetchWorkouts()
        } catch (error) {
            toast.error("Failed to add workout")
            console.error(error)
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                navigate('/signin')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteWorkout = async (id: number) => {
        try {
            setIsLoading(true)
            await WorkoutService.deleteWorkout(id)
            toast.success("Workout deleted successfully")
            fetchWorkouts()
        } catch (error) {
            toast.error("Failed to delete workout")
            console.error(error)
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                navigate('/signin')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const filteredWorkouts = workouts.filter(workout =>
        new Date(workout.date).toDateString() === selectedDate.toDateString()
    )

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <Card className="w-full max-w-4xl mx-auto bg-[#E9DDD4]">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-[#900020]">
                    Workout Tracker
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <DaySelector
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
                <WorkoutForm
                    addWorkout={handleAddWorkout}
                    selectedDate={selectedDate}
                    isLoading={isLoading}
                />
                <WorkoutList
                    workouts={filteredWorkouts}
                    deleteWorkout={handleDeleteWorkout}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    )
}