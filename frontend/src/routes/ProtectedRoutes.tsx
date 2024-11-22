import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!username || !password) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};