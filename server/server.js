require('dotenv').config({ path: './server/.env'});
const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');

const app = express();
const userRouter = require('./routes/users.routes');


app.use(cors());
app.use(express.json());
app.use('/users', userRouter);

connectDB()
    .then(() => {
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch(err => {
        console.error('No se pudo conectar a MongoDB:', err);
    })