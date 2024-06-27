import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import {syncModels}  from "./dataBase/index.js";
import UserRouter from "./routers/userRouter.js";
import ReviewRouter from "./routers/reviewRouter.js";
import {fileURLToPath} from 'url';

dotenv.config();
// const port = parseInt(process.env.PORT) || process.argv[3] || 8081;
const port = 8081;
const app = express();
syncModels();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDir = path.resolve(__dirname, '..');

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
app.use('/review', ReviewRouter);

app.use('/imgs', express.static(path.join(__dirname, 'imgs')));

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})