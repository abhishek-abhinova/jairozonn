import Book from "../models/book.model.js";

// Add a new book => /book/add
export const addBook = async (req, res) => {
    try {
        const { title, author, price, offerPrice, rating, reviews, description, category } = req.body;

        
        if (!title || !author || !price || !offerPrice || !rating || !reviews || !description || !category) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const image = req.file.filename;
        const book = await Book.create({ title, author, price, offerPrice, rating, reviews, image, description, category });
        return res.status(201).json({ message: "Book added successfully", success: true, book });
    } catch (error) {
        console.error("Error during add book:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
// Get all books => /book/get-books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({ message: "Books fetched successfully", success: true, books });
    } catch (error) {
        console.error("Error during get books:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};