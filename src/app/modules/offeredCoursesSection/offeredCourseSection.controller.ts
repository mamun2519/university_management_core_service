import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseSectionSearchableFields } from './offeredCourseSection.interface';
import { OfferedCourseSectionService } from './offeredCourseSection.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offered  Course Section Create successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, offeredCourseSectionSearchableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await OfferedCourseSectionService.getAllFromDB(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offered  Course Section successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.getByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offered  Course Section  fetched successfully',
    data: result,
  });
});
const updateOneIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.updateOneIntoDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offered  Course Section  update successfully',
    data: result,
  });
});
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseSectionService.deleteByIdFromDB(
    req.params.id
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offered  Course Section  delete successfully',
    data: result,
  });
});
export const OfferedCourseSectionController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneIntoDB,
  deleteByIdFromDB,
};
