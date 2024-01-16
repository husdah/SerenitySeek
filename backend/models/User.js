const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        Fname: {
            type: String,
            trim: true,
            required: [true, "Fname is required"],
            match: /[a-zA-Z]/,
        },
        Lname: {
            type: String,
            trim: true,
            required: [true, "Lname is required"],
            match: /[a-zA-Z]/,
        },
        profilePic: {
            type: String,
            trim: true,
        }
    },
    {timestamps: true}
)

const userModel = mongoose.model("User",userSchema);
module.exports = userModel;