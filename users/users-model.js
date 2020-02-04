const db = require('../database/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
};

function find() {
    return db('users').select('id', 'username', 'email');
}

function findBy(filter) {
    return db('users').where(filter);
}

async function add(user) {
    const [id] = await db('users').insert(user);
    return id;
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

function update(id, post) {
    return db('users')
        .where('id', Number(id))
        .update(post);
}

function remove(id) {
    return db('users')
        .where('id', Number(id))
        .del();
}
