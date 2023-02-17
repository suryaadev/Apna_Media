import Jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // pull the token from the frontend payload and check here
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
