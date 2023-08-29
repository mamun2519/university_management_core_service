import { OfferdCourseSection, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../prisma/prisma';
import { IOfferedCourseSectionFilterRequest } from './offeredCourseSection';
import {
  offeredCourseSectionFilterableFields,
  offeredCourseSectionRelationalFields,
  offeredCourseSectionRelationalFieldsMapper,
} from './offeredCourseSection.interface';

const insertIntoDB = async (data: any): Promise<OfferdCourseSection> => {
  const isExist = await prisma.offerdCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Offered Course Does not exist');
  }

  data.semesterRegistrationId = isExist.semesterRegistrationId;
  const result = await prisma.offerdCourseSection.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IOfferedCourseSectionFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferdCourseSection[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseSectionFilterableFields.map(filed => ({
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
        if (offeredCourseSectionRelationalFields.includes(key)) {
          return {
            [offeredCourseSectionRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.OfferdCourseSectionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.offerdCourseSection.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },
    },
  });
  const total = await prisma.offerdCourseSection.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      limit,
      page,
    },
    data: result,
  };
};

const getByIdFromDB = async (
  id: string
): Promise<OfferdCourseSection | null> => {
  const result = await prisma.offerdCourseSection.findUnique({
    where: {
      id,
    },
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};
const updateOneIntoDB = async (
  id: string,
  payload: Partial<OfferdCourseSection>
): Promise<OfferdCourseSection> => {
  const result = await prisma.offerdCourseSection.update({
    where: {
      id,
    },
    data: payload,
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },
    },
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<OfferdCourseSection> => {
  const result = await prisma.offerdCourseSection.delete({ where: { id } });
  return result;
};

export const OfferedCourseSectionService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneIntoDB,
  deleteByIdFromDB,
};
