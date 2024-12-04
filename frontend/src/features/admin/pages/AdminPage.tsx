"use client"

import { Dumbbell, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/shared/components/ui/tabs.tsx"
import {UsersTab} from "@/features/admin/components/UserTabs.tsx";
import {ExercisesTab} from "@/features/admin/components/ExerciseTabs.tsx";
import {useEffect, useState} from "react";
import {Layout} from "@/features/shared/components/Layout.tsx";
import {useNavigate} from "react-router-dom";
export default function AdminPage() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const username = localStorage.getItem('username')
        const password = localStorage.getItem('password')

        if (!username || !password) {
            navigate('/signin')
            return
        }

        setIsLoading(false)
    }, [navigate])

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-[#E9DDD4]">Loading...</div>
                </div>
            </Layout>
        )
    }
    return (
        <Layout>
        <div className="min-h-screen bg-gradient-to-b from-[#E9DDD4] to-[#F5E6E0] p-8">
            <Card className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
                <CardHeader className="bg-[#900020] text-white p-6">
                    <CardTitle className="text-3xl font-bold text-center">Fitness Admin Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <Tabs defaultValue="users" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2 bg-[#F5E6E0]">
                            <TabsTrigger value="users" className="data-[state=active]:bg-[#900020] data-[state=active]:text-white">
                                <Users className="w-5 h-5 mr-2" />
                                Users
                            </TabsTrigger>
                            <TabsTrigger value="exercises" className="data-[state=active]:bg-[#900020] data-[state=active]:text-white">
                                <Dumbbell className="w-5 h-5 mr-2" />
                                Exercises
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="users">
                            <UsersTab />
                        </TabsContent>

                        <TabsContent value="exercises">
                            <ExercisesTab />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
        </Layout>
    )
}