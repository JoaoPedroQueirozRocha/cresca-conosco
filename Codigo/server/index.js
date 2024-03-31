import express from 'express';
import 'dotenv/config'  
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use('/user', userRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log(process.env.POSTGRES_USER);
    console.log(`Listening to http://localhost:${PORT}`);
});