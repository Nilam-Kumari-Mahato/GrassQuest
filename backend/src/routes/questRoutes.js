import { Router } from 'express';
import { generateQuest } from '../controllers/questController.js';

const router = Router();
router.post('/generate', generateQuest);
export default router;
