"use client"

import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { UserResponse } from "@/utils/types.tsx"
import { UserService } from "@/features/user/services/UserService.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/ui/table.tsx"
import { Button } from "@/features/shared/components/ui/button.tsx"
import { Label } from "@/features/shared/components/ui/label.tsx"
import { Input } from "@/features/shared/components/ui/input.tsx"

export function UsersTab() {
    const [users, setUsers] = useState<UserResponse[]>([])
    const [expandedUser, setExpandedUser] = useState<number | null>(null)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        try {
            const usersData = await UserService.getUsers()
            setUsers(usersData)
        } catch (error) {
            console.error('Failed to load users:', error)
        }
    }

    const handleDeleteUser = async (userId: number) => {
        try {
            await UserService.deleteUser(userId)
            setUsers(users.filter(user => user.id !== userId))
        } catch (error) {
            console.error('Failed to delete user:', error)
        }
    }

    const toggleUserExpansion = (userId: number) => {
        setExpandedUser(expandedUser === userId ? null : userId)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-[#900020]">Users</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => (
                            <React.Fragment key={user.id.toString()}>
                                <TableRow>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => toggleUserExpansion(user.id)}
                                            >
                                                {expandedUser === user.id ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <Button
                                                onClick={() => handleDeleteUser(user.id)}
                                                variant="destructive"
                                                size="sm"
                                                className="bg-[#DC143C] hover:bg-[#900020] text-white"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                {expandedUser === user.id && (
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <div className="p-4 bg-[#F5E6E0] rounded-lg mt-2">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label>Date of Birth</Label>
                                                        <Input value={user.dob} readOnly className="bg-white" />
                                                    </div>
                                                    <div>
                                                        <Label>Gender</Label>
                                                        <Input value={user.gender} readOnly className="bg-white" />
                                                    </div>
                                                    <div>
                                                        <Label>Height (cm)</Label>
                                                        <Input value={user.height} readOnly className="bg-white" />
                                                    </div>
                                                    <div>
                                                        <Label>Weight (kg)</Label>
                                                        <Input value={user.weight} readOnly className="bg-white" />
                                                    </div>
                                                    <div className="col-span-2">
                                                        <Label>Fitness Goals</Label>
                                                        <Input value={user.fitnessGoals} readOnly className="bg-white" />
                                                    </div>
                                                    <div className="col-span-2">
                                                        <Label>Activity Level</Label>
                                                        <Input value={user.activityLevel} readOnly className="bg-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}