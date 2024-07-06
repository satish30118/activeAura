const jwt = require("jsonwebtoken");

const Authorization = async (req, res, next) => {
  try {
    const token = req.headers.Authorization;
    const secretkey = process.env.JWT_SECRET;
    if (!token) {
      return console.log("No Token");
    }
    if (!secretkey) {
      return console.log("No Secret key");
    }
    const decodedUser = jwt.verify(token, secretkey);
    if (!decodedUser) {
      return console.log("User not decoded");
    }
    req.user = decodedUser;
    console.log(decodedUser);
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = Authorization;
