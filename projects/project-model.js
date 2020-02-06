const db = require('../database/dbConfig.js');

module.exports = {
    add,
    find,
    update,
    remove,
    findByUserId,
    findById
};

function find() {
    return db('projects');
}

function findById(id) {
    return db('projects')
        .where({ id })
        .first();
}

async function add(project) {
    const [id] = await db('projects').insert(project);
    return id;
}

function update(id, post) {
    return db('projects')
        .where('id', Number(id))
        .update(post);
}

function remove(id) {
    return db('projects')
        .where('id', Number(id))
        .del();
}

function findByUserId(userId) {
    return db("projects")
        .where("user_id", userId);
}