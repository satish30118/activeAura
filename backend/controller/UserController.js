const { findOne } = require("../model/UserModel");

const getProfile = async (req, res) => {
  try {
    const user = await findOneById(req?.user?.id);
    res
      .status(200)
      .send({ success: true, message: "User Found", details: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = getProfile;
