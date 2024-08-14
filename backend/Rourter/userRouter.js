import { Router } from "express";
import { handleAuth, handleLogin, handleProducts, handleRegister ,handleProductDetails ,handleProtectedRoute,handleAddToCart,handleCart,handleCartUpdate,handleCheckout,handleremoveFromCart} from "../controller/userController.js";

const userRouter=Router();

userRouter.route('/signup').post(handleRegister);
userRouter.route('/login').post(handleLogin);
userRouter.route('/auth').get(handleAuth);
userRouter.route('/product').get(handleProducts);
userRouter.route('/productdetail/:id').get(handleProductDetails)
userRouter.route('/protectedroute').post(handleProtectedRoute);
userRouter.route('/addtocart').post(handleAddToCart)
userRouter.route('/cart').post(handleCart);
userRouter.route('/updatecart').post(handleCartUpdate);
userRouter.route('/checkout').post(handleCheckout);
userRouter.route('/removefromcart').post(handleremoveFromCart)

export default userRouter;