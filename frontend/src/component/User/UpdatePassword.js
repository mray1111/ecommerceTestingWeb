import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import Loader from "../layout/loader/Loader";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/Metadata";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = async (e) => {
    e.preventDefault();

    // Check if the new password meets the length requirement (at least 8 characters)
    if (newPassword.length < 8) {
      alert.error("Password must be at least 8 characters long");
      return;
    }

    // Check if the old password is provided and valid
    if (!oldPassword) {
      alert.error("Old password is required");
      return;
    }

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    try {
      await dispatch(updatePassword(myForm));

      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

      if (isUpdated) {
        alert.success("Password Updated Successfully");

        navigate("/account");

        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
    } catch (err) {
      alert.error(err.response.data.message);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Change Password</h2>

              <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
                <div className="loginPassword">
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
