export type ICourseCarateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: {
    courseId: string;
  }[];
};

export type ICourseFilterRequest = {
  searchTerm?: string | undefined;
};

export type IPrerequisiteCourseRequest = {
  courseId: string;
  isDeleted?: null;
};
