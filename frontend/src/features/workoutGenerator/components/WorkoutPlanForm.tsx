import { useState } from 'react'
import { Label } from "@/features/shared/components/ui/label"
import { Input } from "@/features/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/features/shared/components/ui/select"
import { Button } from "@/features/shared/components/ui/button"
import { WorkoutPlanRequest, Equipment, Difficulty, Gender, WorkoutGoals } from '@/utils/types'
import {EquipmentSelector} from "@/features/workoutGenerator/components/ui/equipmentSelector.tsx";

interface WorkoutFormProps {
    userId: number | null
    userGender: Gender | null
    loading: boolean
    onSubmit: (workoutPlan: WorkoutPlanRequest) => Promise<void>
}

export function WorkoutPlanForm({ userId, userGender, loading, onSubmit }: WorkoutFormProps) {
    const [workoutName, setWorkoutName] = useState<string>('')
    const [frequency, setFrequency] = useState<string>('3')
    const [experience, setExperience] = useState<Difficulty>(Difficulty.BEGINNER)
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([])
    const [selectedGoal, setSelectedGoal] = useState<WorkoutGoals>(WorkoutGoals.GAIN_STRENGTH)

    const handleSubmit = async () => {
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
            user: { id: userId },
            name: workoutName,
            frequency: parseInt(frequency),
            experience,
            goal: selectedGoal,
            gender: userGender,
            equipment: selectedEquipment
        }

        await onSubmit(workoutPlanRequest)
    }

    return (
        <div>
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
                            {[1, 2, 3, 4, 5].map(num => (
                                <SelectItem key={num} value={num.toString()}>
                                    {num} time{num > 1 ? 's' : ''}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select value={experience} onValueChange={(value) => setExperience(value as Difficulty)}>
                        <SelectTrigger id="experience">
                            <SelectValue placeholder="Select experience"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={Difficulty.BEGINNER}>Beginner</SelectItem>
                            <SelectItem value={Difficulty.INTERMEDIATE_ADVANCED}>
                                Intermediate/Advanced
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="goals">Workout Goals</Label>
                    <Select value={selectedGoal} onValueChange={(value) => setSelectedGoal(value as WorkoutGoals)}>
                        <SelectTrigger id="goals">
                            <SelectValue placeholder="Select goal"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={WorkoutGoals.GAIN_STRENGTH}>Gain Strength</SelectItem>
                            <SelectItem value={WorkoutGoals.GAIN_MUSCLE}>Gain Muscle</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <EquipmentSelector
                selectedEquipment={selectedEquipment}
                onEquipmentChange={setSelectedEquipment}
            />

            <Button
                onClick={handleSubmit}
                className="w-full bg-[#900020] hover:bg-[#DC143C] text-white"
                disabled={loading}
            >
                {loading ? 'Generating...' : 'Generate Workout Plan'}
            </Button>
        </div>
    )
}