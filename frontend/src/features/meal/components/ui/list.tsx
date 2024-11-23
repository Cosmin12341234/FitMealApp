"use client"

import { Button } from "@/features/shared/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/ui/table"
import { MealResponse } from "@/utils/types"

type MealListProps = {
    meals: MealResponse[]
    deleteMeal: (id: number) => Promise<void>
    isLoading: boolean
}

export function MealList({ meals, deleteMeal, isLoading }: MealListProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-[#900020]">Meals</h2>
            {meals.length === 0 ? (
                <p className="text-center text-[#000000]">No meals recorded for this day.</p>
            ) : (
                <Table className="border-[#900020]">
                    <TableHeader className="bg-[#900020]">
                        <TableRow>
                            <TableHead className="text-[#E9DDD4]">Name</TableHead>
                            <TableHead className="text-[#E9DDD4]">Type</TableHead>
                            <TableHead className="text-[#E9DDD4]">Calories</TableHead>
                            <TableHead className="text-[#E9DDD4]">Description</TableHead>
                            <TableHead className="text-[#E9DDD4]">Date</TableHead>
                            <TableHead className="text-[#E9DDD4]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {meals.map((meal) => (
                            <TableRow key={meal.id} className="border-b border-[#900020]">
                                <TableCell className="text-[#000000]">{meal.name}</TableCell>
                                <TableCell className="text-[#000000]">{meal.type}</TableCell>
                                <TableCell className="text-[#000000]">{meal.calories}</TableCell>
                                <TableCell className="text-[#000000]">{meal.description}</TableCell>
                                <TableCell className="text-[#000000]">
                                    {new Date(meal.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        onClick={() => deleteMeal(meal.id)}
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