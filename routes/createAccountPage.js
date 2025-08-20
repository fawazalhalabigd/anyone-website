const express = require('express');
const router = express.Router();
// const Product = require('../models/Product.js');

const avatarNumber = 28;

    
const User = require('../models/Users.js');;


router.get("/newAccount",async (req, res) => {

    try {
        // const products = await Product.find().lean();
        res.render('createAccount', {
            avatarNumber : avatarNumber,
        });
    } catch (err) {
        console.log(err);
        res.send('Error');
    }
});

router.post("/newAccount" , async (req, res) => {
    const usernamevar = req.body.username;
    const namevar = req.body.name;
    const profileImagevar = req.body.profileImage;
    const passwordvar = req.body.password;

    try {
        const user = new User({
            username:usernamevar,
            name:namevar,
            profileImage:profileImagevar,
            password:passwordvar,
        });

        // save username in cookie
        user.save()
        res.cookie("username", user.username, { httpOnly: true}); // 30 day
        res.redirect("/profile/" + user.username)
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error  " + err);
    }
});

module.exports = router;
