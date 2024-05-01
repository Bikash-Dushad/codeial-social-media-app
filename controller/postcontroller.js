const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require('../models/like')

module.exports.content = async (req, res) => {
  var content = req.body.content;
  var user = req.cookies.user_id;
  console.log(content, user);
  var post = await Post.create({ content: content, user: user });
  if (post) {
    req.flash("success", "posted successfully");
    return res.redirect("back");
  }
};

module.exports.deletepost = async (req, res) => {
  var post = await Post.findById(req.params.id);
  console.log(post.user, req.cookies.user_id);
  if (post.user.toString() == req.cookies.user_id.toString()) {
    await Like.deleteMany({likeable: post, onModel: 'post'})
    await Like.deleteMany({_id: {$in: post.comments}})
    await Post.deleteOne({ _id: post._id });
    await Comment.deleteMany({ post: post._id });
    req.flash("success", "post deleted successfully");
    return res.redirect("back");
  } else {
    req.flash("error", "not authorized to delete");
    return res.redirect("back");
  }
};
