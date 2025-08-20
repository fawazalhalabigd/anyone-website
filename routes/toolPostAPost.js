const express = require('express');
const router = express.Router();
const Users = require('../models/Users.js');
const Posts = require('../models/Posts.js');


    

router.post("/toolpostapost",async (req, res) => {

    
    try {
        if (req.cookies.username != null){
        
            const user = await Users.findOne({ username: req.cookies.username });
            const post = new Posts({
                publesherUsername:user.username,
                publesherImageId:user.profileImage,
                publeshername:user.name,
                body:req.body.bodyPost,
                likes:0,
                viwes:0,
                comments:[]
            });
            await post.save()
            
            user.posts.push(post._id.toString());
            await user.save()
            res.redirect("/postPage/" +post._id);
            return;
        
        }
        if (actionvar == 1){

        } 
        
        res.redirect("/"); // change later
    } catch (err) {
        console.log(err);
        res.render('erorr', { 
            erorrText : "404 User Not Found",
        });
    }
});

module.exports = router;
