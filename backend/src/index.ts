import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/usermanagment_react')
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5011;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));