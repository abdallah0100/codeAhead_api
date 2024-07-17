const db = require('../../database/connection');
const { getUser } = require('../user/userHandlers');

const getThread = async(threadId)=>{
    return db.query('SELECT thread.threadid, thread.title, thread.content, thread.creationDate, users.username FROM thread JOIN users ON thread.threadid=$1 AND thread.authorid=users.id', [threadId])
    .then(result => result.rows).catch(err => err)
}

const createPost = async(data)=>{
    const authorData = await getUser({username: data.author});
    const d = new Date();
    let date = d.getDate() + "-"+(d.getMonth()+1)+"-"+d.getFullYear();
    return db.query('INSERT INTO thread (title,content,subcategory,authorId, creationDate) VALUES($1,$2,$3,$4,$5)', [data.title, data.content, data.category, authorData.id, date]).then(res => res.rowCount)
    .catch(err=>err);
}

const getPosts = async(subCat)=>{
    return db.query('SELECT thread.threadid, thread.title, thread.creationDate, users.username FROM thread JOIN users ON subcategory=$1 AND thread.authorid=users.id', [subCat])
    .then(result => result.rows).catch(err => err);
}

module.exports = {getThread, getPosts, createPost}