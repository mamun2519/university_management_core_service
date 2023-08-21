import { AcademicFaculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../prisma/prisma';
import { IAcademicFacultyFilterRequest } from './academicFaculty.interface';

const createFacultyFromDB = async (
  data: AcademicFaculty
): Promise<AcademicFaculty> => {
  return await prisma.academicFaculty.create({ data });
};
const getAllFacultyFromDB = async (
  filters: IAcademicFacultyFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  // searching value find
  if (searchTerm) {
    andConditions.push({
      OR: ['title'].map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  // filter value find
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.AcademicFacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.academicFaculty.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {},
  });
  const total = await prisma.academicFaculty.count();
  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};

const getSingleFacultyFromDB = async (
  id: string
): Promise<AcademicFaculty | null> => {
  return await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });
};

export const AcademicFacultyService = {
  createFacultyFromDB,
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
};
