"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type ActivityData = {
    date: string
    caloriesBurned: number
    caloriesConsumed: number
}

type ActivityChartProps = {
    data: ActivityData[]
}

export function ActivityChart({ data }: ActivityChartProps) {
    return (
        <Card className="bg-[#E9DDD4]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#900020]">Activity Trend</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <XAxis dataKey="date" stroke="#000000" fontSize={12} tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                        <YAxis stroke="#000000" fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="caloriesBurned" stroke="#900020" strokeWidth={2} name="Calories Burned" />
                        <Line type="monotone" dataKey="caloriesConsumed" stroke="#DC143C" strokeWidth={2} name="Calories Consumed" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

