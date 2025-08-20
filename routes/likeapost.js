const express = require('express');
const router = express.Router();
const Users = require('../models/Users.js');
const Posts = require('../models/Posts.js');
const Comment = require('../models/Comments.js');


    

router.post("/likeapost",async (req, res) => {

    
    try {

        
        var action = req.body.action;
        var postid = req.body.postid;
        var likerUserId = req.body.likerUser;
        
        
        var user = await Users.findById( likerUserId );
        var post = await Posts.findById( postid );

        if (action == 1){

            user.helikeposts.push(postid)
            post.likes += 1;
        } else {
            let indexLikeListTemp = user.helikeposts.indexOf(postid.toString());
            if (user.helikeposts > -1 && indexLikeListTemp != null){
                user.helikeposts -= 1;
            }
            user.helikeposts.splice(indexLikeListTemp, 1);
            // user.helikeposts.push(postid)
            post.likes -= 1;
        }

        await user.save()
        await post.save()
        // user.;
        res.redirect("/"); // change later
        return;
    } catch (err) {
        console.log(err);
        // res.render('erorr', { 
        //     erorrText : "404 User Not Found:  " + err,
        // });
    }
});

module.exports = router;
