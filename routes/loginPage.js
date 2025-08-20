const express = require('express');
const router = express.Router();
// const Product = require('../models/Product.js');


const User = require('../models/Users.js');;
    


router.get("/login",async (req, res) => {

    try {
        if (req.query.erorr == 1){
            
            res.render('login', { erorr:"Account dosent found" });
            return;
        }
        
        if (req.query.erorr == 2){
            
            res.render('login', { erorr:"Password wrong" });
            return;
        }
        res.render('login', { erorr:"" });
    } catch (err) {
        console.log(err);
        res.send('Error');
    }
});

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.redirect("/login?erorr=1");
//     }

//     if (user.password !== password) { // ⚠️ for real apps use bcrypt hashing
//       return res.redirect("/login?erorr=2");
//     }

//     // save username in cookie
//     res.cookie("username", user.username, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day
//     res.send("✅ Login successful! Cookie saved.");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

router.post("/login" , async (req, res) => {
    const usernamevar = req.body.username;
    const passwordvar = req.body.password;

    try {
        const user = await User.findOne({ username:usernamevar });

        if (!user) {
            console.log(req.body)
            console.log(user)
            return res.redirect("/login?erorr=1");
        }

        if (user.password != passwordvar) { // ⚠️ for real apps use bcrypt hashing
            return res.redirect("/login?erorr=2");
        }

        // save username in cookie
        res.cookie("username", user.username, { httpOnly: true}); // 30 day
        res.redirect("/profile/" + user.username)
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error  " + err);
    }
});

module.exports = router;
