const db = require('../../database/connection');
const { getUser } = require('../user/userHandlers');

function getAllCategories(){
    return db.query("SELECT * FROM category").then(result => result.rows)
    .catch(err=> err);
}

function getSubCategories(parent){
    return db.query('SELECT * FROM subcategory WHERE parentcat=$1', [parent]).then(result => result.rows)
    .catch(err=>err)
}

function getSubCatName(id){
    return db.query('SELECT name FROM subcategory WHERE id=$1', [id]).then(result => result.rows[0])
    .catch(err => err);
}

const createPost = async(data)=>{
    const authorData = await getUser({username: data.author});
    return db.query('INSERT INTO thread (title,content,subcategory,authorId) VALUES($1,$2,$3,$4)', [data.title, data.content, data.category, authorData.id]).then(res => res.rowCount)
    .catch(err=>err);
}

const getPosts = async(subCat)=>{
    return db.query('SELECT thread.threadid, thread.title, users.username FROM thread JOIN users ON subcategory=$1 AND thread.authorid=users.id', [subCat])
    .then(result => result.rows).catch(err => err);
}

module.exports = { getAllCategories, getSubCategories, getSubCatName, createPost, getPosts};