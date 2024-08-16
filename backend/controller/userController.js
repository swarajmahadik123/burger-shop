import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../Model/userModel.js";
import productModel from "../Model/productModel.js";
import cartModel from "../Model/cartModel.js";
import ordersModel from "../Model/ordersModel.js";
const handleRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body; // Change userEmail to email

  if (!firstName || !lastName || !email || !password) {
    return res.status(409).json({ message: "Provide all required fields" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const registeredUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    console.log("User registered successfully");

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: registeredUser._id,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
      },
    });
  } catch (error) {
    console.error("Error while registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleLogin = async (req, res) => {
  // console.log(process.env.SECRET_KEY); // Log the secret key

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Enter all required fields" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(403).send("User does not exist");
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(400).send("Invalid password");
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }

    const token = jwt.sign({ email: user.email, id: user._id }, secretKey, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
};

const handleAuth = async (req, res) => {
  try {
    const token = req.cookies._id;

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(200).json({ message: "Valid token" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Handle expired token
      console.error("Token has expired:", error);
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }

    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleProducts = async (req, res) => {
  try {
    const products = await productModel.find({});

    res.send(products);
  } catch (error) {
    res.status(500).send("Internal server erroe");
    console.error(error);
  }
};
const handleProductDetails = async (req, res) => {
  // Access the 'id' parameter from the URL
  const productId = req.params.id;

  try {
    const product = await productModel.findById(productId);
    res.status(200).send(product);
    // console.log(product);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
const handleProtectedRoute = async (req, res) => {
  try {
    const cookie = req.body._id;
    if (!cookie) {
      return res.status(400).send({ error: "No cookie provided" });
    }

    const decoded = jwt.verify(cookie, process.env.SECRET_KEY);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    res.status(200).send({ success: true });
  } catch (error) {
    console.error("Error in handleProtectedRoute:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

const handleAddToCart = async (req, res) => {
  //console.log(req.body);

  try {
    const { userId, productId, quantity } = req.body;

    const existingCart = await cartModel.findOne({ userId });

    if (existingCart) {
      const existingItemIndex = existingCart.items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );
      if (existingItemIndex !== -1) {
        existingCart.items[existingItemIndex].quantity += quantity;
        console.log("product is present in card quantity updated");
      } else {
        existingCart.items.push({ productId, quantity });
        console.log("new product added to cart");
      }
      await existingCart.save();
      console.log("Cart updated");
    } else {
      const createCart = await cartModel.create({
        userId: req.body.userId,
        items: [
          {
            productId: req.body.productId, // Make sure this matches the correct field name
            quantity: req.body.quantity,
          },
        ],
      });
      console.log("new cart added");
    }
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleCart = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Fetch the cart for the given userId
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Check if the cart has items
    if (cart.items.length === 0) {
      return res.status(200).json({ message: "Cart is empty" });
    }

    // Extract the items from the cart
    const products = cart.items;

    // Initialize an array to hold product details
    const productList = [];
    for (let i = 0; i < products.length; i++) {
      try {
        // Find the product details using the productId
        const listProduct = await productModel.findOne({
          _id: products[i].productId,
        });

        if (!listProduct) {
          return res.status(404).json({ message: `Product with ID ${products[i].productId} not found` });
        }

        const productQuantity = products[i].quantity;
        productList.push({ product: listProduct, quantity: productQuantity });
      } catch (error) {
        console.error(`Error fetching product with ID ${products[i].productId}:`, error);
        return res.status(500).json({ message: "Error fetching product details" });
      }
    }

    // Respond with the list of products and their quantities
    res.status(200).send(productList);
  } catch (error) {
    console.error('Error occurred while handling cart:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const handleCartUpdate = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;
    // console.log(req.body);
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let productFound = false;
    cart.items = cart.items.map((item) => {
      if (item.productId.toString() === productId.toString()) {
        item.quantity = quantity;
        productFound = true;
      }
      return item;
    });

    if (!productFound) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Save the updated cart
    await cart.save();
  } catch (error) {
    console.log("error occured in update");
  }
};

const handleCheckout = async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    // Log request body for debugging
    console.log('body:', req.body);
    console.log('total:', total);

    // Create a new order
    const order = await ordersModel.create({
      userId: userId,
      items: items,
      total: total,
      cancel:false
    });

    await order.save();

    // Clear the user's cart after successful order creation
    await cartModel.deleteMany({ userId: userId });

    // Send a success response
    res.status(200).send({ message: 'Checkout successful and cart cleared.' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
};


const handleremoveFromCart = async (req, res) => {
  try {
   
    const { userId, productId } = req.body;

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    // Filter out the item with the matching productId
    const updatedItems = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    // If no items were removed, productId was not found
    if (updatedItems.length === cart.items.length) {
      return res.status(404).send('Product not found in cart');
    }

    cart.items = updatedItems;

    // Save the updated cart back to the database
    await cart.save();

    res.status(200).send('Product removed from cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const handleOrder = async (req, res) => {
  try {
    // Fetch all orders from the ordersModel
    const orders = await ordersModel.find({});
    res.send(orders); // Send the array of orders as the response
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
};

const handleCancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    console.log('Order ID:', orderId);

    // Find the order by ID and update the cancel field to true
    const updatedOrder = await ordersModel.findByIdAndUpdate(
      orderId, 
      { cancel: true }, 
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order successfully canceled', order: updatedOrder });
  } catch (error) {
    console.error('Error occurred while canceling order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export {
  handleLogin,
  handleRegister,
  handleAuth,
  handleProducts,
  handleProductDetails,
  handleProtectedRoute,
  handleAddToCart,
  handleCart,
  handleCartUpdate,
  handleCheckout,
  handleremoveFromCart,
  handleOrder,
  handleCancelOrder
};
