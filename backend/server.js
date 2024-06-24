import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "",
}));

import authRoutes from './routes/auth.routes.js';
import homeRoutes from './routes/home.routes.js';
app.use("/api/auth",authRoutes)
app.use("/api/home",homeRoutes)

connectDB()
.then(()=>{
    app.on('error', (error) => {
        console.error('Express app encountered an error:', error);
        throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.error('Error connecting to database:', error);
})