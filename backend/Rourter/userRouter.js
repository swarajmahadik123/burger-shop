import { Router } from "express";
import { handleAuth, handleLogin, handleProducts, handleRegister } from "../controller/userController.js";

const userRouter=Router();

userRouter.route('/signup').post(handleRegister);
userRouter.route('/login').post(handleLogin);
userRouter.route('/auth').get(handleAuth);
userRouter.route('/product').get(handleProducts);


export default userRouter;