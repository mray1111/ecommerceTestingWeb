import React, { Fragment, useRef, useState,useEffect} from "react";
import "./UpdateProfile.css";
import HttpsIcon from "@mui/icons-material/Https";
import { Link, Navigate } from "react-router-dom";
import MailLockIcon from "@mui/icons-material/MailLock";
import {useAlert} from "react-alert"
import {useDispatch, useSelector} from "react-redux"
import { clearErrors, login,register , updateProfile, loadUser} from "../../actions/userAction";
import Loader from "../layout/loader/Loader";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/Metadata"
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import {TfiFaceSmile} from "react-icons/tfi"
import {MdMailLock} from "react-icons/md"






const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate(); // Initialize the useNavigate hook
  
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  
    const updateProfileSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("avatar", avatar);
      dispatch(updateProfile(myForm));
    };
  
    const updateProfileDataChange = (e) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
  
      reader.readAsDataURL(e.target.files[0]);
    };
  
    useEffect(() => {
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url);
      }
  
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("Profile Updated Successfully");
        dispatch(loadUser());
  
        // Use the navigate hook to navigate to the desired route
        navigate("/account");
  
        dispatch({
          type: UPDATE_PROFILE_RESET,
        });
      }
    }, [dispatch, error, alert, navigate, user, isUpdated]);
  
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Update Profile" />
            <div className="updateProfileContainer">
              <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>
  
                <form
                  className="updateProfileForm"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <div className="updateProfileName">
                    <TfiFaceSmile />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileEmail">
                    <MdMailLock />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
  
                  <div id="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProfileDataChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="updateProfileBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };
  
  export default UpdateProfile;