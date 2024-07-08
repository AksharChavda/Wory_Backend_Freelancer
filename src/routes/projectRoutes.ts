import express from 'express';
import { addProject, updateProject, listProjects, deleteProject, fetchProjectsByTags } from '../controllers/projectController';
import authenticateJWT from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateJWT, addProject);
router.put('/projects/:id', authenticateJWT, updateProject);
router.get('/getall', listProjects);
router.delete('/projects/:id', authenticateJWT, deleteProject);
router.get('/tags', fetchProjectsByTags);

export default router;
