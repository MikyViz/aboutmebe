import UserService from '../services/userService.js'

export default class UserController {

    static async createUser(req, res) {
        try {
            const user = await UserService.createUser(req);
            if (typeof user === 'number') {
                switch (user) {
                    case 404:
                        return res.status(404).json({ msg: 'User already exists🥸' });
                        // break;
                    case 418:
                        return res.status(418).json({ msg: 'All you need is coffe☕🤠' });
                        // break;
                    case 400:
                        return res.status(400).json({ msg: "I tried to register your user, bro... but something went wrong💩" });
                        // break;
                    default:
                        break;
                }
            }
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
    static async login(req, res) {
        try {
            const user = await UserService.login(req.body);
            if (!user) {
                return res.status(404).json({ msg: "User not found🙈" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
};