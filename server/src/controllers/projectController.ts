import { Request, Response } from 'express';
import { Project } from '../models/project';

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send();
    }
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) {
      return res.status(404).send();
    }
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).send();
    }
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
};