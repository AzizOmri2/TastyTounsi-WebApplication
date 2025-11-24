import express from "express"
import { deleteUser, listUsers, loginUser,registerUser, updateUser } from "../controllers/userController.js"


const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/list", listUsers);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;