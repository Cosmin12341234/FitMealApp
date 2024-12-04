"use client"

import { Button } from "@/features/shared/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/ui/table"
import { WorkoutResponse } from "@/utils/types"

type WorkoutListProps = {
    workouts: WorkoutResponse[]
    deleteWorkout: (id: number) => Promise<void>
    isLoading: boolean
}

export function WorkoutList({ workouts, deleteWorkout, isLoading }: WorkoutListProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-[#900020]">Workouts</h2>
            {workouts.length === 0 ? (
                <p className="text-center text-[#000000]">No workouts for this day.</p>
            ) : (
                <Table className="border-[#900020]">
                    <TableHeader className="bg-[#900020]">
                        <TableRow>
                            <TableHead className="text-[#E9DDD4]">Type</TableHead>
                            <TableHead className="text-[#E9DDD4]">Duration (min)</TableHead>
                            <TableHead className="text-[#E9DDD4]">Date</TableHead>
                            <TableHead className="text-[#E9DDD4]">Calories Burned</TableHead>
                            <TableHead className="text-[#E9DDD4]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workouts.map((workout) => (
                            <TableRow key={workout.id} className="border-b border-[#900020]">
                                <TableCell className="text-[#000000]">{workout.type}</TableCell>
                                <TableCell className="text-[#000000]">{workout.duration}</TableCell>
                                <TableCell className="text-[#000000]">
                                    {new Date(workout.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-[#000000]">{workout.caloriesBurned}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        onClick={() => deleteWorkout(workout.id)}
                                        disabled={isLoading}
                                        className="bg-[#DC143C] hover:bg-[#900020] text-[#E9DDD4]"
                                    >
                                        {isLoading ? 'Deleting...' : 'Delete'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}