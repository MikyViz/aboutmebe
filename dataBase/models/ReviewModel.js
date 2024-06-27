import sequelize  from "../db-sqlite.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import User from "./UserModel.js";
const Review = sequelize.define("Review", {
    reviewId: {
        type: DataTypes.UUID,
        // allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        defaultValue: () => uuidv4(),
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE
        // allowNull defaults to true
    },
    updatedAt: {
        type: DataTypes.DATE
        // allowNull defaults to true
    }
}, {
    // Other model options go here
});

// User.toJSON = function () {
//     const values = Object.assign({}, this.get());
//     delete values.password;
//     return values;
// }

User.hasMany(Review)
Review.belongsTo(User)

export default Review;