"use client"

import { useState, useEffect } from 'react'
import { Label } from "@/features/shared/components/ui/label"
import { Input } from "@/features/shared/components/ui/input"
import { Button } from "@/features/shared/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/features/shared/components/ui/select"
import { Textarea } from "@/features/meal/components/ui/textarea"
import { MealRequest, Type } from "@/utils/types"

type MealFormProps = {
    addMeal: (meal: Omit<MealRequest, 'user'>) => Promise<void>
    selectedDate: Date
    isLoading: boolean
    initialValues?: {
        name: string
        type: Type
        calories: number
        date: string
        description: string
    }
}

export function MealForm({ addMeal, selectedDate, isLoading, initialValues }: MealFormProps) {
    const [name, setName] = useState(initialValues?.name || '')
    const [type, setType] = useState<Type>(initialValues?.type || Type.OTHER)
    const [calories, setCalories] = useState(initialValues?.calories?.toString() || '')
    const [date, setDate] = useState(initialValues?.date || '')
    const [description, setDescription] = useState(initialValues?.description || '')

    useEffect(() => {
        if (!initialValues) {
            setDate(selectedDate.toISOString().split('T')[0])
        }
    }, [selectedDate, initialValues])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const caloriesNum = parseInt(calories)

        if (!name || !type || isNaN(caloriesNum) || !date) {
            console.error('Invalid form data:', { name, type, calories: caloriesNum, date, description })
            return
        }

        try {
            const mealData = {
                name,
                type,
                calories: caloriesNum,
                date,
                description
            }

            console.log('Submitting meal data:', mealData)

            await addMeal(mealData)

            if (!initialValues) {
                setName('')
                setType(Type.OTHER)
                setCalories('')
                setDescription('')
            }
        } catch (error) {
            console.error('Error submitting meal:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#000000]">Meal Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Grilled Chicken Salad"
                        required
                        disabled={isLoading}
                        className="border-[#900020] focus:border-[#DC143C] text-[#000000] bg-[#E9DDD4]"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="type" className="text-[#000000]">Meal Type</Label>
                    <Select
                        value={type}
                        onValueChange={(value) => setType(value as Type)}
                        disabled={isLoading}
                    >
                        <SelectTrigger className="border-[#900020] focus:border-[#DC143C] text-[#000000] bg-[#E9DDD4]">
                            <SelectValue placeholder="Select meal type" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(Type).map((mealType) => (
                                <SelectItem key={mealType} value={mealType}>{mealType}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="calories" className="text-[#000000]">Calories</Label>
                    <Input
                        id="calories"
                        type="number"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        placeholder="500"
                        required
                        disabled={isLoading}
                        min="0"
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
            </div>
            <div className="space-y-2">
                <Label htmlFor="description" className="text-[#000000]">Description</Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add any additional notes here..."
                    disabled={isLoading}
                    className="border-[#900020] focus:border-[#DC143C] text-[#000000] bg-[#E9DDD4]"
                />
            </div>
            <Button
                type="submit"
                disabled={isLoading || !name || !type || !calories || !date}
                className="w-full bg-[#900020] hover:bg-[#DC143C] text-[#E9DDD4]"
            >
                {isLoading ? (initialValues ? 'Updating...' : 'Adding...') : (initialValues ? 'Update Meal' : 'Add Meal')}
            </Button>
        </form>
    )
}