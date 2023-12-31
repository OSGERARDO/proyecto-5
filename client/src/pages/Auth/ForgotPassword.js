import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");


    const navigate = useNavigate();


    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/forgot-password", {
                email,
                newPassword,
                answer

            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);


                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Algo salió mal");
        }
    };
    return (
        <Layout title={'Forgot Password - Ecommerce'}>
            <div className="form-container ">
                <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center justify-content-center mt-4">
                    <h4 className="title mb-4">Restablecer la contraseña</h4>

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
                    <div className="mb-4">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Respuesta secreta (nombre de tu mejor amig@)"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Ingresa tu Contraseña"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Restablecer
                    </button>
                </form>

            </div>
        </Layout>

    )
}

export default ForgotPassword