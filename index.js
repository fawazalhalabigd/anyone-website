const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3000;


//anyonemaindbaccount
//Zvp9H2XE1yLaQ8mT

// قاعدة البيانات (الأفضل تحفظها بملف .env)
const dbURI = "mongodb+srv://anyonemaindbaccount:Zvp9H2XE1yLaQ8mT@anyone.ghyazpu.mongodb.net/?retryWrites=true&w=majority&appName=anyone";

// الاتصال بقاعدة البيانات
mongoose.connect(dbURI)
  .then(() => {
    runServer();
    console.log("✅ Connected to MongoDB");
  })
  .catch(err => console.error("❌ Error connecting to MongoDB:", err));


app.use(cookieParser());

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// محرك العرض (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes Define
const homePageRoute = require('./routes/homePage.js');
const createAccountPageRoute = require('./routes/createAccountPage.js');
const loginPageRoute = require('./routes/loginPage.js');
const profilePageRoute = require('./routes/profilePage.js');
const toolPostACommentRoute = require('./routes/toolPostAComment.js');
const toolPostAPostRoute = require('./routes/toolpostapost.js');
const postPageRoute = require('./routes/postPage.js');
const likeapostRoute = require('./routes/likeapost.js');

// Routes Use
app.use('/', createAccountPageRoute);
app.use('/', loginPageRoute);
app.use('/', profilePageRoute);
app.use('/', homePageRoute);
app.use('/', toolPostACommentRoute);
app.use('/', toolPostAPostRoute);
app.use('/', postPageRoute);
app.use('/', likeapostRoute);


function runServer(){

  // تشغيل السيرفر
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}
