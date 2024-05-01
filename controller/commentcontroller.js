var Comment = require('../models/comment')
var Post = require('../models/post')
const Like = require('../models/like')
var commentsmailer = require('../mailer/comment_mailer')

module.exports.create = async (req ,res)=>{
    var comment = req.body.comment;
    var post = await Post.findById(req.body.post)
    var user = req.cookies.user_id;
    if(post){
        var comment = await Comment.create({comment: comment, post: post, user: user});
        post.comments.push(comment);
        await post.save();
        comment = await comment.populate('user', 'name email')
        commentsmailer.newComment(comment);
        req.flash('success', "successfully comminted")
        return res.redirect('/user/homepage')
    }
}

module.exports.deletecomment = async (req, res)=>{
    var comment = await Comment.findById(req.params.id);
    var user = req.cookies.user_id
    if(comment.user == user){
        var postId = Comment.post;
        await Comment.deleteOne({ _id: comment._id });
        Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id }})
        await Like.deleteMany({likeable: comment._id, onModel: 'Comment'})
        req.flash('success', "deleted commment successfully")
        return res.redirect("back")
    }else{
        req.flash('error', "not authorized")
        return res.redirect('back')
    }
}