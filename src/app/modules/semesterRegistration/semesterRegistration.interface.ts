export type IRegistrationFilterRequest = {
  searchTerm?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  minCredit?: string | undefined;
  maxCredit?: string | undefined;
};

export type IEnrollCoursePayload = {
  offeredCourseId: string;
  offeredCourseSectionId: string;
};
