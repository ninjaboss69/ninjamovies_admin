
export default function ProtectedRoute({ children }) {
    const isAuthenticated = true;

    try {
        const token = localStorage.getItem("accessToken");
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        console.log("user is valid");
    } catch (e) {
        console.log(e);
        console.log("error __ ");
        window.location.href = "/login";

    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}