
//creación del nuevo usuario y la validación de la contraseña

import userModel from '../models/userModel.js';
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        //validations
        if (!name) {
            return res.send({ message: 'Nombre es requerido' })
        }
        if (!email) {
            return res.send({ message: 'Email es requerido' })
        }

        if (!password) {
            return res.send({ message: 'Password es requerido' })
        }

        if (!phone) {
            return res.send({ message: 'telefono es requerido' })
        }
        if (!address) {
            return res.send({ message: 'dirección es requerida' })
        }
        if (!answer) {
            return res.send({ message: 'Pregunta es requerida' })
        }

        //check user 
        const existingUser = await userModel.findOne({ email })
        //existing user 
        if (existingUser) {
            res.status(200).send({
                success: false,
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
            address,
            password: hashedPassword,
            answer
        }).save();

        res.status(201).send({
            success: true,
            message: '¡Usuario Registrado con exito!',
            user,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error en el Registro',
            error

        });
    }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Email o password Invalida'
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email no esta registrado'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Password Invalida'
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d", });
        res.status(200).send({
            success: true,
            message: 'login exitoso',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error en login',
            error,
        })

    }
};

//fortgotPasswordController

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: 'email es requerido' })
        }
        if (!answer) {
            res.status(400).send({ message: 'respuesta es requerida' })
        }
        if (!newPassword) {
            res.status(400).send({ message: 'nueva contraseña es requerida' })
        }

        //check
        const user = await userModel.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'correo electrónico o respuesta incorrecta'
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reset Succesfully",
        })




    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'algo salio mal :(',
            error
        })

    }
}
//test controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};
//update prfole
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "La contraseña debe tener al menos 6 caracteres." });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Perfil actualizado con exito",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error al actualizar",
            error,
        });
    }
};