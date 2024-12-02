import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { MealService } from '@/features/meal/services/MealService'
import { toast } from "sonner"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type Meal = {
    id: number
    name: string
    description: string
    calories: number
    date: string
}

interface MealPlanProps {
    selectedDate: Date
}

export function MealPlan({ selectedDate }: MealPlanProps) {
    const [meals, setMeals] = useState<Meal[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setIsLoading(true)
                const response = await MealService.getMealsByUsername()
                const currentDateStr = selectedDate.toISOString().split('T')[0]
                const currentDateMeals = response.filter((meal: Meal) =>
                    meal.date === currentDateStr
                )
                setMeals(currentDateMeals)
            } catch (error) {
                console.error('Failed to fetch meals:', error)
                toast.error('Failed to load meal plan')
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    navigate('/signin')
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchMeals()
    }, [navigate, selectedDate])

    if (isLoading) {
        return <div>Loading meals...</div>
    }

    return (
        <Card className="bg-[#E9DDD4]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#900020]">
                    Meals for {selectedDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {meals.length === 0 ? (
                    <p className="text-center text-[#000000]">No meals planned for this date</p>
                ) : (
                    <ul className="space-y-2">
                        {meals.map((meal) => (
                            <li key={meal.id} className="bg-[#F5EBE0] p-2 rounded">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium text-[#900020]">{meal.name}</h3>
                                    <span className="text-sm text-[#900020]">{meal.calories} cal</span>
                                </div>
                                <p className="text-sm text-[#000000]">{meal.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    )
}