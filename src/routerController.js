const httpStatus = require("http-status");
const userHandlers = require('./user/userHandlers');
const catchAsync = require("./utils/catchAsync");

const handleRegister = catchAsync(async (req, res)=>{
    const userexists = await userHandlers.userExist(req.body);
    const emailexists = await userHandlers.emailExist(req.body);
    if (userexists > 0)
        res.status(httpStatus.BAD_REQUEST).send({ msg: "* Username has already been taken"});
    else if (emailexists > 0)
        res.status(httpStatus.BAD_REQUEST).send({ msg: "* Email has already been taken"});
    else{
        const addUser = await userHandlers.register(req.body);
        if (addUser > 0)
            res.status(httpStatus.OK).send({ msg: "Account created" })
        else
            res.status(httpStatus.BAD_REQUEST).send({ msg: "* An error occured *"});
    }
});

const handleLogin = catchAsync(async (req, res)=>{
    const login = await userHandlers.logIn(req.body);
    if (login) res.status(httpStatus.OK).send({ msg: "successful login" });
    else res.status(httpStatus.BAD_REQUEST).send({ msg: "* Invalid username or password." })
});


module.exports={handleRegister, handleLogin};