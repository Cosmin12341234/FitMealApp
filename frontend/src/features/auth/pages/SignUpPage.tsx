import SignUpForm from "@/features/auth/components/SignUpForm.tsx";

const SignUpPage = () => {
    return (
        <div className="min-h-screen bg-[#E9DDD4]">
            <div className="container mx-auto px-4 py-8">
                <SignUpForm />
            </div>
        </div>
    );
};

export default SignUpPage;