import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import SignUpPage from "@/features/auth/pages/SignUpPage"
import SignInPage from "@/features/auth/pages/SignInPage"
import WorkoutPage from "@/features/workout/pages/WorkoutPage"
import MealPage from "@/features/meal/pages/MealPage"
import { ProtectedRoute } from "@/routes/ProtectedRoutes"

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
                <Route
                    path="/meals"
                    element={
                        <ProtectedRoute>
                            <MealPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/signin" replace />} />
            </Routes>
            <Toaster richColors position="top-center" />
        </BrowserRouter>
    )
}

export default App