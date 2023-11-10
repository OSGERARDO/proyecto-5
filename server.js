import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';

//configurar env
dotenv.config();




//rest object

const app = express()

//rest api

app.get('/', (req, res) => {
    res.send({
        messange: 'bienvenido al ecommerce'
    })
})

//port
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`El servidor está funcionando en modo  ${process.env.DEV_MODE} en el puerto ${PORT}`.bgCyan.white);
})

