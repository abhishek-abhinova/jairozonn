import jwt from 'jsonwebtoken';

export const authUser = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // send full decoded payload or decoded.id
    next();
  } catch (error) {
    console.log("Error in authUser middleware: ", error);
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

export default authUser;
