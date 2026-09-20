import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 1,
            maxlength: 30,
        },

        password: {
            type: String,
            required: true,
            minlength:6,
            maxlength:100,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        }

    },

    {
        timestamps: true,
    }
)

//hashing the password before saving it to the database
userSchema.pre("save", async function() {
    if(!this.isModified("password")){
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//method to compare the password entered by the user with the hashed password stored in the database
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);