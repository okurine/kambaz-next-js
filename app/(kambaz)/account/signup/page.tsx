import { FormControl } from "react-bootstrap";
import Link from "next/link";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <Link
        id="wd-signup-btn"
        href="profile"
        className="btn btn-primary w-100 mb-2"
        style={{ maxWidth: "300px" }}
      >
        {" "}
        Sign up{" "}
      </Link>{" "}
      <br></br>
      <Link href="signin"> Sign in </Link>
    </div>
  );
}
