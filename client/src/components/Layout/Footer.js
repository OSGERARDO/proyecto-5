import React from 'react'
import { Link } from 'react-router-dom';


export const Footer = () => {
    return (
        <div className="footer">
            <h1 className="text-center">Todos los derechos Reservados</h1>
            <p className="text-center mt-3">
                <Link to="/about">About</Link>|<Link to="/contact">Contacto</Link>|
                <Link to="/Policy">Politica de privacidad</Link>
            </p>
        </div >
    )
}
