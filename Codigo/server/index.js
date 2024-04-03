import express from 'express';
import 'dotenv/config'  
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js';
import workerRouter from './routes/workerRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/worker', workerRouter)

app.listen(PORT, () => {
    console.log(process.env.POSTGRES_USER);
    console.log(`Listening to http://localhost:${PORT}`);
});