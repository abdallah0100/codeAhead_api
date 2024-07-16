const db = require('../../database/connection');

const getThread = async(threadId)=>{
    return db.query('SELECT * FROM thread WHERE threadid=$1', [threadId])
    .then(result => result.rows).catch(err => err)
}

module.exports = {getThread}