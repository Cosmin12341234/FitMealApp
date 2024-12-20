"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { Progress } from "@/features/home/components/ui/progress"
import { DaySelector } from "@/features/shared/components/ui/day-selector"
import { QuickActions } from "@/features/home/components/ui/quick-actions.tsx"
import { ActivityChart } from "@/features/home/components/ui/chart"
import { MealPlan } from '@/features/home/components/ui/meal-plan'
import { Layout } from '@/features/shared/components/Layout'
import { UserService } from '@/features/user/services/UserService'
import { WorkoutService } from '@/features/workout/services/WorkoutService'
import { MealService } from '@/features/meal/services/MealService'
import { toast } from "sonner"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type DailyData = {
    date: string
    caloriesBurned: number
    caloriesConsumed: number
    weight: number
}

export default function HomePage() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [dailyData, setDailyData] = useState<DailyData[]>([])
    const [calorieGoal, setCalorieGoal] = useState<number>(2000)
    const [isLoading, setIsLoading] = useState(false)
    const [currentCaloriesBurned, setCurrentCaloriesBurned] = useState<number>(0)
    const [currentCaloriesConsumed, setCurrentCaloriesConsumed] = useState<number>(0)
    const [currentWeight, setCurrentWeight] = useState<number>(0)
    const burnGoal = 500
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTDEE = async () => {
            try {
                const tdee = await UserService.getTDEEByUsername()
                setCalorieGoal(tdee)
            } catch (error) {
                console.error('Failed to fetch TDEE:', error)
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    navigate('/signin')
                }
            }
        }

        fetchTDEE()
    }, [navigate])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await UserService.getByUsername()
                setCurrentWeight(userData.weight || 0)
            } catch (error) {
                console.error('Failed to fetch user data:', error)
                toast.error('Failed to load user data')
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    navigate('/signin')
                }
            }
        }

        fetchUserData()
    }, [navigate])

    useEffect(() => {
        const fetchCaloriesBurned = async () => {
            try {
                const dateStr = selectedDate.toISOString().split('T')[0]
                const caloriesBurnedMap = await WorkoutService.getCaloriesBurnedByDatesByUsername(
                    dateStr,
                    dateStr
                )
                setCurrentCaloriesBurned(caloriesBurnedMap[dateStr] || 0)
            } catch (error) {
                console.error('Failed to fetch calories burned:', error)
                toast.error('Failed to load workout data')
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    navigate('/signin')
                }
            }
        }

        fetchCaloriesBurned()
    }, [selectedDate, navigate])

    useEffect(() => {
        const fetchCaloriesConsumed = async () => {
            try {
                const dateStr = selectedDate.toISOString().split('T')[0]
                const caloriesConsumedMap = await MealService.getCaloriesConsumedByDates(
                    dateStr,
                    dateStr
                )
                setCurrentCaloriesConsumed(caloriesConsumedMap[dateStr] || 0)
            } catch (error) {
                console.error('Failed to fetch calories consumed:', error)
                toast.error('Failed to load meal data')
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    navigate('/signin')
                }
            }
        }

        fetchCaloriesConsumed()
    }, [selectedDate, navigate])

    useEffect(() => {
        const fetchWeekData = async () => {
            try {
                setIsLoading(true)
                const endDate = new Date(selectedDate)
                const startDate = new Date(selectedDate)
                startDate.setDate(startDate.getDate() - 6)

                const startDateStr = startDate.toISOString().split('T')[0]
                const endDateStr = endDate.toISOString().split('T')[0]

                const [caloriesBurnedMap, caloriesConsumedMap] = await Promise.all([
                    WorkoutService.getCaloriesBurnedByDatesByUsername(startDateStr, endDateStr),
                    MealService.getCaloriesConsumedByDates(startDateStr, endDateStr)
                ])

                const newDailyData: DailyData[] = []
                const currentDate = new Date(startDate)

                while (currentDate <= endDate) {
                    const dateStr = currentDate.toISOString().split('T')[0]
                    newDailyData.push({
                        date: dateStr,
                        caloriesBurned: caloriesBurnedMap[dateStr] ?? 0,
                        caloriesConsumed: caloriesConsumedMap[dateStr] ?? 0,
                        weight: currentWeight
                    })
                    currentDate.setDate(currentDate.getDate() + 1)
                }

                setDailyData(newDailyData)
            } catch (error) {
                console.error('Failed to fetch week data:', error)
                toast.error('Failed to load weekly data')
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    navigate('/signin')
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchWeekData()
    }, [selectedDate, navigate, currentWeight])

    const getCurrentDayData = (): DailyData => {
        return {
            date: selectedDate.toISOString().split('T')[0],
            caloriesBurned: currentCaloriesBurned,
            caloriesConsumed: currentCaloriesConsumed,
            weight: currentWeight
        }
    }

    const currentDayData = getCurrentDayData()

    if (isLoading || !calorieGoal) {
        return (
            <Layout>
                <div>Loading...</div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
                <Card className="bg-[#E9DDD4]">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center text-[#900020]">
                            Daily Dashboard
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <DaySelector
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />

                        <Card className="bg-[#E9DDD4]">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-[#900020]">
                                    Calorie Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-medium text-[#000000]">
                                            Calories Burned
                                        </h3>
                                        <span className="text-[#900020] font-medium">
                                            {currentDayData.caloriesBurned} / {burnGoal}
                                        </span>
                                    </div>
                                    <Progress
                                        value={(currentDayData.caloriesBurned / burnGoal) * 100}
                                        className="h-2 bg-[#E9DDD4]"
                                    >
                                        <div
                                            className="h-full bg-[#900020] transition-all"
                                            style={{
                                                width: `${(currentDayData.caloriesBurned / burnGoal) * 100}%`
                                            }}
                                        />
                                    </Progress>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-medium text-[#000000]">
                                            Calories Consumed
                                        </h3>
                                        <span className="text-[#900020] font-medium">
                                            {currentDayData.caloriesConsumed} / {calorieGoal}
                                        </span>
                                    </div>
                                    <Progress
                                        value={(currentDayData.caloriesConsumed / calorieGoal) * 100}
                                        className="h-2 bg-[#E9DDD4]"
                                    >
                                        <div
                                            className="h-full bg-[#DC143C] transition-all"
                                            style={{
                                                width: `${(currentDayData.caloriesConsumed / calorieGoal) * 100}%`
                                            }}
                                        />
                                    </Progress>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#E9DDD4]">
                            <CardContent className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm font-medium text-[#000000]">
                                        Current Weight
                                    </h3>
                                    <span className="text-xl font-bold text-[#900020]">
                                        {currentDayData.weight} kg
                                    </span>
                                </div>
                                <QuickActions/>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ActivityChart data={dailyData}/>
                            <MealPlan selectedDate={selectedDate}/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    )
}