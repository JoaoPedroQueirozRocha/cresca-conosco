import express from 'express';
import 'dotenv/config'  
import userRouter from './util/user.js'

const app = express();
const PORT = '3000';
app.use('/user',userRouter)

app.listen(PORT, () => {
    console.log(process.env.POSTGRES_USER);
    console.log(`Listening to http://localhost:${PORT}`);
});