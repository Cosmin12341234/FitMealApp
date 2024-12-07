import { useState } from 'react'
import { Card, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { Button } from "@/features/shared/components/ui/button"
import { Trash2, ChevronDown } from 'lucide-react'
import { WorkoutPlanResponse, ExerciseResponse } from '@/utils/types'
import {WorkoutDayCard} from "@/features/workoutGenerator/components/ui/workoutDayCard.tsx";

interface WorkoutPlanListProps {
    workoutPlans: WorkoutPlanResponse[]
    onDelete: (id: number) => Promise<void>
    onExerciseSelect: (exercise: ExerciseResponse) => void
}

export function WorkoutPlanList({ workoutPlans, onDelete, onExerciseSelect }: WorkoutPlanListProps) {
    const [expandedPlans, setExpandedPlans] = useState<number[]>([])

    const togglePlanExpansion = (planId: number) => {
        setExpandedPlans(prev =>
            prev.includes(planId)
                ? prev.filter(id => id !== planId)
                : [...prev, planId]
        )
    }

    if (workoutPlans.length === 0) {
        return null
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#900020] mb-4">Your Workout Plans</h2>
            <div className="space-y-3">
                {workoutPlans.map((plan) => (
                    <Card key={plan.id} className="w-full">
                        <CardHeader
                            className="flex flex-row justify-between items-center cursor-pointer hover:bg-gray-50"
                            onClick={() => togglePlanExpansion(plan.id)}
                        >
                            <div>
                                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                                <p className="text-sm text-gray-600">
                                    Created on: {new Date(plan.dateCreated).toLocaleDateString()} |
                                    Frequency: {plan.frequency}x per week
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onDelete(plan.id)
                                    }}
                                    variant="destructive"
                                    className="bg-[#DC143C] hover:bg-[#900020]"
                                >
                                    <Trash2 className="w-4 h-4"/>
                                </Button>
                                <div className={`transform transition-transform ${expandedPlans.includes(plan.id) ? 'rotate-180' : ''}`}>
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </div>
                        </CardHeader>

                        {expandedPlans.includes(plan.id) && (
                            <WorkoutDayCard
                                workoutDays={plan.workoutDays}
                                onExerciseSelect={onExerciseSelect}
                            />
                        )}
                    </Card>
                ))}
            </div>
        </div>
    )
}