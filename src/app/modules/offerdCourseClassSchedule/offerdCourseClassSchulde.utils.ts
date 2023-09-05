import { OfferdCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../prisma/prisma';
import { hasTimeConflict } from '../../../shared/utils/scheduleTime';

export const checkRoomAvailable = async (data: OfferdCourseClassSchedule) => {
  const alreadyBookRoomOnDay = await prisma.offerdCourseClassSchedule.findMany({
    where: {
      dayOfweek: data.dayOfweek,
      room: {
        id: data.roomId,
      },
    },
  });

  const existingSlots = alreadyBookRoomOnDay.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeek: schedule.dayOfweek,
  }));
  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfweek,
  };
  if (hasTimeConflict(existingSlots, newSlot)) {
    throw new ApiError(httpStatus.CONFLICT, 'Room is already booked!');
  }
};

export const checkFacultyAvailable = async (
  data: OfferdCourseClassSchedule
) => {
  const alreadyBookRoomOnDay = await prisma.offerdCourseClassSchedule.findMany({
    where: {
      dayOfweek: data.dayOfweek,
      faculty: {
        id: data.facultyId,
      },
    },
  });

  const existingSlots = alreadyBookRoomOnDay.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeek: schedule.dayOfweek,
  }));
  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfweek,
  };
  if (hasTimeConflict(existingSlots, newSlot)) {
    throw new ApiError(httpStatus.CONFLICT, 'faculty is already booked!');
  }
};
