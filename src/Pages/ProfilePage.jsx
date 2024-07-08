import React, { useState } from "react";
import ProfileSidebar from "../Components/Profile/ProfileSidebar";
import "../Components/Profile/ProfileContent.css";
import ProfileContent from "../Components/Profile/ProfileContent";
import Loader from "../Components/Layouts/Loader";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [activeSection, setActiveSection] = useState(1);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
    
          <div className="profile-page-container">
            <ProfileSidebar
              active={activeSection}
              setActive={setActiveSection}
            />
            <ProfileContent active={activeSection} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
