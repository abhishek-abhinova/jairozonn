import express from 'express';

import { authAdmin } from '../middlewares/authAdmin.js';
import { addBook, getBooks } from '../controllers/book.controller.js';
import { upload } from '../config/multer.js';

const bookRouter = express.Router();

bookRouter.post("/add", upload.single("image"), authAdmin, addBook);
bookRouter.get("/get-books", getBooks);
export default bookRouter;
