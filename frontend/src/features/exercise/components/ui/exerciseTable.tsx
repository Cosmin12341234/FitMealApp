import { Button } from "@/features/shared/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/ui/table"
import { ExternalLink } from 'lucide-react'
import { ExerciseResponse } from '@/utils/types'

interface ExerciseTableProps {
    exercises: ExerciseResponse[]
    onExerciseSelect: (exercise: ExerciseResponse) => void
}

export function ExerciseTable({ exercises, onExerciseSelect }: ExerciseTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Exercise</TableHead>
                    <TableHead>Primary Muscle</TableHead>
                    <TableHead>Secondary Muscles</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Instructions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {exercises.map((exercise) => (
                    <TableRow key={exercise.id}>
                        <TableCell className="font-medium">
                            <div className="flex items-center">
                                {exercise.name}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2 text-[#900020]"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onExerciseSelect(exercise)
                                    }}
                                >
                                    <ExternalLink className="w-4 h-4"/>
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
                        <TableCell>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(exercise.instructions, '_blank')}
                                className="text-[#900020] border-[#900020] hover:bg-[#900020] hover:text-white"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}