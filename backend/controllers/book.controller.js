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

// Get single book => /book/get/:id
export const getBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        
        if (!book) {
            return res.status(404).json({ message: "Book not found", success: false });
        }
        
        return res.status(200).json({ message: "Book fetched successfully", success: true, book });
    } catch (error) {
        console.error("Error during get book:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// Update book => /book/update/:id
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        // Handle image update if new file is uploaded
        if (req.file) {
            updateData.image = req.file.filename;
        }
        
        const book = await Book.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!book) {
            return res.status(404).json({ message: "Book not found", success: false });
        }
        
        return res.status(200).json({ message: "Book updated successfully", success: true, book });
    } catch (error) {
        console.error("Error during update book:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// Delete book => /book/delete/:id
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        
        if (!book) {
            return res.status(404).json({ message: "Book not found", success: false });
        }
        
        return res.status(200).json({ message: "Book deleted successfully", success: true });
    } catch (error) {
        console.error("Error during delete book:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// Toggle book stock status => /book/toggle-stock/:id
export const toggleBookStock = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        
        if (!book) {
            return res.status(404).json({ message: "Book not found", success: false });
        }
        
        book.inStock = !book.inStock;
        await book.save();
        
        return res.status(200).json({ 
            message: `Book ${book.inStock ? 'marked as in stock' : 'marked as out of stock'}`, 
            success: true, 
            book 
        });
    } catch (error) {
        console.error("Error during toggle stock:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};