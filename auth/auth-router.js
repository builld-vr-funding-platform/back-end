const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model.js");
const validate = require("./validate");

// for endpoints beginning with /api/auth
router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post("/login",
    validate.validateLogin,
    (req, res) => {
        const { email, password } = req.body;
        console.log(req.headers)
        console.log(req.body)

        Users.findBy({ email })
            .first()
            .then(user => {
                console.log(user)
                if (user && bcrypt.compareSync(password, user.password)) {
                    const token = signedToken(user);

                    res.status(200).json({
                        id: user.id,
                        token
                    });
                }
                else {
                    res.status(401).json("Invalid credentials");
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: `${err}` });
            });
    });

// Creates token
function signedToken(user) {
    const payload = {
        subject: user.id,
        username: user.email,
    };

    const secret = process.env.JWT_SECRET || "stay secret";

    const options = {
        expiresIn: "1h"
    }

    return jwt.sign(payload, secret, options);
}
/*router.post("/login", (req, res) => {
    let { username, email, password } = req.body;

    Users.findBy({ email })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.loggedIn = true; // used in restricted middleware
                req.session.userId = user.id; // in case we need the user id later

                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                });
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({
                    you:
                        "can checkout any time you like, but you can never leave!",
                });
            } else {
                res.status(200).json({ bye: "thanks for playing" });
            }
        });
    } else {
        res.status(204);
    }
});
*/
module.exports = router;
