const express = require('express');
const router = express.Router();
const Users = require('../models/Users.js');
const Posts = require('../models/Posts.js');
const Comment = require('../models/Comments.js');


    

router.post("/toolpostacomment",async (req, res) => {

    
    try {
        
        // const user = await Users.findOne({ username: req.cookies.username });
        const post = await Posts.findById(req.body.postId);
        const users = await Users.findById(req.body.publisherid);
        const comment = new Comment({
            body:req.body.bodyComment,
            publisherImageid:users.profileImage,
            publisherusername:users.username,
            publisherid:users._id,
            publishername:users.name
        });
        
        await comment.save()
        
        post.comments.push(comment._id.toString());
        await post.save()
        
        res.redirect("/postPage/" +req.body.postId);
        return;
        
        // res.redirect("/"); // change later
    } catch (err) {
        console.log(err);
        res.render('erorr', { 
            erorrText : "404 User Not Found:  " + err,
        });
    }
});

module.exports = router;
