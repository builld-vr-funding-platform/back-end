const Projects = require('./project-model');
const db = require('../database/dbConfig.js');

describe('Project model', function () {

    describe('add()', function () {
        beforeEach(async () => {
            await db('projects').truncate();
        })

        it('adds the new project to the db', async function () {
            await Projects.add({
                name: 'sam',
                email: "email",
                user_id : 1
            });
            const projects = await db('projects');
            expect(projects).toHaveLength(1);
        })

    })

    describe('find()', function () {
        beforeEach(async () => {
            await db('projects').truncate();
        })

        it('adds the new user to the db', async function () {
            await Projects.add({
                name: 'sam',
                email: "email",
                user_id: 1
            });
            const projects = await Projects.find();
            expect(projects).toHaveLength(1);
        })

    })

    describe('findById()', function () {
        beforeEach(async () => {
            await db('projects').truncate();
        })

        it('adds the new user to the db', async function () {
            let id = await Projects.add({
                name: 'sam',
                email: "email",
                user_id: 1
            });
            const projects = await Projects.findById(id);
            expect(projects.name).toBe("sam");
        })

    })

    describe('remove()', function () {
        beforeEach(async () => {
            await db('projects').truncate();
        })

        it('adds the new user to the db', async function () {
            let id = await Projects.add({
                name: 'sam',
                email: "email",
                user_id: 1
            });
            await Projects.remove(id);
            const projects = await db('projects');
            expect(projects).toHaveLength(0);
        })

    })

    describe('update()', function () {
        beforeEach(async () => {
            await db('projects').truncate();
        })

        it('adds the new user to the db', async function () {
            let id = await Projects.add({
                name: 'sam',
                email: "email",
                user_id: 1
            });
            await Projects.update(id, { email: "mshe" });
            const projects = await Projects.findById(id);
            expect(projects.email).toBe("mshe");
        })
    })

    describe('findByUserId()', function () {
        beforeEach(async () => {
            await db('projects').truncate();
        })

        it('adds the new user to the db', async function () {
            let id = await Projects.add({
                name: 'sam',
                email: "email",
                user_id: 1
            });
            const projects = await Projects.findByUserId(1);
            expect(projects).toHaveLength(1);
        })
    })
})