import { Router, Request, Response } from 'express';
import { register, login } from '../controllers/authController';
import upload from '../config/multer';

const router = Router();

router.post('/signup', upload.single('image'),async (req: Request, res: Response) => {
  await register(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
  await login(req, res);
});



export default router;
