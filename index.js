require('dotenv').config()
const express = require("express");
const { prisma } = require("./db");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);


async function main (){
    await prisma.$connect();
    console.log("Connected to PostgreSQL database via Prisma client");
    app.listen(3000);
    console.log("listening on port 3000")
}

main()
