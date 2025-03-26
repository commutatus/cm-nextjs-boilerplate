import Course from "@/modules/course";
import { NextPage } from "next";
import React from "react";

type CoursePageProps = {};

const CoursePage: NextPage = (props: CoursePageProps) => {
  return <Course />;
};

export default CoursePage;
