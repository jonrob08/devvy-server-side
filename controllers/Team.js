const Team = require('../models/team')
const User = require('../models/user')

// View team by User ID 
const GetTeam = async (req, res) => {
    try {
      // get user by params of id (other users on platform)
      const getMyTeam = await User.findById(req.params.userId)
      if (!getMyTeam) return res.status(404).json({ message: "team not found!!" });
      console.log(getMyTeam)
      return res.status(200).json(getMyTeam);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
// Create a new team by User ID

// Edit a team by ID

// Remove a Team by ID

module.exports = {
    GetTeam
  };