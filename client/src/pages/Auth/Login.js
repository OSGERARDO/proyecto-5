import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate();
    const location = useLocation();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Algo salió mal");
        }
    };
    return (
        <Layout title="Register - Ecommer App">
            <div className="card p-4 mt-4" style={{ maxWidth: '400px', margin: 'auto', backgroundColor: '#f8f9fa', border: '1px solid #ced4da' }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title mb-4">Iniciar sesión</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Ingresa tu Email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Ingresa tu Contraseña"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                navigate("/forgot-password");
                            }}
                        >
                            ¿Has olvidado tu contraseña?
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Acceder
                    </button>
                </form>
            </div>



        </Layout>
    );
};

export default Login;