import { Prisma, Student } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../prisma/prisma';
import {
  studentRelationalFields,
  studentRelationalFieldsMapper,
  studentSearchableFields,
} from './student.constant';
import { IStudentFilterRequest } from './student.interface';

const insertStudentFromDB = async (data: Student): Promise<Student> => {
  return await prisma.student.create({
    data,
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    },
  });
};

const getAllStudentFromDB = async (
  filters: IStudentFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  // search value filed
  if (searchTerm) {
    andConditions.push({
      OR: studentSearchableFields.map(filed => ({
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
        if (studentRelationalFields.includes(key)) {
          return {
            [studentRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    skip,
    take: limit,
    where: whereConditions,
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {},
  });
  const total = await prisma.student.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdStudentFromDB = async (id: string): Promise<Student | null> => {
  return await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    },
  });
};

const updateIntoDB = async (
  id: string,
  data: Partial<Student>
): Promise<Student> => {
  return await prisma.student.update({
    where: {
      id,
    },
    data,
  });
};

const deleteFromDB = async (id: string): Promise<Student> => {
  return await prisma.student.delete({ where: { id } });
};
export const StudentService = {
  insertStudentFromDB,
  getAllStudentFromDB,
  getByIdStudentFromDB,
  updateIntoDB,
  deleteFromDB,
};
