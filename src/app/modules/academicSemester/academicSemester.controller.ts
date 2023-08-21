import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await AcademicSemesterService.createSemesterFromDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic-Semester Create Successfully',
    data: result,
  });
});

const gelAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'year', 'code']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await AcademicSemesterService.getAllSemesterFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic-Semester Fetched Successfully',
    data: result,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getSingleSemesterFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic-Semester Fetched Successfully',
    data: result,
  });
});

const updatedSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.updatedSemesterFromDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic-Semester Updated Successfully',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.deleteSemesterFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic-Semester delete Successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createSemester,
  gelAllSemester,
  getSingleSemester,
  updatedSemester,
  deleteSemester,
};
