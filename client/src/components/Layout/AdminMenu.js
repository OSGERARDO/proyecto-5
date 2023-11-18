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

                    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
                        Productos</NavLink>

                    <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action" >
                        Ordenes
                    </NavLink>

                    <NavLink to="/dashboard/admin/users" className=" list-group-item" >
                        Usuarios</NavLink >
                </ul >
            </div >
        </ >
    )
}

export default AdminMenu
