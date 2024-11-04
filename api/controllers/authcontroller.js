import bcrypt from 'bcrypt'


import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export const register = async (req, res) => {
    const { username, email, location, password, confirmPassword } = req.body;
  
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const newUser = new User({ username, email, location, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'Registration successful.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user.' });
    }
  }
 export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json({
          message: 'Login successful',
          user: {
            username: user.username,
            email: user.email,
            location: user.location
          }
        });
        console.log( user+"loggedin");
      } else {
        res.status(401).json({ error: 'Invalid email or password.' });

      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to log in.' });

    }
  };
 
