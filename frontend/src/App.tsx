import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import SignUpPage from "@/pages/auth/SignUpPage.tsx";
import SignInPage from "@/pages/auth/SignInPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="*" element={<Navigate to="/signin" replace />} />
            </Routes>
            <Toaster richColors position="top-center" />
        </BrowserRouter>
    );
}

export default App;