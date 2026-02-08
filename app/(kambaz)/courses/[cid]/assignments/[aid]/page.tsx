"use client";
import {
  Button,
  FormControl,
  FormSelect,
  FormCheck,
  Row,
  Col,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4">

      {/* Assignment Name */}
      <label htmlFor="wd-assignment-name" className="mb-2">
        Assignment Name
      </label>
      <FormControl
        id="wd-assignment-name"
        defaultValue="A1"
        className="mb-4"
        style={{ maxWidth: "700px" }}
      />

      {/* Description */}
      <FormControl
        id="wd-description"
        as="textarea"
        style={{ height: "250px", maxWidth: "700px" }}
        className="mb-4"
        defaultValue={
          `The assignment is available online.\n` +
          `Submit a link to the landing page of your Web application running on Vercel.\n` +
          `The landing page should include the following:\n` +
          `- Your full name and section\n` +
          `- Links to each of the lab assignments\n` +
          `- Link to the Kambaz application\n` +
          `- Links to all relevant source repositories\n` +
          `The Kambaz application should include a link to navigate back to the landing page.`
        }
      />

      <div style={{ maxWidth: "700px" }}>
        {/* Points */}
        <Row className="align-items-center mb-3">
          <Col sm={3} className="text-end">
            <label htmlFor="wd-points">Points</label>
          </Col>
          <Col sm={9}>
            <FormControl id="wd-points" defaultValue="100" />
          </Col>
        </Row>

        {/* Assignment Group */}
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

        {/* Display Grade */}
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

        {/* Submission Type */}
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

        {/* Assign Section */}
        <Row className="align-items-start mb-4">
          <Col sm={3} className="text-end">
            <label>Assign</label>
          </Col>
          <Col sm={9}>
            <div className="border rounded p-3">
              <label htmlFor="wd-assign-to" className="fw-bold mb-1">Assign to</label>
              <FormControl id="wd-assign-to" defaultValue="Everyone" className="mb-3" />

              <label htmlFor="wd-due-date" className="fw-bold mb-1">Due</label>
              <FormControl type="date" id="wd-due-date" defaultValue="2024-05-13" className="mb-3" />

              <Row>
                <Col>
                  <label htmlFor="wd-available-from" className="fw-bold mb-1">Available from</label>
                  <FormControl type="date" id="wd-available-from" defaultValue="2024-05-06" />
                </Col>
                <Col>
                  <label htmlFor="wd-available-until" className="fw-bold mb-1">Until</label>
                  <FormControl type="date" id="wd-available-until" />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Buttons */}
        <hr />
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" className="bg-light text-dark border">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </div>
    </div>
  );
}