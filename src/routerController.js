const httpStatus = require("http-status");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const userHandlers = require('./user/userHandlers');
const catchAsync = require("./utils/catchAsync");

const JWT_SECRET = process.env.JWT_SECRET;

const handleRegister = catchAsync(async (req, res)=>{
    const userexists = await userHandlers.userExist(req.body);
    const emailexists = await userHandlers.emailExist(req.body);
    if (userexists)
        res.status(httpStatus.BAD_REQUEST).send({ msg: "* Username has already been taken"});
    else if (emailexists)
        res.status(httpStatus.BAD_REQUEST).send({ msg: "* Email has already been taken"});
    else{
        const addUser = await userHandlers.register(req.body);
        if (addUser){
            const token = jwt.sign( { role: 'user' }, JWT_SECRET);
            res.status(httpStatus.OK).send({ name: req.body.username, access_token: token })
        }
        else
            res.status(httpStatus.BAD_REQUEST).send({ msg: "* An error occured *"});
    }
});

const handleLogin = catchAsync(async (req, res)=>{
    const user = await userHandlers.getUser(req.body);
    let success = false;
    if (user){
        if (bcrypt.compareSync(req.body.password, user.password)){
            const token = jwt.sign( { role: user.user_role }, JWT_SECRET);
            success = true;
            res.status(httpStatus.OK).send({ name: user.username, access_token: token });
        }
    }
    if (!success)
        res.status(httpStatus.BAD_REQUEST).send({ msg: "* Invalid username or password." })
});


module.exports={handleRegister, handleLogin};