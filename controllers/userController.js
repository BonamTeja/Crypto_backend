const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const {
      Id,
      username,
      email,
      password,
      gender,
      terms,
      hobbies,
      state,
      address,
    } = req.body;
    const user = new User({
      Id,
      username,
      email,
      password,
      gender,
      terms,
      hobbies,
      state,
      address,
    });
    await user.save();
    const users = await User.find()
    res.status(201).json({ message: "User is successfully registered.", users: [...users] });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Email and password are required." });
//     }
//     const user = await User.findOne({email});
//     if(!user) {
//         return res.status(400).json({message: "Invalid Email, User not found."})
//     }
//     if(user?.password !== password) {
//         return res.status(400).json({message: "Pasword is Invalid."})
//     }
//     res.status(200).json({message: "User fetched Successfully", user: {...user}})
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }

    try {
        const users = await User.find()
        res.status(200).json({message: "Users fetched Successfully", users: [...users]})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
};

const deleteUser = async(req, res) => {
    try {
        const {email} = req.body
        console.log({email}, 'email')
        const deleteuser = await User.findOneAndDelete({ email })
        if (!deleteuser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const users = await User.find()
        console.log(users, 'users')
        // const updatedUsers = users?.map((user, index) => ({...user, Id: index+1}))
        const updatedUsers = await Promise.all(
          users.map(async (user, index) => {
              user.Id = index + 1; // Reassign Id starting from 1
              return user.save(); // Save the updated user
          })
      );
        res.status(200).json({ message: 'User deleted successfully', removedUser: deleteuser, remainingUsers: updatedUsers });
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
} 

module.exports = { createUser, getUser, deleteUser };
