import express from 'express';
import { getAllData } from '../controllers/data.controller.js';

const router = express.Router();

// GET /api/data - Fetch all data
router.get('/data', getAllData);

export default router;
