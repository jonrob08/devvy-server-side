const express = require("express");
const { Follow } = require('../controllers/temp-follow');
const {
  UserInfo,
  ProfileInfo,
  allUsers,
  editUser,
} = require("../controllers/user");
const Auth = require("../middleware/Auth");
const uploadOptions = require("../middleware/uploads");

const UserRoute = express.Router();
// get all users
UserRoute.get("/all", Auth, allUsers);
// follow and unfollow users
UserRoute.put("/follow/:followId", Auth, Follow);
// get user profile data (signed in user)
UserRoute.get("/profile", Auth, ProfileInfo);
// get other users info
UserRoute.get("/:userId", Auth, UserInfo);
// edit user
UserRoute.put(
  "/edit",
  Auth,
  uploadOptions.fields([
    { name: "profile_pic", maxCount: 1 },
    { name: "cover_pic", maxCount: 1 },
  ]),
  editUser
);

module.exports = UserRoute;
