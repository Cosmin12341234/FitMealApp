import { CardContent } from "@/features/shared/components/ui/card"
import { WorkoutDayResponse, ExerciseResponse } from '@/utils/types'
import {ExerciseTable} from "@/features/exercise/components/ui/exerciseTable.tsx";

interface WorkoutDayCardProps {
    workoutDays: WorkoutDayResponse[]
    onExerciseSelect: (exercise: ExerciseResponse) => void
}

export function WorkoutDayCard({ workoutDays, onExerciseSelect }: WorkoutDayCardProps) {
    return (
        <CardContent>
            <div className="space-y-4">
                {workoutDays.map((day) => (
                    <div key={day.id} className="border-l-4 border-l-[#900020] p-4 rounded-lg bg-white shadow">
                        <h3 className="text-lg font-semibold mb-4">{day.dayName}</h3>
                        <ExerciseTable
                            exercises={day.exercises}
                            onExerciseSelect={onExerciseSelect}
                        />
                    </div>
                ))}
            </div>
        </CardContent>
    )
}