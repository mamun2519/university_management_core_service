import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { StudentService } from './student.service';

const insertStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.insertStudentFromDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student Create Successfully',
    success: true,
    data: result,
  });
});

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await StudentService.getAllStudentFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student Fetched Successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  });
});

const getByIdStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getByIdStudentFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student Fetched Successfully',
    success: true,
    data: result,
  });
});

export const StudentController = {
  insertStudent,
  getAllStudent,
  getByIdStudent,
};