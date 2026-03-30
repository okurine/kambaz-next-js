"use client";
import * as client from "../courses/client";
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
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { setCourses } from "../courses/reducer";
import { RootState } from "../store";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  useEffect(() => {
    client.fetchAllCourses().then(setAllCourses);
  }, []);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const isEnrolled = (courseId: string) =>
    courses.some((c: any) => c._id === courseId);

  const handleEnroll = async (courseId: string) => {
    await client.enrollInCourse(courseId);
    await fetchCourses();
  };

  const handleUnenroll = async (courseId: string) => {
    await client.unenrollFromCourse(courseId);
    await fetchCourses();
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        }),
      ),
    );
  };

  const displayedCourses = showAllCourses ? allCourses : courses;

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
      </h1>
      <hr />
      {isFaculty && (
        <div className="w-25 mb-2">
          <h5>
            New Course
            <button
              onClick={onAddNewCourse}
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={onUpdateCourse}
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
      )}
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
                    {isFaculty && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          onDeleteCourse(c._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
                    )}
                    {isFaculty && (
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
                    )}
                    {isEnrolled(c._id) ? (
                      <button
                        className="btn btn-danger btn-sm me-2 float-end"
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
                        className="btn btn-success btn-sm me-2 float-end"
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
