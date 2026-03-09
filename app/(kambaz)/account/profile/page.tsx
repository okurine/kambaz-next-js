"use client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { FormControl, FormSelect, Button } from "react-bootstrap";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const fetchProfile = () => {
    if (!currentUser) return redirect("/account/signin");
    setProfile(currentUser);
  };
  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/account/signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            defaultValue={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            id="wd-username"
            placeholder="username"
            className="mb-2"
            style={{ maxWidth: "300px" }}
          />
          <FormControl
            defaultValue={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
            id="wd-password"
            placeholder="password"
            type="password"
            className="mb-2"
            style={{ maxWidth: "300px" }}
          />
          <FormControl
            defaultValue={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            id="wd-firstname"
            placeholder="First Name"
            className="mb-2"
            style={{ maxWidth: "300px" }}
          />
          <FormControl
            defaultValue={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            id="wd-lastname"
            placeholder="Last Name"
            className="mb-2"
            style={{ maxWidth: "300px" }}
          />
          <FormControl
            defaultValue={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            id="wd-dob"
            type="date"
            className="mb-2"
            style={{ maxWidth: "300px" }}
          />
          <FormControl
            defaultValue={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            id="wd-email"
            type="email"
            className="mb-2"
            style={{ maxWidth: "300px" }}
          />
          <FormSelect
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            id="wd-role"
            className="mb-2"
            style={{ maxWidth: "300px" }}
          >
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
            <option value="TA">TA</option>
          </FormSelect>
          <Button
            onClick={signout}
            className="w-100 mb-2"
            id="wd-signout-btn"
            style={{ maxWidth: "300px" }}
          >
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
