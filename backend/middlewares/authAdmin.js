import jwt from 'jsonwebtoken';

export const authAdmin = (req, res, next) => {
    try {
        const { adminToken } = req.cookies;
        if (!adminToken) { return res.status(401).json({ message: "Unauthorized access", success: false });
    }
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
        if (decoded.email === process.env.ADMIN_EMAIL) {
           next();
        }
        else{
            return res.status(401).json({ message: "Unauthorized access", success: false });
        }
        
    } catch (error) {
        console.log("Error in authAdmin middleware: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};