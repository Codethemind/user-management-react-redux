import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const file = req.file;

    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
      image: file?.path,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const login = async (req: Request, res: Response) => {
  console.log('login fun called');
  const { email, password } = req.body;
  console.log(email, password)

  const user = await User.findOne({ email });
  if (!user) {
    console.log('user not found')
    return res.status(400).json({ message: 'User not found' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ userId: user._id, userName:user, role:'normal' }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  const logedUser = {
    image:user.image,
    name: user.name,
    email: user.email
  }
  res.json({message: 'Login successful',...logedUser, token });
};
