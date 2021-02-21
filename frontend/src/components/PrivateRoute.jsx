import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Route, Redirect } from "react-router-dom";
export default function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { userState } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        userState ? (
          <RouteComponent {...routeProps} user={userState} />
        ) : (
          <Redirect to="/" /> //not authenticated
        )
      }
    />
  );
}
