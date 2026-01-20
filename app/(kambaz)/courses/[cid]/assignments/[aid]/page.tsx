export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
      
        <h3>Assignment Name</h3>
      </label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /> <br />
      <br />
      <textarea id="wd-description" cols={50} rows={11}>
        The assignment is available online Submit a link to the landing page of
        your Web application running on Vercel. The landing page should be the
        Kambaz application with a link to the Lab exercises. Lab 1 should be the
        landing page of the Lab exercises and should include the following: Your
        full name and section, Links to each of the lab assignments, Link to the
        Kambaz application, Links to all relevant source code repositories. The
        Kambaz application should include a link to navigate back to the landing
        page.
      </textarea><br /><br />

      <table>
        {/* Points Field */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        <br />

        {/* Assignment Group */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="OTHER">Other</option>
            </select>
          </td>
        </tr>
        <br />

        {/* Display Grade */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="PERCENTAGE">Percentage</option>
            </select>
          </td>
        </tr>
        <br />

        {/* Submission Type */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option selected value="ONLINE">
            Online
          </option>
          <option value="IN-PERSON">In-Person</option>
            </select>

        {/* Online Entry Options */}
            <p>Online Entry Options</p>
            <input type="checkbox" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />
            <input type="checkbox" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label>
            <br />
            <input type="checkbox" id="wd-media-recordings" />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
            <br />
            <input type="checkbox" id="wd-student-annotation" />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />
            <input type="checkbox" id="wd-file-upload" />
            <label htmlFor="wd-file-upload">File Uploads</label>
          </td>
        </tr>
        <br />

        {/* Assign To */}
        <tr>
          <td align="right" valign="top"></td>
          <td>
            <label htmlFor="wd-assign-to">Assign to</label>
            <br />
            <input
              id="wd-assign-to"
              defaultValue="Everyone"
            />
            <br /><br />

            <label htmlFor="wd-due-date">Due</label>
            <br />
            <input
              type="date"
              id="wd-due-date"
              defaultValue="2024-05-13"
            /><br /><br />

            {/* Available from */}
            <div>
              <label htmlFor="wd-available-from">Available from</label>
              <br />
              <input
                type="date"
                id="wd-available-from"
                defaultValue="2024-05-06"
              />
            </div>

            {/* Until */}
            <div>
              <label htmlFor="wd-available-until">Until</label>
              <br />
              <input
                type="date"
                id="wd-available-until"
                defaultValue="2024-05-20"
              />
            </div>
            
          </td>
        </tr>
      </table>

      {/* line on top of button */}
      <hr />

      <div>
        <button type="button">Cancel</button>
        <button type="button">Save</button>
      </div>
    </div>
  );
}
