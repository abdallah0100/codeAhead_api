const bcrypt = require("bcrypt");
const db = require('../../database/connection');

function userExist(data){
    return db.query('SELECT * FROM users WHERE username=$1', [data.username]).then((result)=>
    result.rowCount).catch(err=> err);
}

function emailExist(data){
    return db.query('SELECT * FROM users WHERE email=$1', [data.email]).then((result)=>
    result.rowCount).catch(err=> err);
}

function register(data){
    const salt = bcrypt.genSaltSync(10);//generating 10 salt rounds
    const password_hash = bcrypt.hashSync(data.password, salt);
    return db.query("INSERT INTO users(username, email, password, user_role, join_date) VALUES($1,$2,$3,$4,$5)",
    [data.username, data.email, password_hash, 'user', data.date]).then(res=> res.rowCount).catch(err=> err);   
}

const getUser = (data)=>{
    return db.query("SELECT * FROM users WHERE username=$1", [data.username])
    .then(result => result.rows[0]).catch(err=> 0);
}

module.exports = {register, userExist, emailExist, getUser};