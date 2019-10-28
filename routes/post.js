const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

router.get("/", verify, async (req, res) => {
  const us = await User.findOne({ _id: req.user._id });
  console.log(us);
  res.json({
    posts: {
      title: "my first post",
      description: "random data you shouldent access",
      user: req.user,
      us : us
    }
  });
});

module.exports = router;
