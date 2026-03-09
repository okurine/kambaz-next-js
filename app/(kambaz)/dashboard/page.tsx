"use client";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import * as db from "../database";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enroll, unenroll } from "./enrollmentReducer";
import { RootState } from "../store";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer,
  );
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === courseId,
    );

  const handleEnroll = (courseId: string) => {
    dispatch(enroll({ userId: currentUser?._id, courseId }));
  };

  const handleUnenroll = (courseId: string) => {
    dispatch(unenroll({ userId: currentUser?._id, courseId }));
  };

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c) => isEnrolled(c._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <Button
          className="float-end"
          id="wd-enrollment-btn"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </Button>
      </h1>{" "}
      <hr />
      <div className="w-25 mb-2">
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={() => dispatch(addNewCourse(course))}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            id="wd-update-course-click"
            onClick={() => dispatch(updateCourse(course))}
          >
            Update
          </button>
        </h5>
        <br />
        <FormControl
          value={course.name}
          className="mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <FormControl
          as="textarea"
          value={course.description}
          rows={3}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
      </div>
      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/courses/${c._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        dispatch(deleteCourse(c._id));
                      }}
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </button>
                    <button
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(c);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </button>
                    {isEnrolled(c._id) ? (
                      <button
                        className="btn btn-danger me-2 float-end"
                        id="wd-unenroll-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUnenroll(c._id);
                        }}
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        className="btn btn-success me-2 float-end"
                        id="wd-enroll-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          handleEnroll(c._id);
                        }}
                      >
                        Enroll
                      </button>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
