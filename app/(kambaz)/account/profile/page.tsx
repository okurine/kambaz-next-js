import { FormControl, FormSelect } from "react-bootstrap";
import Link from "next/link";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <FormControl
        id="wd-username"
        defaultValue="alice"
        placeholder="username"
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <FormControl
        id="wd-password"
        defaultValue="123"
        placeholder="password"
        type="password"
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <FormControl
       id="wd-firstanem" defaultValue="Alice" placeholder="First Name" className="mb-2"
        style={{ maxWidth: "300px" }}/>
      <FormControl
        id="wd-lastname"
        defaultValue="Wonderland"
        placeholder="Last Name"
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <FormControl id="wd-dob" defaultValue="mm/dd/yyyy" type="date" className="mb-2"
        style={{ maxWidth: "300px" }}/>
   
      <FormControl id="wd-email" defaultValue="alice@wonderland" type="email"  className="mb-2"
        style={{ maxWidth: "300px" }} />
      <FormSelect id="wd-role" style={{ maxWidth: "300px" }}>
        <option value="USER" defaultChecked>
            User
          </option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
      </FormSelect>
      
      <Link id="wd-signout-btn" className="btn btn-danger w-100 mb-2" href="signin" style={{ maxWidth: "300px" }}> Sign out </Link>
    </div>
  );
}
