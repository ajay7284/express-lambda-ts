import { Request, Response } from "express";
import {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
} from "../services/students.service";
import { v4 as uuid } from "uuid";

// CREATE
export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = {
      id: uuid(),
      ...req.body,
      createdAt: new Date().toISOString(),
    };

    const result = await createStudentService(student);

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// GET ALL
export const getAllStudents = async (_req: Request, res: Response) => {
  try {
    const data = await getAllStudentsService();
    return res.json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// GET BY ID
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const student = await getStudentByIdService(id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    return res.json(student);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const updated = await updateStudentService(id, req.body);

    return res.json(updated);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await deleteStudentService(id);

    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
