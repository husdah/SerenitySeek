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
        phoneNumber: {
            type: String,
            unique: [true, "Phone number already Exist!"],
            trim: true,
            validation: {
                validator: function(value){
                    return /^(03|71|70|76|78|79|81)\d{6}$/.test(value);
                },
                message: "Phone number is not valid!"
            }
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