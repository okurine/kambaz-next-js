import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <br></br>

        {/* Course #2 */}
        <div className="wd-dashboard-course">
          <Link href="/courses/1235" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1235 Course 2 </h5>
              <p className="wd-dashboard-course-title">The second course</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* Course #3 */}
        <div className="wd-dashboard-course">
          <Link href="/courses/1236" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1236 Course 3 </h5>
              <p className="wd-dashboard-course-title">The third course</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/* Course #4 if I need one*/}
      </div>
    </div>
  );
}
