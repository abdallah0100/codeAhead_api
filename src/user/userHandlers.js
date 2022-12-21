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
    return db.query("INSERT INTO users(username, email, password, user_role, join_date) VALUES($1,$2,$3,$4,$5)",
    [data.username, data.email, data.password, 'user', data.date]).then(res=> res.rowCount).catch(err=> err);   
}

const logIn = (data)=>{
    return db.query("SELECT * FROM users WHERE username=$1 AND password=$2", [data.username, data.password])
    .then(result=> result.rowCount > 0).catch(err=> err);
};

module.exports = {register, userExist, emailExist, logIn};