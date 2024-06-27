import User from '../dataBase/models/UserModel.js';
import bcrypt from 'bcrypt';
import path from 'path';
export default class UserService {

    static async createUser(req) {
        try {
            const { firstName, lastName, email, password } = req.body;

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return 404;
            }

            if (firstName === '🫖' || email === '🫖' || lastName === '🫖') return 418

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = req.body;
            newUser.password = hashedPassword;
            newUser.avatar = req.file ? req.file.path : null;

            const user = await User.create(newUser);

            if (user) {
                user.token = user.generateJWT();
                await user.save();
                return user
            }

            return 400;
        } catch (error) {
            throw new Error(error);
        }
    };
    static async login({email, password}) {
        try {
            const user = await User.findOne({ where: { email: email } });
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    user.token = user.generateJWT();
                    await user.save();
                    console.log("login is OK👌");
                    return user;
                }
            }
            return null;
        } catch (error) {
            throw new Error(error);
        }
    }
};
