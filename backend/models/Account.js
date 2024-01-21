const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
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
        phoneNumber:{
            type:String,
            required:true,
            trim:true,
            validation: {
                validator: function(value){
                    return /^(03|71|70|76|78|79|81)\d{6}$/.test(value);
                },
                message: "Phone number is not valid!"
            }
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
            type: Number,
            trim: true,
            required: true,
        },
        companyId: {
            type: mongoose.Types.ObjectId,
            ref: "Company",
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        verificationToken: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String
        }
    },
    {timestamps: true}
)

const accountModel = mongoose.model("Account",accountSchema);
module.exports = accountModel;