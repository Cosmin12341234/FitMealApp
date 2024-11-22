"use client"

import { useState, useEffect } from 'react'
import { Label } from "@/features/shared/components/ui/label"
import { Input } from "@/features/shared/components/ui/input"
import { Button } from "@/features/shared/components/ui/button"
import { WorkoutRequest } from "@/utils/types"

type WorkoutFormProps = {
    addWorkout: (workout: Omit<WorkoutRequest, 'user'>) => Promise<void>
    selectedDate: Date
    isLoading: boolean
    initialValues?: {
        type: string
        duration: number
        date: string
        caloriesBurned: number
    }
}

export function WorkoutForm({ addWorkout, selectedDate, isLoading, initialValues }: WorkoutFormProps) {
    const [type, setType] = useState(initialValues?.type || '')
    const [duration, setDuration] = useState(initialValues?.duration?.toString() || '')
    const [date, setDate] = useState(initialValues?.date || '')
    const [caloriesBurned, setCaloriesBurned] = useState(initialValues?.caloriesBurned?.toString() || '')

    useEffect(() => {
        if (!initialValues) {
            setDate(selectedDate.toISOString().split('T')[0])
        }
    }, [selectedDate, initialValues])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const durationNum = parseInt(duration)
        const caloriesNum = parseInt(caloriesBurned)

        if (!type || isNaN(durationNum) || !date || isNaN(caloriesNum)) {
            console.error('Invalid form data:', { type, duration: durationNum, date, caloriesBurned: caloriesNum })
            return
        }

        try {
            const workoutData = {
                type,
                duration: durationNum,
                date,
                caloriesBurned: caloriesNum
            }

            console.log('Submitting workout data:', workoutData)

            await addWorkout(workoutData)

            if (!initialValues) {
                setType('')
                setDuration('')
                setCaloriesBurned('')
            }
        } catch (error) {
            console.error('Error submitting workout:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="type" className="text-[#000000]">Workout Type</Label>
                    <Input
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="e.g., Running, Cycling"
                        required
                        disabled={isLoading}
                        className="border-[#900020] focus:border-[#DC143C] text-[#000000] bg-[#E9DDD4]"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="duration" className="text-[#000000]">Duration (minutes)</Label>
                    <Input
                        id="duration"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="30"
                        required
                        disabled={isLoading}
                        min="1"
                        step="1"
                        className="border-[#900020] focus:border-[#DC143C] text-[#000000] bg-[#E9DDD4]"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date" className="text-[#000000]">Date</Label>
                    <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        disabled={isLoading}
                        className="border-[#900020] focus:border-[#DC143C] text-[#000000] bg-[#E9DDD4]"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="caloriesBurned" className="text-[#000000]">Calories Burned</Label>
                    <Input
                        id="caloriesBurned"
                        type="number"
                        value={caloriesBurned}
                        onChange={(e) => setCaloriesBurned(e.target.value)}
                        placeholder="100"
                        required
                        disabled={isLoading}
                        min="0"
                        step="1"
                        className="border-[#900020] focus:border-[#DC143C] text-[#000000] bg-[#E9DDD4]"
                    />
                </div>
            </div>
            <Button
                type="submit"
                disabled={isLoading || !type || !duration || !date || !caloriesBurned}
                className="w-full bg-[#900020] hover:bg-[#DC143C] text-[#E9DDD4]"
            >
                {isLoading ? (initialValues ? 'Updating...' : 'Adding...') : (initialValues ? 'Update Workout' : 'Add Workout')}
            </Button>
        </form>
    )
}