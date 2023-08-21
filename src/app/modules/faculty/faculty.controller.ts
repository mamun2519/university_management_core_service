import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constant';
import { FacultyService } from './faculty.service';

const insertFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.insertFacultyFromDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Faculty Create Successfully',
    success: true,
    data: result,
  });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await FacultyService.getAllFacultyFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Faculty Fetched Successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.getByIdFacultyFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Faculty Fetched Successfully',
    success: true,
    data: result,
  });
});

export const FacultyController = {
  insertFaculty,
  getAllFaculty,
  getByIdFaculty,
};
