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

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.updateIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Update Successfully',
    data: result,
  });
});
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.deleteFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty delete Successfully',
    data: result,
  });
});

const assignCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.assignCourse(
    req.params.id,
    req.body.courses
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course faculty assign  successfully',
    data: result,
  });
});

const removeCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.removeCourse(
    req.params.id,
    req.body.courses
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course faculty delete  successfully',
    data: result,
  });
});
const myCourses = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filter = pick(req.query, ['academicSemesterId', 'courseId']);
  const result = await FacultyService.myCourses(user, filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My courses data fetched successfully!',
    data: result,
  });
});

export const FacultyController = {
  insertFaculty,
  getAllFaculty,
  getByIdFaculty,
  updateIntoDB,
  deleteFromDB,
  assignCourse,
  removeCourse,
  myCourses,
};
