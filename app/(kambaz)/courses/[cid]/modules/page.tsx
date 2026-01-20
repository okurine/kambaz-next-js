export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <button id="wd-add-module-collapse-all">Collapse All</button>
      <button id="wd-add-module-view-progress">View Progress</button>
      <select id="wd-dropdown-publish">
        <option value="PUBLISH">Publish</option>
        <option selected value="PUBLISH-ALL">
          Publish All
        </option>
      </select>
      <button id="wd-add-module-add-module">+ Module</button>
      <ul id="wd-modules">
        {/* Course content */}
        <li className="wd-module">
          <div className="wd-title">
            Week 1, Lecture 1 - Course Introductions, Syllabus, Agenda
          </div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 1 - Introduction
                </li>
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 2 - Creating User
                </li>
              </ul>
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Introduction to Web Development
                </li>
                <li className="wd-content-item">
                  Creating an HTTP server with Node.js
                </li>
                <li className="wd-content-item">
                  Creating a React Application
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">
            Week 2, Lecture 2 - Formatting User Interface with HTML
          </div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
            </li>
            <ul className="wd-content">
              <li className="wd-content-item">
                Learn how to create user interfaces with HTML
              </li>
              <li className="wd-content-item">
                Deploy the assignment to Vercel
              </li>
            </ul>
            <span className="wd-title">SLIDES</span>
            <ul className="wd-content">
              <li className="wd-content-item">
                Introduction to HTML and the DOM
              </li>
              <li className="wd-content-item">
                Formatting Web content with Headings
              </li>
              <li className="wd-content-item">
                Formatting content with Lists and Tables
              </li>
            </ul>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
        </li>
      </ul>
    </div>
  );
}
