import { OfferdCourse, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../prisma/prisma';
import { asyncForeach } from '../../../shared/utils/asyncForEach';
import {
  offeredCourseFilterableFields,
  offeredCourseRelationalFieldsMapper,
  offeredCourseSearchableFields,
} from './offeredCourse.constent';
import {
  ICreateOfferedCourse,
  IOfferedCourseFilterRequest,
} from './offeredCourse.interface';

const insertIntoDB = async (
  data: ICreateOfferedCourse
): Promise<OfferdCourse[]> => {
  const { academicDepartmentId, semesterRegistrationId, courseIds } = data;

  const result: OfferdCourse[] = [];

  await asyncForeach(courseIds, async (courseId: string) => {
    const alreadyExist = await prisma.offerdCourse.findFirst({
      where: {
        academicDepartmentId,
        semesterRegistrationId,
        courseId,
      },
    });

    if (!alreadyExist) {
      const insertData = await prisma.offerdCourse.create({
        data: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId,
        },
        include: {
          academicDepartment: true,
          semesterRegistration: true,
          course: true,
        },
      });
      console.log(insertData);

      result.push(insertData);
    }
  });
  return result;
};

const getAllFromDB = async (
  filters: IOfferedCourseFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferdCourse[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseSearchableFields.map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCourseFilterableFields.includes(key)) {
          return {
            [offeredCourseRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.OfferdCourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.offerdCourse.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.offerdCourse.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getByIdFromDB = async (id: string): Promise<OfferdCourse | null> => {
  const result = await prisma.offerdCourse.findUnique({
    where: {
      id,
    },
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });
  return result;
};
const updateOneIntoDB = async (
  id: string,
  payload: Partial<OfferdCourse>
): Promise<OfferdCourse> => {
  const result = await prisma.offerdCourse.update({
    where: {
      id,
    },
    data: payload,
    include: {
      semesterRegistration: true,
      course: true,
      academicDepartment: true,
    },
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<OfferdCourse> => {
  const result = await prisma.offerdCourse.delete({ where: { id } });
  return result;
};

export const OfferedCourseService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneIntoDB,
  deleteByIdFromDB,
};
