import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import SignUpPage from "@/features/auth/pages/SignUpPage.tsx";
import SignInPage from "@/features/auth/pages/SignInPage.tsx";
import WorkoutPage from "@/features/workout/pages/WorkoutPage.tsx";
import {ProtectedRoute} from "@/routes/ProtectedRoutes.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route
                    path="/workout"
                    element={
                        <ProtectedRoute>
                            <WorkoutPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/signin" replace />} />
            </Routes>
            <Toaster richColors position="top-center" />
        </BrowserRouter>
    );
}

export default App;