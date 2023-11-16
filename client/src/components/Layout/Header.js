import React from "react"
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";


export const Header = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        });
        localStorage.removeItem('auth')
        toast.success("Sesión cerrada con exito ;)")
    }

    return (

        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/"
                            className="navbar-brand">
                            VENTA DE GARAGE</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className="nav-link"


                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/categorias"
                                    className="nav-link"


                                >
                                    Categorias
                                </NavLink>
                            </li>
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to="/register"
                                            className="nav-link"
                                        >
                                            Registrarse
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login"
                                            className="nav-link"
                                        >
                                            iniciar sesión
                                        </NavLink>
                                    </li>
                                </>
                                ) : (
                                    <>
                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                                                    className=" dropdown-item">Mi Perfil</NavLink></li>
                                                <NavLink onClick={handleLogout} to="/login"
                                                    className="nav-link"
                                                >
                                                    salir
                                                </NavLink>
                                            </ul>
                                        </li>



                                    </>
                                )
                            }
                            <li className="nav-item">
                                <NavLink to="/cart"
                                    className="nav-link"
                                    href="#">
                                    Cart (0)
                                </NavLink>
                            </li>

                        </ul>

                    </div>
                </div >
            </nav >
        </>
    )
}

export default Header;
