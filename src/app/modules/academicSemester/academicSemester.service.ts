import { AcademicSemester, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../prisma/prisma';
import { IAcademicSemesterFilterRequest } from './academicSemester.interface';

const createSemesterFromDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({ data });
  return result;
};

const getAllSemesterFromDB = async (
  filters: IAcademicSemesterFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  // working for search term
  if (searchTerm) {
    andConditions.push({
      OR: ['title', 'code', 'startMonth', 'endMonth'].map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  // working for filters value
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  // declare where type
  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.academicSemester.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    include: {
      students: true,
    },
  });
  const total = await prisma.academicSemester.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleSemesterFromDB = async (
  id: string
): Promise<AcademicSemester | null> => {
  return await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });
};

const updatedSemesterFromDB = async (
  id: string,
  data: AcademicSemester
): Promise<AcademicSemester> => {
  return await prisma.academicSemester.update({
    where: {
      id,
    },
    data,
  });
};

const deleteSemesterFromDB = async (id: string): Promise<AcademicSemester> => {
  return await prisma.academicSemester.delete({
    where: {
      id,
    },
  });
};

export const AcademicSemesterService = {
  createSemesterFromDB,
  getSingleSemesterFromDB,
  getAllSemesterFromDB,
  updatedSemesterFromDB,
  deleteSemesterFromDB,
};
