import User from '../dataBase/models/UserModel.js';
import bcrypt from 'bcrypt';

export default class UserController {

    static async createUser(req, res) {
        try {
            const { name, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ where: { email} });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists🥸' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = req.body;
            newUser.password = hashedPassword;

            // Create a new user
            const user = await User.create(newUser);

            // Generate a JWT token
            if (user) {
                user.token = user.generateJWT();
                await user.save();
                res.status(201).json({ user });
            }

            return res.status(404).json({ msg: "💩 I tried to create the user, bro... not today..." });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

};
