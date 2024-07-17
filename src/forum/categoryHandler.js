const db = require('../../database/connection');

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



module.exports = { getAllCategories, getSubCategories, getSubCatName};