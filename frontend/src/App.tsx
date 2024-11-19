import { Toaster } from "sonner";
import SignInForm from "@/components/SignInForm.tsx";
const App = () => {
    return (
        <>
            <SignInForm />
            <Toaster position="top-right" richColors />
        </>
    );
};

export default App;