import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>
                <ul className="list-group">
                    <h4>Panel de Administración</h4>

                    <NavLink to="/dashboard/admin/create-category" className=" list-group-item">
                        Crear Categoria</NavLink >

                    < NavLink to="/dashboard/admin/create-product" className="list-group-item" >
                        Crear Producto</NavLink>

                    <NavLink to="/dashboard/admin/users" className=" list-group-item" >
                        usuarios</NavLink >
                </ul >
            </div >
        </ >
    )
}

export default AdminMenu
