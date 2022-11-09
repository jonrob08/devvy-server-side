const JWT = require("jsonwebtoken");
const user = require("../models/user");

module.exports = (req, res, next) => {
  // Grab the authorization from req.headers
  const { authorization } = req.headers;
  // If there is no authorization then throw a 401 error
  if (!authorization)
    return res.status(401).json({ message: "you must be logged in !" });
  // Replace "Bearer " with an empty string, then set the rest of authorization equal to a const called Token
  const Token = authorization.replace("Bearer ", "");
  // JWT.verify has a few parameters, first it wants the token, then the "secret", then you can set options for the returned decoded verification
  JWT.verify(Token, process.env.JWT_SECRET, async (err, payload) => {
    if (err)
      // If there's an error, return a 401 and an error message
      return res.status(401).json({ message: "you must be logged in !" });
    // Grab the userId from the payload
    const { userId } = payload;
    req.user = await user.findById(userId);
    next();
  });
};
