const Comment = require("../models/comment");
const Post = require("../models/post");

// add new comment
const addComment = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    if (!comment)
      return res.status(403).json({ message: "Please add some content !!" });
    // create new comment
    const newComment = new Comment({
      comment,
      user: req.user._id,
      post: postId,
    });

    if (!newComment)
      return res.status(500).json({ message: "somthing went wrong !!" });
    // save comment
    await newComment.save();
    // find post and update
    let getPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } },
      { new: true }
    );
    if (!getPost) return res.status(404).json({ message: "Post not found" });
    return res
      .status(200)
      .json(await newComment.populate("user", "username profile_pic"));
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//delete comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const getComment = await Comment.findById(commentId);
    if (!getComment)
      return res.status(404).json({ message: "Comment Not Found" });
    //check if this comment belong to signed user or not
    if (getComment.user.toString() === req.user._id.toString()) {
      //remove comment
      await getComment.remove();
      return res.status(200).json({ message: "Comment Deleted Successfully" });
    } else {
      return res
        .status(403)
        .json({ message: "this shouldn't be happening..." });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  addComment,
  deleteComment,
};
