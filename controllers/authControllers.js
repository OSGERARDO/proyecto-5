
//creación del nuevo usuario y la validación de la contraseña

import userModel from '../models/userModel.js';
import { hashPassword } from '../helpers/authHelper.js';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, adress } = req.body
        //validations
        if (!name) {
            return res.send({ error: 'Nombre es requerido' })
        }
        if (!email) {
            return res.send({ error: 'Email es requerido' })
        }

        if (!password) {
            return res.send({ error: 'Password es requerido' })
        }

        if (!phone) {
            return res.send({ error: 'telefono es requerido' })
        }
        if (!adress) {
            return res.send({ error: 'dirección es requerida' })
        }

        //check user 
        const existingUser = await userModel.findOne({ email })
        //existing user 
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'ya registrado por favor inicie sesión',
            })

        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = new userModel({
            name,
            email,
            phone,
            adress,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: 'Usuario Registrado con exito',
            user,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            mesasge: 'Error en el Registro'.
                error

        })
    }
};


