const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db"); // FIX: Added courseModel import
const jwt = require("jsonwebtoken");

const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;

    await adminModel.create({
        email: email,
        password: password,
        firstName,
        lastName

    })
    res.json({
        message: "Signup succeeded"
    })
})

adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email: email,
        password: password
    });

    if (admin) {

        const token = jwt.sign(
            { id: admin._id },
            JWT_ADMIN_PASSWORD
        );

        res.json({
            token: token
        });
    } else {
        res.json({
            message: "Incorrect credentials"
        });
    }

})

adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/course", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})
adminRouter.get("/course/bulk", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}
