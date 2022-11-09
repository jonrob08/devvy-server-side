const User = require("../models/user");

// follow and unfollow users
const Follow = async (req, res) => {
  try {
    // first we get the id of the user you want to follow
    const { followId } = req.params;
    // check if this user exists or not
    const checkUser = await User.findById(followId);
    if (!checkUser)
      return res
        .status(404)
        .json({ message: "oops this user is not found !!" });
    // get the user and update followers documents
    var getUser = await User.findById(req.user._id);
    const FollowingUser = await User.findById(followId);
    // check if you are already following the user or not
    if (getUser.following.includes(followId)) {
      getUser = await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: followId } },
        { new: true }
      );
      await FollowingUser.update({ $pull: { followers: getUser._id } });
    } else {
      getUser = await User.findByIdAndUpdate(
        req.user._id,
        { $push: { following: followId } },
        { new: true }
      );
      await FollowingUser.update({ $push: { followers: getUser._id } });
    }
    if (!getUser)
      return res.status(404).json({ message: "you don't have an account !!" });
    return res.status(200).json(getUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  Follow,
};
