import { Router, Request, Response } from 'express';
import { adminSignup, adminLogin, fetchData, getUserData,editUser,deleteUser,addUser, editAnUser } from '../controllers/adminController';

const router = Router();

router.post('/signup', async (req: Request, res: Response) => {
    await adminSignup(req, res);
})
  
router.post('/login', async (req: Request, res: Response) => {
    await adminLogin(req, res);
})

router.post('/data', async (req:Request, res:Response) => {
    await fetchData(req, res);
})
router.get('/get-data/:id', async (req: Request, res: Response) => {
    await getUserData(req, res);
});
router.put('/editUser', async (req: Request, res: Response) => {
    await editUser(req, res);
});

router.delete('/delete', async (req: Request, res: Response) => {
    await deleteUser(req, res);
});
router.post('/add', async (req: Request, res: Response) => {
    await addUser(req, res);
});
router.put('/editAnName/:email', async (req: Request, res: Response) => {
    await editAnUser(req, res);
});
export default router;
