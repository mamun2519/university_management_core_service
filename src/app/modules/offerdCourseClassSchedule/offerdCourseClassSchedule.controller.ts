import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseClassScheduleFilterableFields } from './offerCourseClassSchedule.constant';
import { OfferdCourseClassScheduleService } from './offerdCourseClassSchedule.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferdCourseClassScheduleService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offeredCoursesClass Schedule create successfully',
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, offeredCourseClassScheduleFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await OfferdCourseClassScheduleService.getAllFromDB(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offeredCoursesClass Schedule fetch successfully',
    data: result,
  });
});
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferdCourseClassScheduleService.deleteByIdFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offeredCoursesClass Schedule delete successfully',
    data: result,
  });
});
const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferdCourseClassScheduleService.updateByIdIntoDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offeredCoursesClass Schedule update successfully',
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferdCourseClassScheduleService.getByIdFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offeredCoursesClass Schedule fetch successfully',
    data: result,
  });
});

export const OfferdCourseClassScheduleController = {
  insertIntoDB,
  getAllFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
  getByIdFromDB,
};
