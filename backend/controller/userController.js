import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../Model/userModel.js';
import productModel from '../Model/productModel.js';
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
    console.log(process.env.SECRET_KEY); // Log the secret key
    
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
        console.log('login cookie in backend',token);

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
        console.log('cookie',token);
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

  
const handleProducts = async (req,res)=>{

    
    try {
        const products = await productModel.find({});
        console.log(products);
        res.send(products);
        
    } catch (error) {
        res.status(500).send('Internal server erroe');
        console.error(error);
    }
}


export { handleLogin, handleRegister, handleAuth , handleProducts };
