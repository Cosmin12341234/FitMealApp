"use client"

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card.tsx"
import { EditableField } from '@/features/user/components/editable-fields.tsx'
import { UserService } from '@/features/user/services/UserService.tsx'
import { toast } from 'sonner'
import { Button } from "@/features/shared/components/ui/button"
import { UserRequest, UserResponse, ActivityLevel, Goals, Gender } from "@/utils/types"
import {Layout} from "@/features/shared/components/Layout.tsx";

const ACTIVITY_LEVEL_OPTIONS = [
    { value: ActivityLevel.SEDENTARY, label: 'Sedentary (Little or no exercise)' },
    { value: ActivityLevel.LIGHTLY_ACTIVE, label: 'Lightly Active (1-3 times/week)' },
    { value: ActivityLevel.MODERATELY_ACTIVE, label: 'Moderately Active (3-5 times/week)' },
    { value: ActivityLevel.VERY_ACTIVE, label: 'Very Active (6-7 times/week)' },
    { value: ActivityLevel.SUPER_ACTIVE, label: 'Super Active (Professional athlete)' }
]

const FITNESS_GOALS_OPTIONS = [
    { value: Goals.LOSE, label: 'Lose Weight' },
    { value: Goals.MAINTAIN, label: 'Maintain Weight' },
    { value: Goals.GAIN, label: 'Gain Weight' }
]

const GENDER_OPTIONS = [
    { value: Gender.MALE, label: 'Male' },
    { value: Gender.FEMALE, label: 'Female' }
]

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetchUserProfile()
    }, [])

    const fetchUserProfile = async () => {
        try {
            const userData = await UserService.getByUsername()
            setProfile(userData)
        } catch (error) {
            console.error('Error fetching profile:', error)
            toast.error("Failed to load profile")
            navigate('/signin')
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdate = async (field: keyof UserRequest, value: string | number) => {
        if (!profile) return

        try {
            const updatedUser: UserRequest = {
                role: profile.role,
                username: profile.username,
                email: profile.email,
                password:localStorage.getItem('password') as string,
                firstName: profile.firstName,
                lastName: profile.lastName,
                dob: profile.dob,
                gender: profile.gender,
                height: profile.height,
                weight: profile.weight,
                fitnessGoals: profile.fitnessGoals,
                activityLevel: profile.activityLevel,
                [field]: value
            }

            await UserService.updateUser(profile.id, updatedUser)
            setProfile(prev => prev ? { ...prev, [field]: value } : null)
            toast.success("Profile updated successfully")
        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error("Failed to update profile")
        }
    }

    const handleDeleteAccount = async () => {
        if (!profile || !window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return
        }

        try {
            await UserService.deleteUser(profile.id)
            toast.success("Account deleted successfully")
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            navigate('/signin')
        } catch (error) {
            console.error('Error deleting account:', error)
            toast.error("Failed to delete account")
        }
    }

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-[#900020]">Loading...</div>
                </div>
            </Layout>
        )
    }

    if (!profile) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-[#900020]">Profile not found</div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="p-8">
                <Card className="w-full max-w-4xl mx-auto bg-[#E9DDD4]">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center text-[#900020]">
                            User Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <EditableField
                            label="Username"
                            value={profile.username}
                            onUpdate={(value) => handleUpdate('username', value)}
                        />
                        <EditableField
                            label="Email"
                            value={profile.email}
                            onUpdate={(value) => handleUpdate('email', value)}
                            type="email"
                        />
                        <EditableField
                            label="First Name"
                            value={profile.firstName}
                            onUpdate={(value) => handleUpdate('firstName', value)}
                        />
                        <EditableField
                            label="Last Name"
                            value={profile.lastName}
                            onUpdate={(value) => handleUpdate('lastName', value)}
                        />
                        <EditableField
                            label="Date of Birth"
                            value={profile.dob}
                            onUpdate={(value) => handleUpdate('dob', value)}
                            type="date"
                        />
                        <EditableField
                            label="Gender"
                            value={profile.gender}
                            onUpdate={(value) => handleUpdate('gender', value)}
                            type="select"
                            options={GENDER_OPTIONS}
                        />
                        <EditableField
                            label="Height (cm)"
                            value={profile.height.toString()}
                            onUpdate={(value) => handleUpdate('height', Number(value))}
                            type="number"
                        />
                        <EditableField
                            label="Weight (kg)"
                            value={profile.weight.toString()}
                            onUpdate={(value) => handleUpdate('weight', Number(value))}
                            type="number"
                        />
                        <EditableField
                            label="Activity Level"
                            value={profile.activityLevel}
                            onUpdate={(value) => handleUpdate('activityLevel', value)}
                            type="select"
                            options={ACTIVITY_LEVEL_OPTIONS}
                        />
                        <EditableField
                            label="Fitness Goals"
                            value={profile.fitnessGoals}
                            onUpdate={(value) => handleUpdate('fitnessGoals', value)}
                            type="select"
                            options={FITNESS_GOALS_OPTIONS}
                        />

                        <div className="pt-6 border-t border-[#900020]/10">
                            <Button
                                onClick={handleDeleteAccount}
                                variant="destructive"
                                className="w-full bg-red-600 hover:bg-red-700 text-white"
                            >
                                Delete Account
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    )
}