const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Please provide an Email!"],
            unique: [true, "Email Exist!"],
            trim: true,
            validate: {
                validator: function(value){
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: "Invalid email format",
            },
        },
        password: {
            type: String,
            trim: true,
            required: [true, "Please provide a Password!"],
            validate: {
                validator: function(value){
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'",<.>\/?\\[\]`~])(.{8,})$/.test(value);
                },
                message: "Invalid password format",
            },
        },
        role: {
            type: int,
            trim: true,
            required: true,
        }
    },
    {timestamps: true}
)

const userModel = mongoose.model("User",userSchema);
module.exports = userModel;