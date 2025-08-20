const express = require('express');
const router = express.Router();
const Users = require('../models/Users.js');
const Posts = require('../models/Posts.js');
const Comment = require('../models/Comments.js');


    


router.get("/postPage/:postid",async (req, res) => {

    try {
        const postid = req.params.postid;
        const post = await Posts.findById(postid);
        
        const user = await Users.findOne({ username: post.publesherUsername });
        
        var commentslistids = post.comments;
        var commentslist = [];
        for (let index = 0; index < commentslistids.length; index++) {
            const CommentProvider = await Comment.findById({_id:commentslistids[index]});
            commentslist.push(CommentProvider)
        }

        
        const usernamevar = req.cookies.username;
        const mainuser = await Users.findOne({ username: usernamevar });

        var thereaccount = false;
        if (mainuser != null){
            thereaccount = true;
        }

        res.render('postPage', { 
            postid:postid,
            publisherImageid:post.profileImage ,
            body:post.body,
            user_name:user.name,
            user_username:user.username,
            user_image_id:user.profileImage,
            user_id:user._id,
            viwes:post.viwes,
            likes:post.likes,
            commentslist:commentslist,
            thereaccount:thereaccount,
            mainuser:mainuser
        });
        return;

    } catch (err) {
        console.log(err);
        res.render('erorr', { 
            erorrText : "404 User Not Found" + err,
        });
    }
});


module.exports = router;
