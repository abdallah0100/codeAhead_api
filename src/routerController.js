const httpStatus = require("http-status");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const userHandlers = require('./user/userHandlers');
const categoryHandler = require('./forum/categoryHandler');
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

const fetchCategories = catchAsync(async (req, res)=>{
    const cats = await categoryHandler.getAllCategories();
    res.status(httpStatus.OK).send(cats);
});

const fetchSubCategory = catchAsync(async (req, res)=>{
    const parentCategory = req.body.parentId;
    const result = await categoryHandler.getSubCategories(parentCategory);
    res.status(httpStatus.OK).send(result);
});

const fetchSubCatName = catchAsync(async(req, res)=>{
    const subId = req.body.id;
    const result = await categoryHandler.getSubCatName(subId);
    res.status(httpStatus.OK).send(result);
});


module.exports={handleRegister, handleLogin, fetchCategories, fetchSubCategory, fetchSubCatName};