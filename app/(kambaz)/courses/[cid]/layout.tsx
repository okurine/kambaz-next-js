"use client";
import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../../database";
import CourseNavigation from "./navigation";
import Breadcrumb from "./Breadcrumb";
import { use } from "react";

export default function CoursesLayout({ children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = use(params);
  const course = courses.find((course) => course._id === cid);
  const [showNav, setShowNav] = useState(false);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setShowNav(!showNav)}
        />
        <Breadcrumb course={course} />
      </h2>
      <hr />

      {showNav && (
        <div className="d-md-none border p-2 mb-2">
          <CourseNavigation />
        </div>
      )}

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}