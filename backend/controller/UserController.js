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
    if (user.friends.includes({ friendName, friendId })) {
      return res.json({
        success: false,
        message: "Friend Already Added",
      });
    }
    user.friends.push({ friendName, friendId });
    res.status(200).json({
      success: true,
      message: "Friend Added Successfully",
    });
    user.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { query } = req.params;
    const user = await User.aggregate([
      {
        $search: {
          index: "frdSearch",
          text: {
            query: query,
            path: "name",
          },
        },
      },
      {
        $project: {
          name: 1,
        },
      },
    ]);

    res
      .status(200)
      .json({ success: true, message: "Found Users", details: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = { getFriends, addFriend, searchUsers };
