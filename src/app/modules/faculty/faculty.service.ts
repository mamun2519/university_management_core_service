import { CourseFaculty, Faculty, Prisma } from '@prisma/client';
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

const updateIntoDB = async (
  id: string,
  data: Partial<Faculty>
): Promise<Faculty> => {
  return await prisma.faculty.update({
    where: {
      id,
    },
    data,
  });
};

const deleteFromDB = async (id: string): Promise<Faculty> => {
  return await prisma.faculty.delete({ where: { id } });
};

const assignCourse = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[]> => {
  await prisma.courseFaculty.createMany({
    data: payload.map(courseId => ({
      facultyId: id,
      courseId: courseId,
    })),
  });

  const assignCoursesData = await prisma.courseFaculty.findMany({
    where: {
      facultyId: id,
    },
    include: {
      course: true,
    },
  });

  return assignCoursesData;
};

const removeCourse = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[]> => {
  await prisma.courseFaculty.deleteMany({
    where: {
      facultyId: id,
      courseId: {
        in: payload,
      },
    },
  });
  const assignCoursesData = await prisma.courseFaculty.findMany({
    where: {
      facultyId: id,
    },
    include: {
      course: true,
    },
  });

  return assignCoursesData;
};

const myCourses = async (
  authUser: {
    userId: string;
    role: string;
  },
  filter: {
    academicSemesterId?: string | null | undefined;
    courseId?: string | null | undefined;
  }
) => {
  if (!filter.academicSemesterId) {
    const currentSemester = await prisma.academicSemester.findFirst({
      where: {
        isCurrent: true,
      },
    });

    filter.academicSemesterId = currentSemester?.id;
  }

  const offeredCourseSections = await prisma.offerdCourseSection.findMany({
    where: {
      offerdCourseClassSchedule: {
        some: {
          faculty: {
            facultyId: authUser.userId,
          },
        },
      },
      offeredCourse: {
        semesterRegistration: {
          academicSemester: {
            id: filter.academicSemesterId,
          },
        },
      },
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
        },
      },
    },
  });

  const couseAndSchedule = offeredCourseSections.reduce(
    (acc: any, obj: any) => {
      //console.log(obj)

      const course = obj.offeredCourse.course;
      const classSchedules = obj.offeredCourseClassSchedules;

      const existingCourse = acc.find(
        (item: any) => item.couse?.id === course?.id
      );
      if (existingCourse) {
        existingCourse.sections.push({
          section: obj,
          classSchedules,
        });
      } else {
        acc.push({
          course,
          sections: [
            {
              section: obj,
              classSchedules,
            },
          ],
        });
      }
      return acc;
    },
    []
  );
  return couseAndSchedule;
};

export const FacultyService = {
  insertFacultyFromDB,
  getAllFacultyFromDB,
  getByIdFacultyFromDB,
  updateIntoDB,
  deleteFromDB,
  assignCourse,
  removeCourse,
  myCourses,
};
