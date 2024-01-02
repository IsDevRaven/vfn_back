require('dotenv').config({ path: './server/.env'});
const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();
const userRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes')


// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // Reemplaza con el puerto y host de tu app cliente de desarrollo
    credentials: true, // Permite credenciales, como cookies, durante las peticiones CORS
}));

app.use(express.json());
app.use(cookieParser())
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter)

connectDB()
    .then(() => {
        console.log('Server connected to DB')
    })
    .catch(err => {
        console.error('Error:', err);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});