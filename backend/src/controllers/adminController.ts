import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import Admin from '../models/Admin';
import User from '../models/User';

export const adminSignup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        console.log('Admin signup request:', { email, username, password });
        
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newAdmin = new Admin({
            name: username,
            email,
            password: hashedPassword,
        });
    
        await newAdmin.save();
    
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        console.log('Admin login request:', { email, password });

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        console.log('admin password valid',isPasswordValid)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id, role:'admin'}, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        const logedAdmin = {
            name: admin.name,
            email: admin.email
          }
        res.status(200).json({ message: 'Login successful',...logedAdmin, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const fetchData = async (req:Request, res:Response) => {
    try{
        const users = await User.find();

        return res.status(200).json({
            success:true,
            message: 'Data fetched successfully',
            data: users
        })
    }catch(error:unknown) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching data',
            error: error,
        })
    }
}
export const getUserData = async (req:Request, res:Response) => {
    try{

        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        if(!user) { 
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json({
            success: true,
            message: 'fetced use data successfully',
            data: user
        })
    }catch(error:unknown) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the user',
            error: error,
        })
    }
}

export const editUser = async (req: Request, res: Response) => {
    try {
        console.log('edit user fun called');
        const { _id, name, email } = req.body;
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error: unknown) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the user',
            error: error,
        });
    }
};
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        console.log('deleting fun called', req.body)
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error: unknown) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the user',
            error: error,
        });
    }
};
export const editAnUser = async (req: Request, res: Response) => {
    console.log("edit an user fun called",editAnUser);
    const { name } = req.body;
    const { email } = req.params;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { name },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the user',
        });
    }
};

export const addUser = async (req:Request, res:Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
        success: true,
        message: 'User added successfully',
        data: newUser
    });
}

