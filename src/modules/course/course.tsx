import { useRouter } from "next/router";
import React from "react";

const Course = () => {
  const router = useRouter();
  const { courseName } = router.query;
  return <div>{courseName}</div>;
};

export default Course;
