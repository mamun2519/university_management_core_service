import { OfferdCourseClassSchedule, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../prisma/prisma';
import {
  offeredCourseClassScheduleRelationalFields,
  offeredCourseClassScheduleRelationalFieldsMapper,
  offeredCourseClassScheduleSearchableFields,
} from './offerCourseClassSchedule.constant';
import { IOfferedCourseClassScheduleFilterRequest } from './offerCourseClassSchedule.interface';
import {
  checkFacultyAvailable,
  checkRoomAvailable,
} from './offerdCourseClassSchulde.utils';

const insertIntoDB = async (
  data: OfferdCourseClassSchedule
): Promise<OfferdCourseClassSchedule> => {
  await checkRoomAvailable(data);
  await checkFacultyAvailable(data);
  const result = await prisma.offerdCourseClassSchedule.create({
    data,
    include: {
      room: true,
      faculty: true,
      offerCourseSection: true,
      semesterRegistration: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IOfferedCourseClassScheduleFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OfferdCourseClassSchedule[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: offeredCourseClassScheduleSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (offeredCourseClassScheduleRelationalFields.includes(key)) {
          return {
            [offeredCourseClassScheduleRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.OfferdCourseClassScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.offerdCourseClassSchedule.findMany({
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
  const total = await prisma.offerdCourseClassSchedule.count({
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
const getByIdFromDB = async (
  id: string
): Promise<OfferdCourseClassSchedule | null> => {
  return await prisma.offerdCourseClassSchedule.findFirst({
    where: { id },
  });
};
const deleteByIdFromDB = async (
  id: string
): Promise<OfferdCourseClassSchedule | null> => {
  return await prisma.offerdCourseClassSchedule.delete({
    where: {
      id,
    },
  });
};
const updateByIdIntoDB = async (
  id: string,
  data: Partial<OfferdCourseClassSchedule>
): Promise<OfferdCourseClassSchedule | null> => {
  return await prisma.offerdCourseClassSchedule.update({
    where: {
      id,
    },
    data,
  });
};

export const OfferdCourseClassScheduleService = {
  insertIntoDB,
  getAllFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
  getByIdFromDB,
};
