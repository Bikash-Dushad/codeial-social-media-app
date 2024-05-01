const nodemailer = require('../config/nodemailer')

exports.newComment = (comment)=>{
    let htmlString = nodemailer.renderTemplate({comment:comment}, '/comments/comments_mailer.ejs')

    nodemailer.transporter.sendMail({
        from: 'offiialbikash08@gmail.com',
        to: comment.user.email,
        subject: " new comment published",
        html: htmlString
    },(err, info)=>{
        if(err){
            console.log("error in sending email", err)
            return;
        }else{
            console.log("message sent ", info);
            return
        }
    })
}