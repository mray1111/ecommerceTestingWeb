import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/Metadata";
import Loader from "../layout/loader/Loader";
import { Link, useNavigate } from 'react-router-dom';
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user?.name || 'User'}'s Profile`} />
          <div className="profileContainer">
            <div className="my-profile">
              <h1>My Profile</h1>
              {user?.avatar && user.avatar.url ? (
                <img className="user-image" src={user.avatar.url} alt={user.name || 'User'} />
              ) : (
                <img src="/default-avatar.jpg" alt="Default Avatar" />
              )}
              <Link to="/me/update">Edit Profile</Link>
            </div>

            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name || 'User'}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email || 'No email available'}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{user?.createdAt ? String(user.createdAt).substr(0, 10) : 'Not available'}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
