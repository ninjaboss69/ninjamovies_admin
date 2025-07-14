
export default function ProtectedRoute({ children }) {
    const isAuthenticated = true;

    // Be careful here, we cannot possible check if the user is authenticated here
    // We also cannot check with accessToken time, since we are refreshing here
    // We also cannot check wiht refreshToken time, since it is stored in cookie with httpOnly

    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            window.location.href = "/login";
        }


    } catch (e) {
        window.location.href = "/login";
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}