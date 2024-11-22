import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from "@/features/shared/components/Layout";
import WorkoutTracker from "@/features/workout/components/WorkoutTrackerForm.tsx";


export default function WorkoutsPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        if (!username || !password) {
            navigate('/signin');
            return;
        }

        setIsLoading(false);
    }, [navigate]);

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-screen">
                    <div className="text-[#E9DDD4]">Loading...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6 p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#E9DDD4]"></h1>
                </div>

                <div className="max-w-4xl mx-auto">
                    <WorkoutTracker />
                </div>
            </div>
        </Layout>
    );
}