const httpStatus = require("http-status");
const userHandlers = require('./user/userHandlers');
const catchAsync = require("./utils/catchAsync");

// const handleRegister = catchAsync( async (req, res))=>{
//     console.log(userHandlers.userExist(req.body));
//     if (userHandlers.userExist(req.body) > 0) res.status(httpStatus.BAD_REQUEST).send({statusCode: httpStatus.BAD_REQUEST, msg: "* Username has already been taken"});
//     else if (userHandlers.emailExist(req.body) > 0) res.status(httpStatus.BAD_REQUEST).send({statusCode: httpStatus.BAD_REQUEST, msg: "* Email has already been taken"});
//     else if (userHandlers.register(req.body) > 0) res.status(httpStatus.OK).send({ statusCode: httpStatus.ok, msg: "Account created" })
//     else res.status(httpStatus.BAD_REQUEST).send({statusCode: httpStatus.BAD_REQUEST, msg: "* An error occured *"});
// };

const handleRegister = catchAsync(async (req, res)=>{
    const userexists = await userHandlers.userExist(req.body);
    const emailexists = await userHandlers.emailExist(req.body);
    if (userexists > 0)
        res.status(httpStatus.BAD_REQUEST).send({statusCode: httpStatus.BAD_REQUEST, msg: "* Username has already been taken"});
    else if (emailexists > 0)
        res.status(httpStatus.BAD_REQUEST).send({statusCode: httpStatus.BAD_REQUEST, msg: "* Email has already been taken"});
    else{
        const addUser = await userHandlers.register(req.body);
        if (addUser > 0)
            res.status(httpStatus.OK).send({ statusCode: httpStatus.ok, msg: "Account created" })
        else
            res.status(httpStatus.BAD_REQUEST).send({statusCode: httpStatus.BAD_REQUEST, msg: "* An error occured *"});
    }
});


module.exports={handleRegister};