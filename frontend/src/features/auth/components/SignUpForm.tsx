"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form.tsx";
import { Input } from "./ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/components/ui/select.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "@/features/auth/services/AuthService.tsx";
import { toast } from "sonner";
import { Role, Gender, Goals, ActivityLevel, UserRequest } from "@/utils/types.tsx";
import { Logo } from "../../shared/components/ui/logo.tsx";

const FormSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(32),
    password: z.string().min(3, "Password must be at least 3 characters").max(32),
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    dob: z.string(),
    gender: z.nativeEnum(Gender, {
        required_error: "Please select a gender",
    }),
    height: z.number().min(100).max(250).nullable(),
    weight: z.number().min(30).max(300).nullable(),
    fitnessGoals: z.nativeEnum(Goals, {
        required_error: "Please select a fitness goal",
    }),
    activityLevel: z.nativeEnum(ActivityLevel, {
        required_error: "Please select an activity level",
    })
});

const SignUpForm = () => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",
            dob: "",
            gender: undefined,
            height: null,
            weight: null,
            fitnessGoals: undefined,
            activityLevel: undefined
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            const userRequest: UserRequest = {
                ...data,
                role: Role.USER
            };

            // Add console logs to see the data
            console.log('Form Data:', data);
            console.log('User Request Body:', userRequest);
            console.log('Fitness Goal:', userRequest.fitnessGoals); // Specifically log the fitness goal

            const { status, message } = await AuthService.signup(userRequest);

            // Log the response
            console.log('Response:', { status, message });

            if (status === 200) {
                toast.success("Registration successful!", {
                    description: message,
                });
                navigate("/signin");
            } else {
                toast.error("Registration failed", {
                    description: message,
                });
            }
        } catch (err) {
            console.error('Error details:', err);
            toast.error("An error occurred", {
                description: "Please try again later",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E9DDD4]">
            <Card className="w-full max-w-xl bg-white shadow-lg">
                <CardHeader className="space-y-4 bg-[#DC143C] rounded-t-lg p-8">
                    <div className="flex justify-center mb-6">
                        <Logo />
                    </div>
                    <CardTitle className="text-4xl font-bold text-center text-white">
                        Create Account
                    </CardTitle>
                    <p className="text-sm text-center text-white/80">
                        Start your journey to a healthier you
                    </p>
                </CardHeader>
                <CardContent className="mt-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Basic Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#000000]">First Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter your first name" />
                                            </FormControl>
                                            <FormMessage className="text-[#900020]" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#000000]">Last Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter your last name" />
                                            </FormControl>
                                            <FormMessage className="text-[#900020]" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#000000]">Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" placeholder="Enter your email" />
                                        </FormControl>
                                        <FormMessage className="text-[#900020]" />
                                    </FormItem>
                                )}
                            />

                            {/* Username and Password */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#000000]">Username</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Choose a username" />
                                            </FormControl>
                                            <FormMessage className="text-[#900020]" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#000000]">Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" placeholder="Create a password" />
                                            </FormControl>
                                            <FormMessage className="text-[#900020]" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Date of Birth */}
                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#000000]">Date of Birth</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="date" />
                                        </FormControl>
                                        <FormMessage className="text-[#900020]" />
                                    </FormItem>
                                )}
                            />

                            {/* Height and Weight */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="height"
                                    render={({ field: { value, onChange, ...field } }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#000000]">Height (cm)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    value={value || ''} // Convert null to empty string
                                                    onChange={e => {
                                                        const val = e.target.value;
                                                        onChange(val ? Number(val) : null); // Convert empty string to null
                                                    }}
                                                    placeholder="Enter your height"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-[#900020]" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="weight"
                                    render={({ field: { value, onChange, ...field } }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#000000]">Weight (kg)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    value={value || ''} // Convert null to empty string
                                                    onChange={e => {
                                                        const val = e.target.value;
                                                        onChange(val ? Number(val) : null); // Convert empty string to null
                                                    }}
                                                    placeholder="Enter your weight"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-[#900020]" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Gender and Fitness Goal */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#000000]">Gender</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="bg-white">
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value={Gender.MALE}>Male</SelectItem>
                                                    <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[#900020]" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fitnessGoals"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[#000000]">Fitness Goal</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value || ""} // Add default empty string if value is undefined
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-white">
                                                        <SelectValue placeholder="Select your goal" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="LOSE">Lose Weight</SelectItem>
                                                    <SelectItem value="MAINTAIN">Maintain Weight</SelectItem>
                                                    <SelectItem value="GAIN">Gain Weight</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[#900020]" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="activityLevel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#000000]">Activity Level</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-white">
                                                    <SelectValue placeholder="Select activity level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={ActivityLevel.SEDENTARY}>Sedentary</SelectItem>
                                                <SelectItem value={ActivityLevel.LIGHTLY_ACTIVE}>Lightly Active</SelectItem>
                                                <SelectItem value={ActivityLevel.MODERATELY_ACTIVE}>Moderately Active</SelectItem>
                                                <SelectItem value={ActivityLevel.VERY_ACTIVE}>Very Active</SelectItem>
                                                <SelectItem value={ActivityLevel.SUPER_ACTIVE}>Super Active</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[#900020]" />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-[#DC143C] hover:bg-[#900020] text-white font-semibold transition-colors duration-300"
                            >
                                Start Your Fitness & Nutrition Journey
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-center text-sm text-[#000000]">
                        Already on the path to a healthier you?{" "}
                        <Link to="/signin" className="text-[#DC143C] hover:text-[#900020] font-semibold">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUpForm;