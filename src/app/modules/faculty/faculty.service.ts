import { Faculty, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../prisma/prisma';
import {
  facultyRelationalFields,
  facultyRelationalFieldsMapper,
  facultySearchableFields,
} from './faculty.constant';
import { IFacultyFilterRequest } from './faculty.interface';

const insertFacultyFromDB = async (data: Faculty): Promise<Faculty> => {
  return await prisma.faculty.create({
    data,
    include: {
      academicFaculty: true,
      academicDepartment: true,
    },
  });
};

const getAllFacultyFromDB = async (
  filters: IFacultyFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Faculty[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  // search value filed
  if (searchTerm) {
    andConditions.push({
      OR: facultySearchableFields.map(filed => ({
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
      AND: Object.keys(filterData).map(key => {
        if (facultyRelationalFields.includes(key)) {
          return {
            [facultyRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.FacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.faculty.findMany({
    skip,
    take: limit,
    where: whereConditions,
    include: {
      academicFaculty: true,
      academicDepartment: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {},
  });
  const total = await prisma.faculty.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFacultyFromDB = async (id: string): Promise<Faculty | null> => {
  return await prisma.faculty.findUnique({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
      academicDepartment: true,
    },
  });
};

export const FacultyService = {
  insertFacultyFromDB,
  getAllFacultyFromDB,
  getByIdFacultyFromDB,
};
