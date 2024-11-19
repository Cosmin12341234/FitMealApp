"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "@/apis/auth/AuthService";
import { LoginRequest } from "@/utils/types";
import { capitalizeString } from "@/lib/utils";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.too_small) {
        if (issue.type === "string") {
            return { message: capitalizeString(issue.path.toString()) + " is too short!" };
        }
    }
    return { message: ctx.defaultError };
};

const FormSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(32,"Username must be at most 32 characters"),
    password: z.string().min(3, "Password must be at least 3 characters").max(32,"Password must be at most 32 characters"),
});

z.setErrorMap(customErrorMap);

const SignInForm = () => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            const { status, message } = await AuthService.login(data as LoginRequest);

            if (status === 200) {
                toast.success("Login successful!", {
                    description: message,
                });
                navigate("/dashboard");
            } else {
                toast.error("Login failed", {
                    description: message,
                });
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred", {
                description: "Please try again later",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4ebd0]">
            <Card className="w-full max-w-md bg-white shadow-lg">
                <CardHeader className="space-y-1 bg-[#d6ad60] rounded-t-lg">
                    <CardTitle className="text-2xl font-bold text-center text-[#122620]">
                        Login to FitMeal
                    </CardTitle>
                </CardHeader>
                <CardContent className="mt-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#122620]">Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="border-[#b68d40] focus:border-[#d6ad60] focus:ring-[#d6ad60]"
                                                placeholder="Enter your username"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#122620]">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                className="border-[#b68d40] focus:border-[#d6ad60] focus:ring-[#d6ad60]"
                                                placeholder="Enter your password"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-[#b68d40] hover:bg-[#d6ad60] text-[#122620] font-semibold transition-colors duration-300"
                            >
                                Log in
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-center text-sm text-[#122620]">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-[#b68d40] hover:underline font-semibold">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignInForm;