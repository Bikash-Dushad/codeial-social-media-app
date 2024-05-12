const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')
const fs = require('fs')
const path = require('path')

module.exports.signuppage = (req, res) => {
    return res.render("signup");
}

module.exports.signup = async (req, res) => {
    var name = req.body.name;
    var email = req.body.email
    var password = req.body.password
    var confirm_password = req.body.confirm_password;

    if (password != confirm_password) {
        req.flash('error', "password doesnot match")
        return res.redirect("back")
    } else {
        var user = await User.findOne({ email });
        if (user) {
            console.log("User already exists")
            req.flash('success', "Email address already exists")
            return res.redirect("/user/signuppage")
        } else {
            var user = await User.create({ name: name, email: email, password: password });
            console.log(user);
            req.flash('success', "signup successfull")
            return res.redirect("/user/signinpage")
        }
    }
}

module.exports.signinpage = async (req, res) => {
    if(req.cookies.user_id){
        return res.redirect('/user/homepage')
    }else{
        req.flash('error', "signin first")
        return res.render('signin');
    }
}

module.exports.signin = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password
    console.log(password)
    var user = await User.findOne({ email });
    if (user) {
        if (password == user.password) {
            res.cookie('user_id', user.id)
            req.flash('success', "signin successfull")
            return res.redirect('/user/homepage')
        } else {
            console.log("password doesnot matched")
            req.flash('error', "Invalid user/password")
            return res.redirect('back')
        }
    } else {
        console.log("Email doesnot exist");
        req.flash('error', "Email doesnot exist")
        return res.redirect('/user/signuppage')
    }
}

module.exports.homepage = async (req, res)=>{
    if(req.cookies.user_id){
        var user = await User.findById(req.cookies.user_id);
        if(user){
            var alluser = await User.find({})
            var post = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'
                }
            }).populate('likes')
                return res.render('profile',{
                    user: user,
                    post_list: post,
                    alluser: alluser
            })
        }else{
            console.log("user not found or not authorized");
            req.flash('error', "signin first")
            return res.redirect("/user/signinpage")
        }
    }else{
        req.flash('error', "signin first")
        return res.redirect("/user/signinpage")
    }
}
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}


module.exports.logout = async (req, res)=>{
    if(req.cookies.user_id){
        res.clearCookie('user_id');
        req.flash('success', "loged out successfully")
        return res.redirect('/user/signinpage')
    }else{
        req.flash('error', "signin first")
        return res.redirect('back')
    }
}

module.exports.updatePage = async (req, res)=>{
    if(req.cookies.user_id){
        var user = await User.findById(req.cookies.user_id);
        return res.render("updateProfile",{
            user:user
        })
    }
}

module.exports.updateProfile = async (req, res)=>{
    try {
        var user = await User.findById(req.params.id);
        await User.uploadedAvatar(req, res, async function(err){
            if(err){
                console.log("multer error", err)
                req.flash('error', "Failed to Update");
            }
            user.name = req.body.name;
            user.email = req.body.email;
            if(req.file){
                if(user.file){
                    fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                }
                console.log(req.file)
                user.avatar = User.avatarPath+ '/' + req.file.filename
            }
            await user.save();
            req.flash('success', 'Profile updated successfully');
            return res.redirect("/user/homepage")
        })
    } catch (error) {
        console.log(error)
    }
}