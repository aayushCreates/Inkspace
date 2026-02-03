import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes';
import roomRouter from './routes/room.routes';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/room', roomRouter);


const port = 5050;
app.listen(port, ()=> {
    console.log("Server is running on port: " + port);
});
