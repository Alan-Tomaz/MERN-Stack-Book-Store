import express from "express";
const router = express.Router();
import { Book } from "../models/bookModel.js";

// Route For Save a book
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Send All Required Fields: Title, Author, PublishYear" })
        } else {
            const newBook = {
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear,
            };

            const book = await Book.create(newBook);

            return res.status(201).send(book);
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: err.message });
    }
})

// Route for Get All Book From Database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json(
            {
                count: books.length,
                data: books,
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
})

// Route for Get a Book by ID From Database
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
})

// Route for Update a Book by ID From Database
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Send All Required Fields: Title, Author, PublishYear" })
        } else {
            const { id } = req.params;

            const result = await Book.findByIdAndUpdate(id, req.body);

            if (!result) {
                return res.status(404).json({ message: "Book Not Found" })
            } else {
                return res.status(200).send({ message: "Book updated Successfully" })
            }
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
})

// Route for Delete a Book by ID From Database
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Book not Found" });
        } else {
            return res.status(200).send({ message: "Book Successfully Deleted" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;