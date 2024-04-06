import express from "express";
import cors from 'cors'
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import animalsRouter from "./routes/animalsRoutes.js";
import gestacaoRouter from "./routes/gestacaoRoutes.js";
import workerRouter from './routes/workerRoutes.js';
import gadoRouter from './routes/gadoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
app
	.use(express.json())
    .use(cors())
	.use("/user", userRouter)
	.use("/auth", authRouter)
	.use("/animals", animalsRouter)
	.use("/gestacoes", gestacaoRouter)
    .use('/worker', workerRouter)
    .use('/gado', gadoRouter)

app.listen(PORT, () => {
	console.log(process.env.POSTGRES_USER);
	console.log(`Listening to http://localhost:${PORT}`);
});
