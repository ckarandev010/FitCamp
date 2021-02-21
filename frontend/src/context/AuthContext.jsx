import React, { createContext, useEffect, useState } from "react";
import server from "../utils/server";
import auth from "../utils/base";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [userState, setUserState] = useState(null);
  const [authPending, setAuthPending] = useState(true);

  const signIn = async (username, password) => {
    return auth.signInWithEmailAndPassword(username, password);
  };

  const signUp = async (fname, lname, email, password) => {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    await server.register({ fname, lname, email, uid: result.user.uid });
    window.location.href = "/home";
  };

  const signOut = () => {
    auth.signOut().then(() => (window.location.href = "/"));
  };

  useEffect(() => {
    return auth.onAuthStateChanged((userAuth) => {
      console.log(userAuth);
      setUserState(userAuth);
      setAuthPending(false);
    });
  }, []);

  if (authPending) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div>Authentication in progress</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        userState,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
