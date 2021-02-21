import React, { useState, useContext } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { AuthContext } from "../../context/AuthContext";
import "./SignIn.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);

  const handleSignIn = () => {
    signIn(email, password).then((res) => (window.location.href = "/home"));
  };

  return (
    <>
      <NavBar />
      <div class="signin-container">
        {/*<div class="brand-logo"></div>*/}
        <div class="brand-title">Login</div>
        <div class="inputs">
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
          <button onClick={handleSignIn} type="submit">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
