import { AcademicDepartment, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../prisma/prisma';
import { IAcademicDepartmentFilterRequest } from './academicDepartment.interface';

const createDepartmentFromDB = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  return await prisma.academicDepartment.create({
    data,
    include: {
      academicFaculty: true,
    },
  });
};

const getAllDepartmentFromDB = async (
  filters: IAcademicDepartmentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  // search value filed
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
  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicDepartment.findMany({
    skip,
    take: limit,
    where: whereConditions,
    include: {
      academicFaculty: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {},
  });
  const total = await prisma.academicDepartment.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartmentFromDB = async (
  id: string
): Promise<AcademicDepartment | null> => {
  return await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
    },
  });
};
const updateIntoDB = async (
  id: string,
  data: Partial<AcademicDepartment>
): Promise<AcademicDepartment> => {
  return await prisma.academicDepartment.update({
    where: {
      id,
    },
    data,
  });
};

const deleteFromDB = async (id: string): Promise<AcademicDepartment> => {
  return await prisma.academicDepartment.delete({ where: { id } });
};

export const AcademicDepartmentService = {
  createDepartmentFromDB,
  getAllDepartmentFromDB,
  getSingleDepartmentFromDB,
  updateIntoDB,
  deleteFromDB,
};
