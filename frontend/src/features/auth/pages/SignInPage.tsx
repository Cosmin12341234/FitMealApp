import SignInForm from "@/features/auth/components/SignInForm.tsx";

const SignInPage = () => {
    return (
        <div className="fixed inset-0 bg-[#E9DDD4] flex items-center justify-center">
            <div className="w-full max-w-md px-4">
                <SignInForm />
            </div>
        </div>
    );
};

export default SignInPage;