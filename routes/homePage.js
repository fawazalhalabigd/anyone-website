const express = require('express');
const router = express.Router();
const Product = require('../models/Posts.js');
const User = require('../models/Users.js');
const Product2 = require('../models/Comments.js');


const Posts = require('../models/Posts.js');
    


router.get("/",async (req, res) => {
    var index = req.query.index;
    if (index == null){
        index = 0;
    }
    try {
        const count = await Posts.countDocuments();
        const random = Math.floor(Math.random() * count);
        const usernamevar = req.cookies.username;
        const user = await User.findOne({ username: usernamevar });       
        var pages = await Posts.countDocuments();
        const allposts = await Posts.find().skip(index * 10).limit(10);
        const mainuser = await User.findOne({ username: usernamevar });

        var thereaccount = false;
        if (user != null){
            thereaccount = true;
        }
        res.render('homePage', {
            user:user ,
            allposts:allposts,
            thereaccount:thereaccount,
            pagesCount:pages,
            pageindex:index,
            mainuser:mainuser,
            result:false,
            key:""
        });
        for (let index = 0; index < allposts.length; index++) {
            const element = allposts[index];
            element.viwes += 1;
            element.save()
        }
        return;
    } catch (err) {
        console.log(err);
        res.send('Error');
    }
});


router.get("/result",async (req, res) => {
    const count = await Posts.countDocuments();
    const random = Math.floor(Math.random() * count);
    const usernamevar = req.cookies.username;
    const user = await User.findOne({ username: usernamevar });       
    var pages = await Posts.countDocuments();
    const mainuser = await User.findOne({ username: usernamevar });

    var thereaccount = false;
    if (user != null){
        thereaccount = true;
    }
    var keyword = req.query.key;
    var index = req.query.index;
    if (index == null){
            index = 0;
    }
    const allposts = await Posts.find({body: { $regex: keyword, $options: "im" }}).skip(index * 10).limit(10);
    res.render('homePage', {
        user:user ,
        allposts:allposts,
        thereaccount:thereaccount,
        pagesCount:pages,
        pageindex:index,
        mainuser:mainuser,
        result:true,
        key:keyword
    });

    for (let index = 0; index < allposts.length; index++) {
        const element = allposts[index];
        element.viwes += 1;
        element.save()
    }
});


module.exports = router;
