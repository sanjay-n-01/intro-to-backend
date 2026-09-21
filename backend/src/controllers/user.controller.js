import { User} from "../models/users.models.js";

const registerUser = async (req,res) => {
    try {
        const {username, password, email} = req.body;
        const normalizedUsername = typeof username === "string" ? username.trim().toLowerCase() : "";
        const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

        //basic validation

        if(!normalizedUsername || typeof password !== "string" || !password || !normalizedEmail) {
            return res.status(400).json({message: "All the fields are required!!!"})
        }
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long."});
        }
         //check if user already exists
        const existingUser = await User.findOne({
            $or: [{email: normalizedEmail}, {username: normalizedUsername}]
        });
        if (existingUser) {
            const field = existingUser.email === normalizedEmail ? "email" : "username";
            return res.status(409).json({message: `An account with that ${field} already exists.`})
        }

        //create new user
        const user = await User.create(
            {
                username: normalizedUsername,
                password,
                email: normalizedEmail,
                loggedIn: false,
            }
        )

        res.status(201).json(
            {
                message: "User registered successfully!!!",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                }
            }
        );
    } catch(error) {
        if (error?.code === 11000) {
            const field = Object.keys(error.keyPattern || {})[0] || "username";
            return res.status(409).json({message: `An account with that ${field} already exists.`});
        }
        res.status(500).json({message: "Internal server error!!!", error: error.message})
    }
};

const loginUser = async (req,res) => {
    try{
        
        //checking if user exists
        const {email, password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if(!user){
            return res.status(400).json({message: "User not found."})
        };
         
        //compare passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials."})
        }
        res.status(200).json({message: "User logged in successfully!!!", user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }})

    } catch(error) {
        res.status(500).json({message: "Internal server error!!!", error: error.message})
    }
}

const logoutUser = async (req,res) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });
        if(!user){
            return res.status(404).json({message: "User not found."})
        };
        res.status(200).json({message: "User logged out successfully!!!"})
    } catch(error) {
        res.status(500).json({message: "Internal server error!!!", error})
    }
}

export{
    registerUser,
    loginUser,
    logoutUser
}