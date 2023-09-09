import { OfferdCourseSection, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../prisma/prisma';
import { asyncForeach } from '../../../shared/utils/asyncForEach';
import {
  checkFacultyAvailable,
  checkRoomAvailable,
} from '../offerdCourseClassSchedule/offerdCourseClassSchulde.utils';
import { IOfferedCourseSectionFilterRequest } from './offeredCourseSection';
import {
  IClassSchedule,
  IOfferedCourseSectionCreate,
  offeredCourseSectionFilterableFields,
  offeredCourseSectionRelationalFields,
  offeredCourseSectionRelationalFieldsMapper,
} from './offeredCourseSection.interface';

const insertIntoDB = async (
  payload: IOfferedCourseSectionCreate
): Promise<OfferdCourseSection | null> => {
  const { classSchedules, ...data } = payload;
  const isExist = await prisma.offerdCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Offered Course Does not exist');
  }

  await asyncForeach(classSchedules, async (schedule: any) => {
    await checkRoomAvailable(schedule);
    await checkFacultyAvailable(schedule);
  });

  const offeredCourseSectionData = await prisma.offerdCourseSection.findFirst({
    where: {
      offeredCourse: {
        id: data.offeredCourseId,
      },
      title: data.title,
    },
  });

  if (offeredCourseSectionData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course Section already exist');
  }

  const createSection = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.offerdCourseSection.create({
      data: {
        title: data.title,
        maxCapacity: data.maxCapacity,
        offeredCourseId: data.offeredCourseId,
        semesterRegistrationId: isExist.semesterRegistrationId,
      },
    });
    const scheduleData = classSchedules.map((schedule: IClassSchedule) => ({
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      dayOfWeek: schedule.dayOfWeek,
      roomId: schedule.roomId,
      facultyId: schedule.facultyId,
      offeredCourseSectionId: result.id,
      semesterRegistrationId: isExist.semesterRegistrationId,
    }));
    await transactionClient.offerdCourseClassSchedule.createMany({
      data: scheduleData,
    });

    return result;
  });
  const results = await prisma.offerdCourseSection.findFirst({
    where: {
      id: createSection.id,
    },
    include: {
      offeredCourse: {
        include: {
          course: true,
        },
      },

      offerdCourseClassSchedule: {
        include: {
          room: {
            include: {
              building: true,
            },
          },
          faculty: true,
        },
      },
    },
  });

  return results;
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
