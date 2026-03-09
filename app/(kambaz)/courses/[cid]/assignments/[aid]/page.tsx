"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { RootState } from "../../../../store";
import * as db from "../../../../database";
import Link from "next/link";
import {
  Button,
  FormControl,
  FormSelect,
  FormCheck,
  Row,
  Col,
} from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const existingAssignment = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState<any>(
    existingAssignment || { title: "New Assignment", description: "", points: 100,
      due: "", availableFrom: "", availableUntil: "", course: cid }
  );

  const save = () => {
    if (existingAssignment) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment({ ...assignment, course: cid }));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <label htmlFor="wd-assignment-name" className="mb-2">
        Assignment Name
      </label>
      <FormControl
        id="wd-assignment-name"
        value={assignment?.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        className="mb-4"
        style={{ maxWidth: "700px" }}
      />

      <FormControl
        id="wd-description"
        as="textarea"
        style={{ height: "250px", maxWidth: "700px" }}
        className="mb-4"
        value={assignment?.description}
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
      />

      <div style={{ maxWidth: "700px" }}>
        <Row className="align-items-center mb-3">
          <Col sm={3} className="text-end">
            <label htmlFor="wd-points">Points</label>
          </Col>
          <Col sm={9}>
            <FormControl id="wd-points" value={assignment?.points}
              onChange={(e) => setAssignment({ ...assignment, points: e.target.value })} />
          </Col>
        </Row>

        <Row className="align-items-center mb-3">
          <Col sm={3} className="text-end">
            <label htmlFor="wd-group">Assignment Group</label>
          </Col>
          <Col sm={9}>
            <FormSelect id="wd-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="OTHER">Other</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="align-items-center mb-3">
          <Col sm={3} className="text-end">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </Col>
          <Col sm={9}>
            <FormSelect id="wd-display-grade-as" defaultValue="PERCENTAGE">
              <option value="PERCENTAGE">Percentage</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="align-items-start mb-3">
          <Col sm={3} className="text-end">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </Col>
          <Col sm={9}>
            <div className="border rounded p-3">
              <FormSelect id="wd-submission-type" defaultValue="ONLINE" className="mb-3">
                <option value="ONLINE">Online</option>
                <option value="IN-PERSON">In-Person</option>
              </FormSelect>
              <label className="fw-bold mb-2">Online Entry Options</label>
              <FormCheck type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-2" />
              <FormCheck type="checkbox" id="wd-website-url" label="Website URL" className="mb-2" />
              <FormCheck type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-2" />
              <FormCheck type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-2" />
              <FormCheck type="checkbox" id="wd-file-upload" label="File Uploads" className="mb-2" />
            </div>
          </Col>
        </Row>

        <Row className="align-items-start mb-4">
          <Col sm={3} className="text-end">
            <label>Assign</label>
          </Col>
          <Col sm={9}>
            <div className="border rounded p-3">
              <label htmlFor="wd-assign-to" className="fw-bold mb-1">Assign to</label>
              <FormControl id="wd-assign-to" defaultValue="Everyone" className="mb-3" />
              <label htmlFor="wd-due-date" className="fw-bold mb-1">Due</label>
              <FormControl type="date" id="wd-due-date" value={assignment?.due}
                onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
                className="mb-3" />
              <Row>
                <Col>
                  <label htmlFor="wd-available-from" className="fw-bold mb-1">Available from</label>
                  <FormControl type="date" id="wd-available-from" value={assignment?.availableFrom}
                    onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })} />
                </Col>
                <Col>
                  <label htmlFor="wd-available-until" className="fw-bold mb-1">Until</label>
                  <FormControl type="date" id="wd-available-until" value={assignment?.availableUntil}
                    onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })} />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <hr />
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" className="bg-light text-dark border"
            onClick={() => router.push(`/courses/${cid}/assignments`)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={save}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}