import { Router } from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

router.post('/', protect, admin, upload.single('image'), uploadImage);

export default router;
