import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.createDepartmentFromDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Academic-Department Create Successfully',
    success: true,
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'id', 'academicFacultyId']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await AcademicDepartmentService.getAllDepartmentFromDB(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Academic-Department Fetched Successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.getSingleDepartmentFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Academic-Department Fetched Successfully',
    success: true,
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
};
