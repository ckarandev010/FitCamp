import React, { useContext, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { AuthContext } from "../../context/AuthContext";

export default function Register(props) {
  const { signIn, signUp, signOut, userState } = useContext(AuthContext);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <NavBar />
      <div>
        <div class="signin-container register">
          {/*<div class="brand-logo"></div>*/}
          <div class="brand-title">Register</div>
          <div class="inputs">
            <label>FIRST NAME</label>
            <input
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            <label>LAST NAME</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
            <label>EMAIL</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>PASSWORD</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => signUp(fname, lname, email, password)}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
