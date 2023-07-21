const db = require('../../database/connection');

function getAllCategories(){
    return db.query("SELECT * FROM category").then(result => result.rows)
    .catch(err=> err);
}

function getSubCategories(parent){
    return db.query('SELECT * FROM subcategory WHERE parentcat=$1', [parent]).then(result => result.rows)
    .catch(err=>err)
}

module.exports = { getAllCategories, getSubCategories};