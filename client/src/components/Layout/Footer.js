import React from 'react'
import { Link } from 'react-router-dom';


export const Footer = () => {
    return (
        <div className="footer">
            <h3 className="text-center">  Gerardo Olivares   ©    UDD 2023 </h3>
            <p className="text-center mt-3">
                <Link to="/about">Nosotros</Link>|<Link to="/contact">Contacto</Link>|
                <Link to="/Policy">Politica de privacidad</Link>
            </p>
        </div >
    )
}
