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

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.updateIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Update Successfully',
    data: result,
  });
});
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.deleteFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student delete Successfully',
    data: result,
  });
});

const myCourses = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filter = pick(req.query, ['courseId', 'academicSemesterId']);
  const result = await StudentService.myCourses(user.userId, filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Courses data fetched successfully',
    data: result,
  });
});

const getMyCourseSchedules = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filter = pick(req.query, ['courseId', 'academicSemesterId']);
  const result = await StudentService.getMyCourseSchedules(user.userId, filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Schedules data fetched successfully',
    data: result,
  });
});

const myAcademicInfo = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await StudentService.getMyAcademicInfo(user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My Academic Info data fetched successfully',
    data: result,
  });
});
export const StudentController = {
  insertStudent,
  getAllStudent,
  getByIdStudent,
  updateIntoDB,
  deleteFromDB,
  myCourses,
  myAcademicInfo,
  getMyCourseSchedules,
};
