export type ICourseCarateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: {
    courseId: string;
  }[];
};
