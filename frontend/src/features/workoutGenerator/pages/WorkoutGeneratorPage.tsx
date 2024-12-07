"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { Button } from "@/features/shared/components/ui/button"
import { Label } from "@/features/shared/components/ui/label"
import { Input } from "@/features/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/features/shared/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/ui/table"
import { Checkbox } from "@/features/workoutGenerator/components/ui/checkBox.tsx"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/features/shared/components/ui/dialog"
import { Trash2, ExternalLink } from 'lucide-react'
import { generateWorkoutPlan, deleteWorkoutPlan, getWorkoutPlanByUsername } from '@/features/workoutGenerator/services/WorkoutPlanService.tsx'
import { UserService } from '@/features/user/services/UserService'
import {
    WorkoutPlanRequest,
    WorkoutPlanResponse,
    WorkoutDayResponse,
    ExerciseResponse,
    Equipment,
    Difficulty,
    Gender,
    WorkoutGoals
} from '@/utils/types'

export default function WorkoutGenerator() {
    const [workoutName, setWorkoutName] = useState<string>('')
    const [frequency, setFrequency] = useState<string>('3')
    const [experience, setExperience] = useState<Difficulty>(Difficulty.BEGINNER)
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([])
    const [selectedGoal, setSelectedGoal] = useState<WorkoutGoals>(WorkoutGoals.GAIN_STRENGTH)
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
                alert('Failed to load necessary data. Please try logging in again.')
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
        }
    }

    const handleGenerateWorkout = async (): Promise<void> => {
        if (!userId || !userGender) {
            alert("User details not loaded properly")
            return
        }

        if (selectedEquipment.length === 0) {
            alert("Please select at least one equipment type.")
            return
        }

        if (!workoutName) {
            alert("Please enter a name for your workout.")
            return
        }

        const workoutPlanRequest: WorkoutPlanRequest = {
            user: {
                id: userId
            },
            name: workoutName,
            frequency: parseInt(frequency),
            experience: experience,
            goals: selectedGoal,
            gender: userGender,
            equipment: selectedEquipment
        }

        setLoading(true)
        try {
            await generateWorkoutPlan(workoutPlanRequest)
            await loadWorkoutPlans()
            alert('Workout plan generated successfully!')
        } catch (error) {
            console.error('Error generating workout plan:', error)
            alert('Failed to generate workout plan')
        } finally {
            setLoading(false)
        }
    }

        const handleDeleteWorkout = async (id: number) => {
            if (window.confirm('Are you sure you want to delete this workout plan?')) {
                try {
                    await deleteWorkoutPlan(id)
                    await loadWorkoutPlans()
                    alert('Workout plan deleted successfully!')
                } catch (error) {
                    console.error('Error deleting workout plan:', error)
                    alert('Failed to delete workout plan')
                }
            }
        }

        const toggleEquipment = (equipment: Equipment) => {
            setSelectedEquipment(prev =>
                prev.includes(equipment)
                    ? prev.filter(e => e !== equipment)
                    : [...prev, equipment]
            )
        }

        if (isInitializing) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <div>Loading...</div>
                </div>
            )
        }

        return (
            <>
                <div className="min-h-screen bg-gradient-to-b from-[#E9DDD4] to-[#F5E6E0] p-8">
                    <Card className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl">
                        <CardHeader className="bg-[#900020] text-white p-6">
                            <CardTitle className="text-3xl font-bold text-center">Workout Generator</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="col-span-2">
                                    <Label htmlFor="workoutName">Workout Name</Label>
                                    <Input
                                        id="workoutName"
                                        value={workoutName}
                                        onChange={(e) => setWorkoutName(e.target.value)}
                                        placeholder="Enter workout name"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="frequency">Workout Frequency (per week)</Label>
                                    <Select value={frequency} onValueChange={setFrequency}>
                                        <SelectTrigger id="frequency">
                                            <SelectValue placeholder="Select frequency"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2">2 times</SelectItem>
                                            <SelectItem value="3">3 times</SelectItem>
                                            <SelectItem value="4">4 times</SelectItem>
                                            <SelectItem value="5">5 times</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="experience">Experience Level</Label>
                                    <Select
                                        value={experience}
                                        onValueChange={(value) => setExperience(value as Difficulty)}
                                    >
                                        <SelectTrigger id="experience">
                                            <SelectValue placeholder="Select experience"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={Difficulty.BEGINNER}>Beginner</SelectItem>
                                            <SelectItem
                                                value={Difficulty.INTERMEDIATE_ADVANCED}>Intermediate/Advanced</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="goals">Workout Goals</Label>
                                    <Select
                                        value={selectedGoal}
                                        onValueChange={(value) => setSelectedGoal(value as WorkoutGoals)}
                                    >
                                        <SelectTrigger id="goals">
                                            <SelectValue placeholder="Select goal"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={WorkoutGoals.GAIN_STRENGTH}>
                                                Gain Strength
                                            </SelectItem>
                                            <SelectItem value={WorkoutGoals.GAIN_MUSCLE}>
                                                Gain Muscle
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="mb-6">
                                <Label>Equipment</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                    {Object.values(Equipment).map((equipment) => (
                                        <div key={equipment} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={equipment}
                                                checked={selectedEquipment.includes(equipment)}
                                                onCheckedChange={() => toggleEquipment(equipment)}
                                            />
                                            <label
                                                htmlFor={equipment}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {equipment.replace(/_/g, ' ')}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                onClick={handleGenerateWorkout}
                                className="w-full bg-[#900020] hover:bg-[#DC143C] text-white"
                                disabled={loading}
                            >
                                {loading ? 'Generating...' : 'Generate Workout Plan'}
                            </Button>

                            {workoutPlans.length > 0 && (
                                <div className="mt-8">
                                    <h2 className="text-2xl font-bold text-[#900020] mb-4">Your Workout Plans</h2>
                                    <div className="space-y-6">
                                        {workoutPlans.map((plan: WorkoutPlanResponse) => (
                                            <Card key={plan.id} className="w-full">
                                                <CardHeader className="flex flex-row justify-between items-center">
                                                    <div>
                                                        <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                                                        <p className="text-sm text-gray-600">
                                                            Created
                                                            on: {new Date(plan.dateCreated).toLocaleDateString()} |
                                                            Frequency: {plan.frequency}x per week
                                                        </p>
                                                    </div>
                                                    <Button
                                                        onClick={() => handleDeleteWorkout(plan.id)}
                                                        variant="destructive"
                                                        className="bg-[#DC143C] hover:bg-[#900020]"
                                                    >
                                                        <Trash2 className="w-4 h-4"/>
                                                    </Button>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        {plan.workoutDays.map((day: WorkoutDayResponse) => (
                                                            <Card key={day.id}
                                                                  className="border-l-4 border-l-[#900020]">
                                                                <CardHeader>
                                                                    <CardTitle className="text-lg font-semibold">
                                                                        {day.dayName}
                                                                    </CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                    <Table>
                                                                        <TableHeader>
                                                                            <TableRow>
                                                                                <TableHead>Exercise</TableHead>
                                                                                <TableHead>Primary Muscle</TableHead>
                                                                                <TableHead>Secondary Muscles</TableHead>
                                                                                <TableHead>Equipment</TableHead>
                                                                                <TableHead>Difficulty</TableHead>
                                                                            </TableRow>
                                                                        </TableHeader>
                                                                        <TableBody>
                                                                            {day.exercises.map((exercise: ExerciseResponse) => (
                                                                                <TableRow key={exercise.id}>
                                                                                    <TableCell className="font-medium">
                                                                                        <div>
                                                                                            {exercise.name}
                                                                                            <Button
                                                                                                variant="ghost"
                                                                                                size="sm"
                                                                                                className="ml-2 text-[#900020]"
                                                                                                onClick={() => setSelectedExercise(exercise)}
                                                                                            >
                                                                                                <ExternalLink
                                                                                                    className="w-4 h-4"/>
                                                                                            </Button>
                                                                                        </div>
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        {exercise.primaryMuscle.replace(/_/g, ' ')}
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        {exercise.secondaryMuscles
                                                                                            .map(muscle => muscle.replace(/_/g, ' '))
                                                                                            .join(', ')}
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        {exercise.equipment.replace(/_/g, ' ')}
                                                                                    </TableCell>
                                                                                    <TableCell>
                                                                                        {exercise.difficulty}
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </CardContent>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Dialog
                    open={!!selectedExercise}
                    onOpenChange={() => setSelectedExercise(null)}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedExercise?.name}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Instructions:</h4>
                            <p className="text-sm whitespace-pre-wrap">
                                {selectedExercise?.instructions}
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        )
}