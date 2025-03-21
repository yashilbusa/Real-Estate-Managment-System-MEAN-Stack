import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
mongoose.set('debug',true);

import User from "./models/User.js";
import Property from "./models/Property.js";

import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.info('Connected to MongoDB'))
    .catch(err => console.error('Error Connecting to MongoDB', err));


app.use("/", authRoutes);
app.use("/", propertyRoutes);


app.listen(port, () => {
    console.info(`Server Running on http://localhost:${port}`);
});