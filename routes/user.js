const { Router } = require("express");
const { prisma } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

const userRouter = Router();

userRouter.post("/signup", async function(req, res) {
    const {email, password , firstName, lastName } = req.body;
    
    try {
        await prisma.user.create({
            data: {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            }
        });
        res.json({
            message: "Signup succeeded"
        });
    } catch (e) {
        res.status(400).json({
            message: "Signup failed",
            error: e.message
        });
    }
})

userRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
        where: {
            email: email,
            password: password
        }
    });

    if (user) {
        const token = jwt.sign ({
            id: user.id,
        }, JWT_USER_PASSWORD);

        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
})

userRouter.get("/purchases", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}