"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    router.push("/account/profile");
  };

  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <FormControl
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        id="wd-username"
        placeholder="username"
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <FormControl
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        style={{ maxWidth: "300px" }}
      />
      <Button
        onClick={signup}
        id="wd-signup-btn"
        className="btn btn-primary w-100 mb-2"
        style={{ maxWidth: "300px" }}
      >
        Sign up
      </Button>
      <br />
      <Link id="wd-signin-link" href="/account/signin">
        Sign in
      </Link>
    </div>
  );
}