const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const usersRouter = require('../users/usersRouter.js');
const projectsRouter = require('../projects/projectsRouter.js');

const session = require("express-session"); 
const KnexSessionStore = require("connect-session-knex")(session);
const server = express();
const dbConnection = require("../database/dbConfig.js");

const sessionConfig = {
    name: "cookieMonster",
    // secret is used for cookie encryption
    secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
    cookie: {
        maxAge: 1000 * 60 * 10, // 10 minutes in ms
        secure: false, // set to true in production, only send cookies over HTTPS
        httpOnly: true, // JS cannot access the cookies on the browser
    },
    resave: false,
    saveUninitialized: true, // read about it for GDPR compliance
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 60000,
    }),
};


server.use(helmet());
server.use(session(sessionConfig)); 
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);
server.use('/api/users', usersRouter);
server.use('/api/projects', projectsRouter);
server.use('/api/crud', authenticate, projectsRouter);

module.exports = server;