const jwt = require("jsonwebtoken");

const Authorization = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const secretkey = process.env.JWT_SECRET;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }
    if (!secretkey) {
      return res
        .status(500)
        .json({ success: false, message: "No secret key provided" });
    }
    const decodedUser = jwt.verify(token.split(" ")[1], secretkey); // Split to remove "Bearer"
    if (!decodedUser) {
      return res
        .status(401)
        .json({ success: false, message: "User not decoded" });
    }
    req.user = decodedUser?.user;
    // console.log(decodedUser);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to authenticate token" });
  }
};

module.exports = Authorization;
