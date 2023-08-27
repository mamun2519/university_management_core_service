import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../prisma/prisma';
import { ICourseCarateData } from './course.interface';

const insertIntoDB = async (data: ICourseCarateData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.create({ data: courseData });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
    }
    // insert a preRequisiteCourses
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let i = 0; i < preRequisiteCourses.length; i++) {
        await transactionClient.courseToPrerequisite.create({
          data: {
            courseId: result.id,
            preRequisiteId: preRequisiteCourses[i].courseId,
          },
        });
      }
    }
    return result;
  });

  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        preRequisite: {
          include: {
            preRequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'unable to create course');
};

export const CourseService = {
  insertIntoDB,
};
