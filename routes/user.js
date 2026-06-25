const { Router } = require("express");
<<<<<<< HEAD
const { prisma } = require("../db");
=======
const { userModel, purchaseModel, courseModel } = require("../db");
>>>>>>> 8c98ffa9152af826e812d72c7a8b192fe67471f0
const jwt = require("jsonwebtoken");
const  { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");

const userRouter = Router();

userRouter.post("/signup", async function(req, res) {
<<<<<<< HEAD
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
=======
    const { email, password, firstName, lastName } = req.body; 

    await userModel.create({
        email: email,
        password: password,
        firstName: firstName, 
        lastName: lastName
    })
    
    res.json({
        message: "Signup succeeded"
    })
>>>>>>> 8c98ffa9152af826e812d72c7a8b192fe67471f0
})

userRouter.post("/signin",async function(req, res) {
    const { email, password } = req.body;

<<<<<<< HEAD
    const user = await prisma.user.findFirst({
        where: {
            email: email,
            password: password
        }
    });

    if (user) {
        const token = jwt.sign ({
            id: user.id,
=======
    const user = await userModel.findOne({
        email: email,
        password: password
    }); 

    if (user) {
        const token = jwt.sign({
            id: user._id,
>>>>>>> 8c98ffa9152af826e812d72c7a8b192fe67471f0
        }, JWT_USER_PASSWORD);

        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
<<<<<<< HEAD
        });
    }
})
=======
        })
    }
})

userRouter.get("/purchases", userMiddleware, async function(req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })
>>>>>>> 8c98ffa9152af826e812d72c7a8b192fe67471f0

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}