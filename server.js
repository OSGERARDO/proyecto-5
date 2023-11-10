import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js';


//configurar env
dotenv.config();

//database config
connectDB();

//rest object
const app = express()

//middelwares
app.use(express.json());
app.use(morgan('dev'));

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

