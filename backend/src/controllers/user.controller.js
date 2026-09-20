import { User} from "../models/users.models.js";

const registerUser = async (req,res) => {
    try {
        const {username, password, email} = req.body;

        //basic validation

        if(!username || !password || ! email) {
            return res.status(400).json({message: "All the fields are required!!!"})
        }
         //check if user already exists
        const existingUser = await User.findOne({email: email.toLowerCase().trim()});
        if (existingUser) {
            return res.status(400).json({message: "User already exists!!!"})
        }

        //create new user
        const user = await User.create(
            {
                username,
                password: password.toString(),
                email: email.toLowerCase().trim(),
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