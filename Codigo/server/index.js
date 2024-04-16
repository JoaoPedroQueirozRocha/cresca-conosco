import express from "express";
import cors from 'cors'
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import animalsRouter from "./routes/animalsRoutes.js";
import gestacaoRouter from "./routes/gestacaoRoutes.js";
import workerRouter from './routes/workerRoutes.js';
import gadoRouter from './routes/gadoRoutes.js';
import despesasRouter from './routes/despesasRoutes.js';
import NotificationRouter from './routes/'

const app = express();
const PORT = process.env.PORT || 3002;
app
    .use(express.json())
    .use(cors())
    .use(cors({
        origin: ['http://localhost:5173', 'http://localhost:3000', 'https://cresca-conosco.queirozrocha.com'],
        credentials: true
    }))
    .use("/user", userRouter)
    .use("/auth", authRouter)
    .use("/animals", animalsRouter)
    .use("/gestacoes", gestacaoRouter)
    .use('/worker', workerRouter)
    .use('/gado', gadoRouter)
    .use('/despesas', despesasRouter)

app.listen(PORT, () => {
    console.log(process.env.POSTGRES_USER);
    console.log(`Listening to http://localhost:${PORT}`);
});

export default app;

