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
import {Logo} from "@/components/ui/logo.tsx";

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
        <div className="min-h-screen flex items-center justify-center bg-[#E9DDD4]">
            <Card className="w-full max-w-xl bg-white shadow-lg">
                <CardHeader className="space-y-4 bg-[#DC143C] rounded-t-lg p-8">
                    <div className="flex justify-center mb-6">
                        <Logo />
                    </div>
                    <CardTitle className="text-4xl font-bold text-center text-white">
                        Welcome Back
                    </CardTitle>
                    <p className="text-sm text-center text-white/80">
                        Your journey to vitality continues here
                    </p>
                </CardHeader>
                <CardContent className="mt-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-[#000000]">Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter your username"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[#900020]"/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-[#000000]">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="Enter your password"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[#900020]"/>
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-[#DC143C] hover:bg-[#900020] text-white font-semibold transition-colors duration-300"
                            >
                                Log in to your healthy journey
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-center text-sm text-[#000000]">
                        Ready to start your fitness and nutrition journey?{" "}
                        <Link to="/signup" className="text-[#DC143C] hover:text-[#900020] font-semibold">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignInForm;