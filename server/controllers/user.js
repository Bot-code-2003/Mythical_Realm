import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const handleGet = async (req, res) => {
//   res.send("checking get of user");
// };

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // User exists, handle login

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        // Password is invalid
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Password is valid, generate JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, "secret", {
        expiresIn: "1h",
      });

      return res
        .status(200)
        .json({ message: "Login successful", token: token });
    } else {
      // User does not exist, handle signup

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        "secret",
        {
          expiresIn: "1h",
        }
      );

      return res
        .status(201)
        .json({ message: "Signup successful", token: token });
    }
  } catch (error) {
    console.error("Error handling login/signup", error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
};
