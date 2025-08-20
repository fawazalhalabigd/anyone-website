const express = require('express');
const router = express.Router();
const Users = require('../models/Users.js');

const Posts = require('../models/Posts.js');

    


router.get("/profile/:profileid",async (req, res) => {

    try {
        
        profileid = req.params.profileid;
        const user = await Users.findOne({ username: profileid });
        
        const cookiUser = await Users.findOne({ username: req.cookies.username });

        var postslist = [];
        for (let index = 0; index < user.posts.length; index++) {
            
            var post = await Posts.findById( user.posts[index] );
            postslist.push(post);
            
        }
        
        var thereaccount = false;

        if (cookiUser != null){
            thereaccount = true;
        }
        
        res.render('profile', { 
            name :await user.name.toString() || "",
            username :await user.username || "", 
            imageId :await user.profileImage.toString(), 
            peoplelikehim :await user.likes.toString(), 
            postsnum :await user.posts.length.toString(), 
            cookiUser :await cookiUser,
            user :await cookiUser,
            allposts:await postslist,
            mainuser:cookiUser,
            thereaccount:thereaccount
        });
        if (req.cookies.username != user.username){
            for (let index = 0; index < postslist.length; index++) {
                const element = postslist[index];
                element.viwes += 1;
                element.save()
            }
        }
        return;

    } catch (err) {
        console.log(err);
        res.render('erorr', { 
            erorrText : "404 User Not Found",
        });
    }
});

router.get("/profile/",async (req, res) => {

    try {
        if (req.cookies.username == null){
            console.log(req.cookies.username)
            res.redirect("/login");
            return;
        }else {

            profileid == req.cookies.username;
        }


        res.redirect("/profile/"+ profileid)
    } catch (err) {
        console.log(err);
        res.render('erorr', { 
            erorrText : "404 User Not Found",
        });
    }
});

router.post("/profile",async (req, res) => {

    const usernamevar = req.body.MainUsername;
    const likernamevar = req.body.likerUser;
    const actionvar = req.body.action;
    console.log(usernamevar)
    try {
        console.log(req.body)
        
        
        const user = await Users.findOne({ username: usernamevar });
        const liker = await Users.findOne({ username: likernamevar });

        if (actionvar == 1){
            if (!liker.helike.includes(usernamevar)){
                console.log(1)

            
                if (!user) {
                    return res.render('erorr', { erorrText: "404 User Not Found" });
                }

                user.likes += 1;
                
                liker.helike.push(usernamevar.toString());

                await user.save();
                await liker.save();
            }
        } else if (actionvar == 2){
            console.log(2)
        
            if (!user) {
                return res.render('erorr', { erorrText: "404 User Not Found" });
            }

            
            
            let indexLikeListTemp = liker.helike.indexOf(usernamevar.toString());
            if (user.likes > -1 && indexLikeListTemp != null){
                user.likes -= 1;
            }
            liker.helike.splice(indexLikeListTemp, 1);
            await user.save();
            await liker.save();
        }
        
        res.redirect("/profile/"+ profileid);
    } catch (err) {
        console.log(err);
        res.render('erorr', { 
            erorrText : "404 User Not Found",
        });
    }
});


module.exports = router;
