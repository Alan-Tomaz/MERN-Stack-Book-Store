import express from "express";
import { PORT, mongoDBURL } from './config.js';

const app = express();

app.get('/', (req, res) => {
    console.log(req);
    res.status(200).send("Welcome to MERN Stack Tutorial");
})

app.listen(PORT, () => {
    console.log(`App is Listening to port: ${PORT}`);
})

Mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App Connected to Database")
    }).catch((err) => {
        console.log(err)
    })