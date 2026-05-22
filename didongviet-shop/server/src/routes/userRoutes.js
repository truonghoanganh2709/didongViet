import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);

router.get('/', admin, getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', admin, deleteUser);

export default router;
