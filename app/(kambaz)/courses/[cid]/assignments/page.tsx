"use client";
import {
  Button,
  ListGroupItem,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../modules/LessonControlButtons";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="d-flex align-items-center gap-2 mb-4">
        <InputGroup className="me-5" size="lg" style={{ maxWidth: "370px" }}>
          <InputGroup.Text>
            <HiMiniMagnifyingGlass />
          </InputGroup.Text>
          <FormControl />
        </InputGroup>

        <Button
          variant="secondary"
          size="lg"
          className="ms-2 "
          id="wd-add-module-btn"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Group
        </Button>

        <Button
          variant="danger"
          size="lg"
          className="m-1"
          id="wd-add-module-btn"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </Button>
      </div>

      <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray w-75">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="fs-3" />
          <IoMdArrowDropdown className="fs-4 me-2" />
          <span className="mt-1 fw-bold"> ASSIGNMENTS </span>
          <IoEllipsisVertical className="float-end fs-4" />
          <FaPlus className="float-end fs-4 mx-2" />
          <span
            className="badge text-dark border rounded-pill ms-2 float-end"
            style={{ backgroundColor: "#e9ecef", border: "1px solid #495057" }}
          >
            40% of Total
          </span>
        </div>

        <ListGroup className="wd-lessons rounded-0">
          <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start justify-content-between">
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center gap-2">
                <AssignmentControlButtons />
                <Link href={`/courses/1234/assignments/123`} className="text-decoration-none">
                <span>A1</span>
                </Link>
              </div>
              <div className="text-muted small ms-5">
                <span className="text-danger">Multiple Modules</span> |{" "}
                <strong>Not available until</strong> Jan 17 at 12:00am
                <br />
                <strong>Due</strong> Jan 25 at 11:59pm | 100 pts
              </div>
            </div>
            <LessonControlButtons />
          </ListGroupItem>
        </ListGroup>

        <ListGroup className="wd-lessons rounded-0">
          <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start justify-content-between">
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center gap-2">
                <AssignmentControlButtons />
                <Link href={`/courses/1234/assignments/123`} className="text-decoration-none">
                <span>A2</span>
                </Link>
              </div>
              <div className="text-muted small ms-5">
                <span className="text-danger">Multiple Modules</span> |{" "}
                <strong>Not available until</strong> May 13 at 12:00am
                <br />
                <strong>Due</strong> May 20 at 11:59pm | 100 pts
              </div>
            </div>
            <LessonControlButtons />
          </ListGroupItem>
        </ListGroup>

        <ListGroup className="wd-lessons rounded-0">
          <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start justify-content-between">
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center gap-2">
                <AssignmentControlButtons />
                <Link href={`/courses/1234/assignments/123`} className="text-decoration-none">
                <span>A3</span>
                </Link>
              </div>
              <div className="text-muted small ms-5">
                <span className="text-danger">Multiple Modules</span> |{" "}
                <strong>Not available until</strong> May 20 at 12:00am
                <br />
                <strong>Due</strong> May 27 at 11:59pm | 100 pts
              </div>
            </div>
            <LessonControlButtons />
          </ListGroupItem>
        </ListGroup>
      </ListGroupItem>
    </div>
  );
}
