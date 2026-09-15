import { BrowserRouter, Routes, Route } from "react-router-dom";

import PdfWorkspace from "./pages/PdfWorkspace";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            offset: 100,
        });
    }, []);

    return (
        <BrowserRouter>
            <Routes>

                {/* Public */}
                <Route
                    path="/"
                    element={<Landing />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Protected */}
                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/workspace/pdf"
                        element={<PdfWorkspace />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;