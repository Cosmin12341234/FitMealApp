"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { DaySelector } from "@/features/shared/components/ui/day-selector"
import { MealForm } from "@/features/meal/components/ui/form"
import { MealList } from "@/features/meal/components/ui/list"
import { MealRequest, MealResponse, User } from "@/utils/types"
import { toast } from "sonner"
import { useNavigate } from 'react-router-dom'
import { UserService } from "@/features/user/services/UserService"
import { MealService } from "@/features/meal/services/MealService"
import axios from 'axios'

export default function MealTracker() {
    const [meals, setMeals] = useState<MealResponse[]>([])
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
                setUser(userProfile)
                fetchMeals()
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

    const fetchMeals = async () => {
        try {
            setIsLoading(true)
            const response = await MealService.getMealsByUsername()
            setMeals(response)
        } catch (error) {
            toast.error("Failed to fetch meals")
            console.error(error)
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                navigate('/signin')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddMeal = async (mealData: Omit<MealRequest, 'user'>) => {
        if (!user) {
            toast.error("User not available")
            return
        }

        try {
            setIsLoading(true)
            const mealRequest: MealRequest = {
                ...mealData,
                user: { id: user.id }
            }
            console.log('Sending meal request:', mealRequest)
            await MealService.addMeal(mealRequest)
            toast.success("Meal added successfully")
            fetchMeals()
        } catch (error) {
            toast.error("Failed to add meal")
            console.error(error)
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                navigate('/signin')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteMeal = async (id: number) => {
        try {
            setIsLoading(true)
            await MealService.deleteMeal(id)
            toast.success("Meal deleted successfully")
            fetchMeals()
        } catch (error) {
            toast.error("Failed to delete meal")
            console.error(error)
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                navigate('/signin')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const filteredMeals = meals.filter(meal =>
        new Date(meal.date).toDateString() === selectedDate.toDateString()
    )

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <Card className="w-full max-w-4xl mx-auto bg-[#E9DDD4]">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-[#900020]">
                    Meal Tracker
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <DaySelector
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
                <MealForm
                    addMeal={handleAddMeal}
                    selectedDate={selectedDate}
                    isLoading={isLoading}
                />
                <MealList
                    meals={filteredMeals}
                    deleteMeal={handleDeleteMeal}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    )
}