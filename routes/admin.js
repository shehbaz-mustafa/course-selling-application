const { Router } = require("express");
const adminRouter = Router();
const { prisma } = require("../db");
const jwt = require ("jsonwebtoken");  
 
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async function(req, res) {
    const {email, password , firstName, lastName } = req.body;
    
    try {
        await prisma.admin.create({
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

adminRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    const admin = await prisma.admin.findFirst({
        where: {
            email: email,
            password: password
        }
    });

    if (admin) {
        const token = jwt.sign(
            { id: admin.id },
            JWT_ADMIN_PASSWORD
        );

        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
})

adminRouter.post("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;
    const {title, description, imageUrl ,price} = req.body;

    try {
        const course = await prisma.course.create({
            data: {
                title: title, 
                description: description,
                imageUrl: imageUrl,
                price: parseFloat(price),
                creatorId: adminId
            }
        });

        res.json({
            message: "Course created",
            courseId: course.id
        });
    } catch (e) {
        res.status(400).json({
            message: "Failed to create course",
            error: e.message
        });
    }
})

adminRouter.put("/course", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})
adminRouter.get("/course/bulk", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}
