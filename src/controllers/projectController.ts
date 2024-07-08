import { Request, Response } from 'express';
import Project from '../models/Project';

interface AuthRequest extends Request {
    user?: {
        id: string;
        role: 'Client' | 'Freelancer';
    };
}

export const addProject = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, tags } = req.body;
        const project = new Project({ title, description, tags, client: req.user!.id });
        await project.save();
        res.status(201).send(project);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, client: req.user!.id },
            req.body,
            { new: true }
        );
        if (!project) {
            return res.status(404).send();
        }
        res.send(project);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const listProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find();
        res.send(projects);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
    try {
        const project = await Project.findOneAndDelete({ _id: req.params.id, client: req.user!.id });
        if (!project) {
            return res.status(404).send();
        }
        res.send(project);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const fetchProjectsByTags = async (req: Request, res: Response) => {
    try {
        const { tags } = req.query;
        const projects = await Project.find({ tags: { $in: tags } });
        res.send(projects);
    } catch (error) {
        res.status(500).send(error);
    }
};
