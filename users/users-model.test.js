const Users = require('./users-model.js');
const db = require('../database/dbConfig.js');

describe('users model', function () {

    describe('add()', function () {
        beforeEach(async () => {
            await db('users').truncate();
        })

        it('adds the new user to the db', async function () {
            await Users.add({ username: 'sam', 
                              password : "password",
                              email : "email" });
            const users = await db('users');
            expect(users).toHaveLength(1);
        })

    })

    describe('find()', function () {
        beforeEach(async () => {
            await db('users').truncate();
        })

        it('adds the new user to the db', async function () {
            await Users.add({
                username: 'sam',
                password: "password",
                email: "email"
            });
            const users = await Users.find();
            expect(users).toHaveLength(1);
        })

    })

    describe('findBy()', function () {
        beforeEach(async () => {
            await db('users').truncate();
        })

        it('adds the new user to the db', async function () {
            await Users.add({
                username: 'sam',
                password: "password",
                email: "email"
            });
            const users = await Users.findBy({ email: 'email'});
            expect(users).toHaveLength(1);
        })

    })

    describe('findById()', function () {
        beforeEach(async () => {
            await db('users').truncate();
        })

        it('adds the new user to the db', async function () {
            let id = await Users.add({
                username: 'sam',
                password: "password",
                email: "email"
            });
            const users = await Users.findById(id);
            expect(users.username).toBe("sam");
        })

    })

    describe('remove()', function () {
        beforeEach(async () => {
            await db('users').truncate();
        })

        it('adds the new user to the db', async function () {
           let id = await Users.add({
                username: 'sam',
                password: "password",
               email: "email"
            });
            await Users.remove(id);
            const users = await db('users');
            expect(users).toHaveLength(0);
        })

    })

    describe('update()', function () {
        beforeEach(async () => {
            await db('users').truncate();
        })

        it('adds the new user to the db', async function () {
            let id = await Users.add({
                username: 'sam',
                password: "password",
                email: "email"
            });
            await Users.update(id, { email: "mshe"});
            const users = await Users.findById(id);
            expect(users.email).toBe("mshe");
        })
    })
})