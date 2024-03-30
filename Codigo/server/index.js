import express from 'express';
import 'dotenv/config'  
import userRouter from './controller/user.js'
import authRouter from './controller/auth.js';

const app = express();
const PORT = '3000';
app.use('/user',userRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log(process.env.POSTGRES_USER);
    console.log(`Listening to http://localhost:${PORT}`);
});