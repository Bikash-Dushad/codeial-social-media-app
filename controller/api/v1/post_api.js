const Post = require('../../../models/post')

module.exports.index = async (req, res)=>{
    var post = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    return res.json(200, {
        message: " All posts",
        posts: post
    })
}