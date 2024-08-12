import { Router } from "express";
import { handleAuth, handleLogin, handleProducts, handleRegister ,handleProductDetails ,handleProtectedRoute,handleAddToCart,handleCart} from "../controller/userController.js";

const userRouter=Router();

userRouter.route('/signup').post(handleRegister);
userRouter.route('/login').post(handleLogin);
userRouter.route('/auth').get(handleAuth);
userRouter.route('/product').get(handleProducts);
userRouter.route('/productdetail/:id').get(handleProductDetails)
userRouter.route('/protectedroute').post(handleProtectedRoute);
userRouter.route('/addtocart').post(handleAddToCart)
userRouter.route('/cart').post(handleCart);

export default userRouter;