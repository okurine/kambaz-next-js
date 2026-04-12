  "use client";
  import { useParams, usePathname } from "next/navigation";
  import Link from "next/link";

  export default function CourseNavigation() {
    const { cid } = useParams();
    const pathname = usePathname();

    const links = [
      { label: "Home",        path: `/courses/${cid}/home` },
      { label: "Modules",     path: `/courses/${cid}/modules` },
      { label: "Piazza",      path: "https://piazza.com/", external: true },
      { label: "Zoom",        path: "https://zoom.us/signin#/login", external: true },
      { label: "Assignments", path: `/courses/${cid}/assignments` },
      { label: "Quizzes",     path: `/courses/${cid}/quizzes` },
      { label: "Grades",      path: `/courses/${cid}/grades` },
      { label: "People",      path: `/courses/${cid}/people` },
    ];

    return (
      <div id="wd-courses-navigation" className="list-group wd fs-5 rounded-0">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.path}
            target={link.external ? "_blank" : undefined}
            className={`list-group-item border-0 
              ${pathname.includes(link.label.toLowerCase()) ? "active" : "text-danger"}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    );
  }
