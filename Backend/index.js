const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const routes = require('./Routs/routes');
const connectDB = require('./DB/dbconnection');
const auth = require('./Auth/auth');
const Runcode = require('./Compiler/runn').run;
const submitCode = require('./Routs/routes').SubmitCode;
const submitModule = require('./Routs/routes').submitModule;
const createQuestion = require('./DB/createQUES').createQuestion;
const authMiddleware = require('./Middlewares/authMiddle')
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//connect to db
connectDB(process.env.MONGO_URI);
app.get('/home', routes.home);
app.post('/signup', auth.SignUp);
app.post('/signin', auth.SignIn);
app.post('/signout', auth.SignOut);
app.post('/verify-otp', auth.VerifyOTP);
app.post('/create-question', createQuestion);
app.get('/problemset',authMiddleware,routes.problemSet);
app.get('/profile',authMiddleware,routes.profile);
app.post('/runCode', Runcode);
app.post('/submitCode', authMiddleware,submitCode);
app.get('/aptimodules',authMiddleware, routes.getAllTopics);
app.post('/submitModule', submitModule);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});