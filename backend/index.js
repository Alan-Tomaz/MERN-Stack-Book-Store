import express from "express";
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import booksRoute from './routes/BooksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins
app.use(cors({
    origin: 'http://localhost:5173',
    methiods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.get('/', (req, res) => {
    console.log(req);
    res.status(200).send("Welcome to MERN Stack Tutorial");
})

// import books routes
app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App Connect to Database");
        app.listen(PORT, () => {
            console.log(`App is Listening to port: ${PORT}`);
        })
    }).catch((err) => {
        console.log(err)
    })