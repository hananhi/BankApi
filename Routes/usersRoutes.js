import express from 'express';
import { getAllUsers ,getUser ,createNewUser,updateUser , withdrawMoney, depositMoney ,updateCredit,transafer} from '../controller/userController.js';



const router=express.Router();


router.get('/',getAllUsers);
router.get('/:id',getUser);
router.post('/',createNewUser);
router.patch('/:id',updateUser);
router.patch('/:id/withdraw',withdrawMoney);
router.patch('/:id/deposit',depositMoney);
router.patch('/:id/update',updateCredit);
router.patch('/:idFrom/trans/:idTo',transafer);


export default router;