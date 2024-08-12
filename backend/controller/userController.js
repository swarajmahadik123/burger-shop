import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../Model/userModel.js';
import productModel from '../Model/productModel.js';
import cartModel from '../Model/cartModel.js';
const handleRegister = async (req, res) => {
    const { firstName, lastName, email, password } = req.body; // Change userEmail to email

    if (!firstName || !lastName || !email || !password) {
        return res.status(409).json({ message: 'Provide all required fields' });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const registeredUser = await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        console.log('User registered successfully');

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: registeredUser._id,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email
            },
        });

    } catch (error) {
        console.error('Error while registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const handleLogin = async (req, res) => {
    // console.log(process.env.SECRET_KEY); // Log the secret key

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Enter all required fields' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).send('User does not exist');
        }

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(400).send('Invalid password');
        }

        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            throw new Error('SECRET_KEY is not defined in environment variables');
        }

        const token = jwt.sign(
            { email: user.email, id: user._id },
            secretKey,
            { expiresIn: '24h' }
        );


        res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error');
    }
}

const handleAuth = async (req, res) => {
    try {
        const token = req.cookies._id;

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        res.status(200).json({ message: 'Valid token' });
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const handleProducts = async (req, res) => {


    try {
        const products = await productModel.find({});

        res.send(products);

    } catch (error) {
        res.status(500).send('Internal server erroe');
        console.error(error);
    }
}
const handleProductDetails = async (req, res) => {
    // Access the 'id' parameter from the URL
    const productId = req.params.id;

    try {
        const product = await productModel.findById(productId);
        res.status(200).send(product);
        // console.log(product);
    } catch (error) {
        res.status(500).send('Internal server error');
    }

}
const handleProtectedRoute = async (req, res) => {
    try {
        const cookie = req.body._id;
        if (!cookie) {
            return res.status(400).send({ error: 'No cookie provided' });
        }

        const decoded = jwt.verify(cookie, process.env.SECRET_KEY);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).send({ error: 'User not found' });
        }

        res.status(200).send({ success: true });
    } catch (error) {
        console.error("Error in handleProtectedRoute:", error);
        res.status(500).send({ error: 'Internal server error', });
    }
};


const handleAddToCart = async (req, res) => {

    //console.log(req.body);



    try {
        const { userId, productId, quantity } = req.body;

        const existingCart = await cartModel.findOne(({ userId }));

        if (existingCart) {
            const existingItemIndex = existingCart.items.findIndex(item => item.productId.toString() === productId.toString());
            if (existingItemIndex !== -1) {
                existingCart.items[existingItemIndex].quantity += quantity
                console.log('product is present in card quantity updated');
            } else {
                existingCart.items.push({ productId, quantity });
                console.log('new product added to cart')
            }
            await existingCart.save();
            console.log('Cart updated');
        }
        else {
            const createCart = await cartModel.create({
                userId: req.body.userId,
                items: [
                    {
                        productId: req.body.productId, // Make sure this matches the correct field name
                        quantity: req.body.quantity
                    }
                ]
            });
            console.log('new cart added');
        }
        res.status(200).json({ message: 'Cart updated successfully' });

    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


}

const handleCart = async (req, res) => {

    try {
        const userId = req.body.userId;
        
        const cart = await cartModel.findOne({ userId });



        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Extract the items from the cart
        const products = cart.items;

        // Iterate over each product in the cart
        const productList = [];
        for (let i = 0; i < products.length; i++) {
            // Find the product details using the productId
            
            const listProduct = await productModel.findOne({ _id: products[i].productId });
            const productQuantity =products[i].quantity;
            productList.push({product : listProduct ,quantity:productQuantity})
                
            }
        res.status(200).send(productList);
        
    }catch(error) {
        console.error(error);
    }
}


export { handleLogin, handleRegister, handleAuth, handleProducts, handleProductDetails, handleProtectedRoute, handleAddToCart, handleCart };
