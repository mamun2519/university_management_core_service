import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseFilterableFields } from './offeredCourse.constent';
import { OfferedCourseService } from './offeredCourse.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offered Courses successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, offeredCourseFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await OfferedCourseService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offered Courses successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.getByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offered Courses fetched successfully',
    data: result,
  });
});
const updateOneIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.updateOneIntoDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offered Courses update successfully',
    data: result,
  });
});
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.deleteByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offered Courses delete successfully',
    data: result,
  });
});
export const OfferedCourseController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneIntoDB,
  deleteByIdFromDB,
};
