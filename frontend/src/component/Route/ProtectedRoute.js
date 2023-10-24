import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom"; // Import the Navigate component

const ProtectedRoute = ({isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading == false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              // Use the Navigate component to redirect to the login page
              return <Navigate to="/login" />;
            }
            if (isAdmin === true && user.role != "admin") {
              // Use the Navigate component to redirect to the login page
              return <Navigate to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
      )}
      
    </Fragment>
  );
};

export default ProtectedRoute;
