const User = require("../model/UserModel");

const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req?.user?.id);
    res
      .status(200)
      .send({ success: true, message: "User Found", details: user?.friends });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const addFriend = async (req, res) => {
  try {
    const { friendName, friendId } = req.body;
    const user = await User.findById(req?.user?.id);
    user.friends.push({ friendName, friendId });
    res
      .status(200)
      .json({ success: true, message: "Friend Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getFriends, addFriend };
