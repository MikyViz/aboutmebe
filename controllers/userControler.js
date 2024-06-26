import User from '../dataBase/models/UserModel.js';
import bcrypt from 'bcrypt';
import path from 'path';

export default class UserController {
    
    static async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists🥸' });
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = req.body;
            newUser.password = hashedPassword;
            newUser.avatar = req.file.path;
            
            const user = await User.create(newUser);

            if (user) {
                user.token = user.generateJWT();
                await user.save();
                res.status(201).json({ user });
            }

            return res.status(404).json({ msg: "💩 I tried to create the user, bro... not today..." });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
};
