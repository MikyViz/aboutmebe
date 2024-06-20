import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { syncModels } from "./database/index.js";
import UserRouter from "./routers/userRouter.js";


const port = parseInt(process.env.PORT) || process.argv[3] || 8081;
const app = express();
dotenv.config();
syncModels();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({bro:'ALOHA!!!'});
});

app.use('/users', UserRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})