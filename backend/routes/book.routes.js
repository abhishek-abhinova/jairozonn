import express from 'express';
import { authAdmin } from '../middlewares/authAdmin.js';
import { 
    addBook, 
    getBooks, 
    getBook, 
    updateBook, 
    deleteBook, 
    toggleBookStock 
} from '../controllers/book.controller.js';
import { upload } from '../config/multer.js';

const bookRouter = express.Router();

// Public routes
bookRouter.get("/get-books", getBooks);
bookRouter.get("/get/:id", getBook);

// Admin routes
bookRouter.post("/add", upload.single("image"), authAdmin, addBook);
bookRouter.put("/update/:id", upload.single("image"), authAdmin, updateBook);
bookRouter.delete("/delete/:id", authAdmin, deleteBook);
bookRouter.patch("/toggle-stock/:id", authAdmin, toggleBookStock);

export default bookRouter;
