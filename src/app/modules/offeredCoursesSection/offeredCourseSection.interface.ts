import { WeekDays } from '@prisma/client';

export const offeredCourseSectionFilterableFields: string[] = [
  'searchTerm',
  'id',
  'offeredCourseId',
  'semesterRegistrationId',
];

export const offeredCourseSectionSearchableFields: string[] = [];

export const offeredCourseSectionRelationalFields: string[] = [
  'offeredCourseId',
  'semesterRegistrationId',
];
export const offeredCourseSectionRelationalFieldsMapper: {
  [key: string]: string;
} = {
  offeredCourseId: 'offeredCourse',
  semesterRegistrationId: 'semesterRegistration',
};

export type IClassSchedule = {
  startTime: string;
  endTime: string;
  dayOfWeek: WeekDays;
  roomId: string;
  facultyId: string;
};

export type IOfferedCourseSectionCreate = {
  title: string;
  maxCapacity: number;
  offeredCourseId: string;
  classSchedules: IClassSchedule[];
};

export const daysInWeek = [
  'SATURDAY',
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
];
