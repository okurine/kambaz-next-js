import { FormControl } from "react-bootstrap";
import Link from "next/link";
export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
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
        id="wd-signin-btn"
        href="/account/profile"
        className="btn btn-primary w-100 mb-2"
        style={{ maxWidth: "300px" }}
      >
        Sign in{" "}
      </Link>
      <br></br>
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>
    </div>
  );
}
