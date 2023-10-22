// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Route } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               navigate("/login");
//               return null; // Return null or any placeholder while navigating
//             }

//             if (isAdmin && user && user.role !== "admin") {
//               navigate("/login");
//               return null; // Return null or any placeholder while navigating
//             }

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;
